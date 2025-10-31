import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import { toast } from "sonner@2.0.3";
import { api } from "./lib/api";
import type { Event, EventTranslation } from "./types/api";

const STATUS_MAP = {
  Taslak: "draft",
  Yayında: "published",
  Arşivlendi: "archived"
} as const;

const STATUS_LABELS: Record<string, string> = {
  draft: "Taslak",
  published: "Yayında",
  archived: "Arşivlendi"
};

const DEFAULT_TR_TRANSLATION: EventTranslation = {
  title: "",
  description: "",
  location: "ESTÜ Kampüsü",
  category: "Etkinlik",
  participants: ""
};

const DEFAULT_EN_TRANSLATION: EventTranslation = {
  title: "",
  description: "",
  location: "ESTU Campus",
  category: "Event",
  participants: ""
};

type FormStatus = keyof typeof STATUS_MAP;

interface AdminEventFormPageProps {
  mode: "create" | "edit";
  eventId?: string | null;
}

interface FormState {
  title: string;
  date: string;
  description: string;
  status: FormStatus;
  imageFile: File | null;
  imagePreview: string;
}

export default function AdminEventFormPage({ mode, eventId }: AdminEventFormPageProps) {
  const [formState, setFormState] = useState<FormState>({
    title: "",
    date: "",
    description: "",
    status: "Taslak",
    imageFile: null,
    imagePreview: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [originalEvent, setOriginalEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (mode === "edit" && eventId) {
      const fetchEvent = async () => {
        try {
          const data = (await api.getAdminEvent(eventId)) as Event;
          setOriginalEvent(data);
          setFormState({
            title: data.translations?.tr?.title ?? "",
            date: data.startDate ? new Date(data.startDate).toISOString().slice(0, 10) : "",
            description: data.translations?.tr?.description ?? "",
            status: (STATUS_LABELS[data.status] as FormStatus) ?? "Taslak",
            imageFile: null,
            imagePreview: data.coverImage ?? ""
          });
        } catch (error) {
          toast.error("Etkinlik bilgileri alınamadı.");
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      void fetchEvent();
    } else {
      setIsLoading(false);
    }
  }, [mode, eventId]);

  const statusOptions = useMemo(() => Object.keys(STATUS_MAP) as FormStatus[], []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, description: event.target.value }));
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, status: event.target.value as FormStatus }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setFormState((prev) => ({ ...prev, imageFile: null, imagePreview: "" }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormState((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const validationErrors: Record<string, string> = {};
    if (!formState.title.trim()) {
      validationErrors.title = "Etkinlik başlığı zorunludur.";
    }
    if (!formState.date) {
      validationErrors.date = "Etkinlik tarihi zorunludur.";
    }
    if (formState.description.length > 1000) {
      validationErrors.description = "Açıklama 1000 karakterden uzun olmamalıdır.";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      toast.error("Lütfen formdaki hataları düzeltin.");
      return;
    }

    setIsSubmitting(true);
    try {
      const statusValue = STATUS_MAP[formState.status];
      const isoDate = new Date(formState.date).toISOString();

      let coverImage = formState.imagePreview;
      if (formState.imageFile) {
        coverImage = await fileToBase64(formState.imageFile);
      } else if (mode === "edit" && originalEvent?.coverImage) {
        coverImage = originalEvent.coverImage;
      }

      const trTranslation: EventTranslation = {
        ...(originalEvent?.translations?.tr ?? DEFAULT_TR_TRANSLATION),
        title: formState.title,
        description: formState.description,
        location: originalEvent?.translations?.tr?.location ?? DEFAULT_TR_TRANSLATION.location,
        category: originalEvent?.translations?.tr?.category ?? DEFAULT_TR_TRANSLATION.category
      };

      const enTranslation: EventTranslation = {
        ...(originalEvent?.translations?.en ?? DEFAULT_EN_TRANSLATION),
        title: formState.title,
        description: formState.description,
        location: originalEvent?.translations?.en?.location ?? DEFAULT_EN_TRANSLATION.location,
        category: originalEvent?.translations?.en?.category ?? DEFAULT_EN_TRANSLATION.category
      };

      const payload = {
        status: statusValue,
        startDate: isoDate,
        translations: {
          tr: trTranslation,
          en: enTranslation
        },
        coverImage: coverImage || undefined
      };

      if (mode === "create") {
        await api.createEvent({
          ...payload,
          formFields: []
        });
        toast.success("Etkinlik başarıyla oluşturuldu.");
      } else if (mode === "edit" && eventId) {
        await api.updateEvent(eventId, payload);
        toast.success("Etkinlik başarıyla güncellendi.");
      }

      window.location.href = "/admin";
    } catch (error) {
      toast.error("Etkinlik kaydedilemedi. Lütfen tekrar deneyin.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Yükleniyor...
      </div>
    );
  }

  const fieldClass = (field: keyof FormState) =>
    `rounded-xl bg-slate-900 text-white border ${
      errors[field] ? "border-red-500 focus-visible:ring-red-500" : "border-slate-700 focus-visible:ring-primary"
    }`;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur-lg">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">
              {mode === "create" ? "Yeni Etkinlik Ekle" : "Etkinliği Düzenle"}
            </h1>
            <p className="text-sm text-slate-300">
              {mode === "create"
                ? "Etkinlik bilgilerini doldurarak kaydedebilirsiniz."
                : "Etkinlik bilgilerinde gerekli güncellemeleri yapın."}
            </p>
          </div>
          <Button variant="outline" onClick={() => (window.location.href = "/admin")}>
            Geri Dön
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <Card className="border border-slate-800 bg-slate-900">
          <CardHeader>
            <CardTitle>{mode === "create" ? "Etkinlik Bilgileri" : "Etkinlik Detayları"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="space-y-2">
                <Label htmlFor="title">Etkinlik Başlığı *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formState.title}
                  onChange={handleInputChange}
                  className={fieldClass("title")}
                  placeholder="Etkinlik başlığı girin"
                />
                {errors.title && <p className="text-sm text-red-400">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Etkinlik Tarihi *</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formState.date}
                  onChange={handleInputChange}
                  className={fieldClass("date")}
                />
                {errors.date && <p className="text-sm text-red-400">{errors.date}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Etkinlik Açıklaması</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formState.description}
                  onChange={handleDescriptionChange}
                  maxLength={1000}
                  className={`${fieldClass("description")} min-h-[150px]`}
                  placeholder="Etkinliğe dair kısa açıklama ekleyin (maksimum 1000 karakter)."
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>
                    {formState.description.length}/1000
                  </span>
                  {errors.description && <span className="text-red-400">{errors.description}</span>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Etkinlik Görseli</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="rounded-xl bg-slate-900 text-white border border-slate-700 file:text-white"
                />
                {formState.imagePreview && (
                  <div className="mt-2">
                    <img
                      src={formState.imagePreview}
                      alt="Etkinlik görseli önizleme"
                      className="max-h-48 rounded-lg border border-slate-700 object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Durum</Label>
                <select
                  id="status"
                  name="status"
                  value={formState.status}
                  onChange={handleStatusChange}
                  className={`${fieldClass("status")} h-12 px-3`}
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => (window.location.href = "/admin")}
                >
                  Vazgeç
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="ieee-button-primary"
                >
                  {isSubmitting ? "Kaydediliyor..." : "Etkinliği Kaydet"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
