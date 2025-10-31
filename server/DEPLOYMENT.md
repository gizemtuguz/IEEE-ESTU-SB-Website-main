# IEEE ESTU Backend Deployment Guide

## Vercel'de Backend Deployment

### 1. Adım: Vercel Projesi Oluşturma

1. [Vercel Dashboard](https://vercel.com/dashboard)'a gidin
2. "Add New Project" butonuna tıklayın
3. GitHub repository'nizi seçin
4. **Önemli:** Root Directory'yi `server` olarak ayarlayın
5. Framework Preset: "Other" seçin

### 2. Adım: Environment Variables Ekleme

Vercel proje ayarlarında şu environment variable'ları ekleyin:

```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://ieeeestu_db_user:apRM8J8L1dYKRRGm@admin-page-ieee.tz4qbzf.mongodb.net/ieee_estu_db?retryWrites=true&w=majority
JWT_SECRET=<your-jwt-secret>
JWT_REFRESH_SECRET=<your-jwt-refresh-secret>
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
FRONTEND_URL=https://ieeeestumain.vercel.app
GOOGLE_PROJECT_ID=xenon-alliance-431006-u0
GOOGLE_CLIENT_EMAIL=ieee-estu-sheets-access@xenon-alliance-431006-u0.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=<your-google-private-key>
GOOGLE_SHEETS_MEMBERSHIP_ID=1m9ACG9AvDryLAjw7tFNjsXYrsTGNO96q3JXT3wmhuCQ
GOOGLE_SHEETS_CONTACT_ID=1BqUttJ4Zqxmt8jZQtMvQqKoEw6wmuqiDBs2wzGiBupU
GOOGLE_SHEETS_SPONSOR_ID=18pljx1bBMBkSfv7925g4boDNES75XKLf5MAB0tZ4Pc8
GOOGLE_SHEETS_NEWSLETTER_ID=1mQQYG4Ya_2uyLENcuFLKDDXKHnAOUQsrAbc0AUMrCVY
GOOGLE_SHEETS_COMMITTEE_ID=1aW1g9V80cyrxTkXMU7tTsWizbUSwUxDSQHCo_pRDBko
```

**Not:** `GOOGLE_PRIVATE_KEY` için:
- Local .env dosyanızdaki tüm key'i kopyalayın
- Vercel'de eklerken `\n` karakterlerini olduğu gibi bırakın
- Tırnak içinde ekleyin: `"-----BEGIN PRIVATE KEY-----\nMIIE..."`

### 3. Adım: Deploy Butonu

"Deploy" butonuna tıklayın. Backend'iniz şu şekilde deploy edilecek:
- URL: `https://your-backend-name.vercel.app`

### 4. Adım: Frontend'i Güncelleme

Frontend projenizde environment variable ekleyin:

1. Vercel Dashboard'da frontend projenize gidin
2. Settings > Environment Variables
3. Ekleyin:
```
VITE_API_BASE_URL=https://your-backend-name.vercel.app/api
```

### 5. Adım: Frontend'i Yeniden Deploy Edin

Frontend otomatik olarak yeniden deploy edilecek ve yeni API URL'ini kullanacak.

## Local Development

Local'de çalıştırmak için:

```bash
# Backend
cd server
npm install
npm run dev

# Frontend (başka terminal)
cd ..
npm install
npm run dev
```

## Troubleshooting

### CORS Hatası
`FRONTEND_URL` environment variable'ında frontend URL'inizi doğru yazdığınızdan emin olun.

### Database Bağlantı Hatası
MongoDB Atlas'ta IP whitelist'e `0.0.0.0/0` ekleyin (tüm IP'lere izin).

### 404 Hatası
`vercel.json` dosyasının hem frontend hem backend dizinlerinde olduğundan emin olun.
