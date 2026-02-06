# Library Frontend - Kutubxona Boshqaruv Tizimi

## 📚 Loyiha haqida

React + TypeScript + Vite da yozilgan kutubxona boshqaruv tizimining frontend qismi.

## 🚀 Xususiyatlar

- 📚 Kitoblarni boshqarish
- 👥 Foydalanuvchilarni boshqarish
- 🏷️ Kategoriyalar
- 🔐 Autentifikatsiya va autorizatsiya
- 🌙 Dark/Light tema
- 📱 Responsive dizayn

## 🛠️ Texnologiyalar

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: TailwindCSS, Radix UI
- **State Management**: React Context
- **HTTP Client**: Axios
- **Forms**: React Hook Form + Zod
- **Routing**: React Router v6

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/zoitovfirdavs3-eng/Library_front.git

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

## 🔧 Environment Variables

`.env` faylida quyidagi o'zgaruvchilarni sozlang:

```env
VITE_API_URL=http://localhost:5000  # Backend API URL
```

## 🚀 Build va Deployment

```bash
# Build for production
npm run build

# Preview build
npm run preview
```

### Deployment uchun tayyorlash

1. **Environment variables** ni sozlang:
   - `.env.production` faylini yarating
   - `VITE_API_URL` ni production backend manziliga o'zgartiring

2. **Build** qiling:
   ```bash
   npm run build
   ```

3. **Deploy** qiling:
   - `dist` papkasini hostingga yuklang
   - Vercel, Netlify, yoki boshqa static hostinglardan foydalaning

## 📁 Proyekt tuzilishi

```
src/
├── api/           # API konfiguratsiyasi
├── components/    # UI komponentlar
├── contexts/      # React Contextlar
├── hooks/         # Custom hooklar
├── lib/           # Utility funksiyalar
├── pages/         # Sahifalar
└── types/         # TypeScript tiplari
```

## 🔐 Xavfsizlik

- JWT tokenlar localStorage da saqlanadi
- API so'rovlari Bearer token bilan himoyalangan
- Environment variables xavfsiz saqlanadi

## 🤝 Contributing

1. Fork qiling
2. Feature branch yarating (`git checkout -b feature/AmazingFeature`)
3. Commit qiling (`git commit -m 'Add some AmazingFeature'`)
4. Push qiling (`git push origin feature/AmazingFeature`)
5. Pull Request yarating

## 📄 Litsenziya

Bu loyiha MIT litsenziyasi ostida tarqatiladi.

## 👨‍💻 Muallif

Firdavs Zoytov - [GitHub](https://github.com/zoitovfirdavs3-eng)
