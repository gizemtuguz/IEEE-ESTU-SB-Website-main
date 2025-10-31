import crypto from "node:crypto";
import type { Request, Response } from "express";
import { Event } from "../models/Event.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { slugify } from "../utils/slugify.js";
import { ensureEventTable } from "../services/googleTablesService.js";

function normalizeFormFields(formFields: any[] | undefined) {
  if (!formFields) return [];
  return formFields.map((field, index) => ({
    ...field,
    id: field.id ?? crypto.randomUUID(),
    order: field.order ?? index
  }));
}

export const listPublicEvents = asyncHandler(async (_req: Request, res: Response) => {
  const events = await Event.find({ status: "published" })
    .sort({ startDate: 1 })
    .lean();

  res.json(events);
});

export const getPublicEvent = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const event = await Event.findOne({ slug, status: { $ne: "archived" } }).lean();
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  res.json(event);
});

export const listAdminEvents = asyncHandler(async (_req: Request, res: Response) => {
  const events = await Event.find().sort({ createdAt: -1 }).lean();
  res.json(events);
});

export const getAdminEventById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = await Event.findById(id).lean();
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  res.json(event);
});

export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body as any;
  const generatedSlug = slugify(payload.slug ?? payload.translations?.tr?.title ?? crypto.randomUUID());

  const existing = await Event.findOne({ slug: generatedSlug });
  if (existing) {
    return res.status(400).json({ message: "Event slug already exists" });
  }

  const event = await Event.create({
    ...payload,
    slug: generatedSlug,
    formFields: normalizeFormFields(payload.formFields),
    createdBy: req.user?.id,
    updatedBy: req.user?.id
  });

  const tableId = await ensureEventTable(event.translations.tr.title);
  if (tableId) {
    event.googleTableId = tableId;
    await event.save();
  }

  res.status(201).json(event);
});

export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body as any;

  const event = await Event.findById(id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  if (payload.slug && payload.slug !== event.slug) {
    const newSlug = slugify(payload.slug);
    const exists = await Event.exists({ slug: newSlug, _id: { $ne: event.id } });
    if (exists) {
      return res.status(400).json({ message: "Slug already in use" });
    }
    event.slug = newSlug;
  }

  if (payload.translations) {
    event.translations = payload.translations;
  }

  event.status = payload.status ?? event.status;
  event.coverImage = payload.coverImage ?? event.coverImage;
  event.bannerImage = payload.bannerImage ?? event.bannerImage;
  event.startDate = payload.startDate ?? event.startDate;
  event.endDate = payload.endDate ?? event.endDate;
  event.startTime = payload.startTime ?? event.startTime;
  event.endTime = payload.endTime ?? event.endTime;
  event.capacity = payload.capacity ?? event.capacity;
  if (payload.formFields) {
    event.formFields = normalizeFormFields(payload.formFields);
  }
  event.updatedBy = req.user?.id ?? event.updatedBy;

  await event.save();
  res.json(event);
});

export const updateEventFormFields = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { formFields } = req.body as { formFields: any[] };

  const event = await Event.findById(id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  event.formFields = normalizeFormFields(formFields);
  event.updatedBy = req.user?.id ?? event.updatedBy;
  await event.save();
  res.json(event.formFields);
});

export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  await event.deleteOne();
  res.status(204).send();
});
