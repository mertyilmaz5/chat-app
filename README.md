
# Chat Uygulaması

Bu proje, ReactJS ve Socket.io kullanarak geliştirilmiş basit bir chat uygulamasıdır. Kullanıcılar farklı gruplarda mesajlaşabilir ve online kullanıcıları görebilirler.

## Teknolojiler

- ReactJS
- Socket.io
- Axios (API ile iletişim için)
- CSS (stillemek için)

## Dosya Yapısı

Projede aşağıdaki ana dosyalar ve klasörler bulunmaktadır:

- `public/`: Statik dosyalar ve index.html
- `src/`: Proje kaynak kodları
  - `components/`: React bileşenleri
    - `Login.js`: Kullanıcı giriş ekranı
    - `Chat.js`: Chat ekranı ve mesaj yönetimi
  - `styles/`: CSS dosyaları
    - `Login.css`: Kullanıcı giriş ekranı stilleri
    - `Chat.css`: Chat ekranı stilleri
  - `utils/`: Yardımcı işlevler ve sabit veriler
  - `App.js`: Ana uygulama bileşeni
  - `index.js`: Uygulamanın başlangıç noktası
- `backend/`: Backend tarafı, Socket.io ve API yönetimi

## Başlangıç

1. **Gereksinimler**: Node.js ve npm (veya yarn) yüklü olmalıdır.
2. Projeyi bilgisayarınıza klonlayın:

   ```bash
   git clone https://github.com/mertyilmaz5/rt-chat-app.git
   ```

3. Bağımlılıkları yükleyin.
   
   Backend:

   ```bash
   cd backend
   npm install
   ```
   
   Frontend:

   ```bash
   npm install
   ```

4. Projeyi başlatın.

   Backend:

   ```bash
   cd backend
   node server.js
   ```
   
   Frontend:

   ```bash
   npm start
   ```

7. Tarayıcınızda `http://localhost:3000` adresine giderek uygulamayı görebilirsiniz.

## Kullanım

- **Giriş Ekranı**: Kullanıcı adı ve avatar seçerek giriş yapabilir veya kayıt olabilirsiniz.
- **Chat Ekranı**: Sol tarafta grup listesi, ortada mesajlar ve sağ tarafta online kullanıcılar listesi bulunmaktadır. Mesaj yazabilir ve farklı gruplarda mesajlaşabilirsiniz.

## Notlar

- Backend olarak `Socket.io` kullanılmıştır. Backend kodları `server.js` dosyasında bulunmaktadır.
- Kullanıcı adı ve avatar bilgileri, API üzerinde `mockAPI` kullanılarak saklanmaktadır (`axios` ile iletişim sağlanmaktadır).
- Her kullanıcı için farklı bir avatar seçebilir ve gruplar arasında geçiş yapabilirsiniz.

## Katkılar

Katkıda bulunmak veya sorun bildirmek için lütfen [issues](https://github.com/mertyilmaz5/chat-app/issues) sayfasını ziyaret edin.

---

Uygulama geliştirme süreci hakkında detaylı bilgi almak için lütfen projenin kodlarına ve `server.js` dosyasına göz atın. Herhangi bir sorunuz veya geri bildiriminiz varsa lütfen bana bildirin!

