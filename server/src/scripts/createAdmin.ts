import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { AdminUser } from "../models/AdminUser.js";
import { env } from "../config/env.js";

async function createAdmin() {
  try {
    // MongoDB bağlantısı
    await mongoose.connect(env.MONGODB_URI);
    console.log("✅ MongoDB bağlantısı başarılı");

    // Kullanıcı bilgileri
    const email = process.argv[2] || "admin@ieeeestu.org";
    const password = process.argv[3] || "Admin123!";
    const role = (process.argv[4] as "super" | "editor") || "super";

    // Email kontrolü
    const existingUser = await AdminUser.findOne({ email });
    if (existingUser) {
      console.log(`❌ Bu email ile zaten bir admin kullanıcı var: ${email}`);
      process.exit(1);
    }

    // Şifre hash'leme
    const passwordHash = await bcrypt.hash(password, 10);

    // Admin kullanıcı oluşturma
    const admin = await AdminUser.create({
      email,
      passwordHash,
      role,
      refreshTokens: []
    });

    console.log("\n🎉 Admin kullanıcı başarıyla oluşturuldu!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`📧 Email: ${admin.email}`);
    console.log(`🔑 Şifre: ${password}`);
    console.log(`👤 Rol: ${admin.role}`);
    console.log(`🆔 ID: ${admin._id}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Hata:", error);
    process.exit(1);
  }
}

createAdmin();
