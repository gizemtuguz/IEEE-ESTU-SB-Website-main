# Vercel Deployment Talimatları

## 🚀 Hızlı Deployment

### Backend Deployment

1. **Yeni Vercel Projesi Oluştur**
   - https://vercel.com/new adresine git
   - GitHub repo'nuzu import et
   - **Root Directory: `server`** olarak ayarla
   - Framework: "Other"

2. **Environment Variables Ekle** (Settings > Environment Variables)
   - `server/.env` dosyanızdaki tüm variable'ları kopyalayın
   - Önemli: `FRONTEND_URL=https://ieeeestumain.vercel.app` olarak ayarlayın
   - Önemli: `GOOGLE_PRIVATE_KEY` değerini tırnak içinde ekleyin

3. **Deploy Et**
   - Backend URL'inizi not edin (örn: `https://ieee-backend.vercel.app`)

### Frontend'i Güncelle

1. **Frontend Vercel Projesine Git**
   - Settings > Environment Variables
   - Ekle: `VITE_API_BASE_URL=https://ieee-backend.vercel.app/api`
   - (Backend URL'inizi buraya yazın)

2. **Redeploy**
   - Deployments sekmesine git
   - Son deployment'ın yanındaki 3 nokta > "Redeploy"

## 📝 Önemli Notlar

- Backend ve frontend **ayrı Vercel projeleri** olmalı
- Backend root directory: `server`
- Frontend root directory: repository root
- MongoDB Atlas'ta IP whitelist: `0.0.0.0/0` (tüm IP'ler)
- CORS için `FRONTEND_URL` doğru olmalı

## 🔐 Admin Paneli

Deploy edildikten sonra:
- URL: `https://ieeeestumain.vercel.app/admin-login`
- Email: `admin@ieeeestu.org`
- Şifre: `Admin123!`

## Daha Detaylı Bilgi

Backend deployment için: `server/DEPLOYMENT.md`
