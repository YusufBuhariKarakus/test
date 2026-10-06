# Gelir Getirecek Ürün Analizi: Mobil Uygulama mı, Oyun mu, Web Sitesi mi?

> Tarih: Ekim 2026
> Varsayımlar: Tek kişi ya da küçük ekip, düşük başlangıç bütçesi (reklam bütçesi yok ya da çok az), Türkiye'de yaşayan bir geliştirici, ilk gelirin 3–6 ay içinde gelmesi hedefi.

---

## 1. Kısa Cevap (Karar)

**Web tabanlı, abonelikle satılan bir B2B "mikro-SaaS" aracı geliştir.**

Önerdiğim ürün: **Trendyol / Hepsiburada / Amazon TR satıcıları için yapay zekâ destekli ürün listeleme ve rakip fiyat takip aracı.**
(Çalışma adı: *ListeUstası*)

- Önce **web** olarak çıkar (mobil uyumlu, PWA).
- Satıcılar ürünlerini bağlar, araç ürün başlığı, açıklama ve anahtar kelimeleri optimize eder, rakip fiyatları izleyip uyarı gönderir.
- Gelir modeli **aylık abonelik**.
- Türkiye'de pazarı doğruladıktan sonra aynı altyapıyla **Etsy / Amazon** satıcılarına açılıp **dövizle (USD)** gelir elde et.

Gerekçeler aşağıda.

---

## 2. Seçeneklerin Karşılaştırılması

### 2.1 Mobil Oyun

| Artı | Eksi |
|---|---|
| Pazar çok büyük | Hit'e bağlı bir iş: oyunların çok büyük kısmı para kazanmaz |
| Türkiye'de güçlü bir hyper-casual ekosistemi var (yayıncılar) | Gelir reklamdan gelir; ciddi para için milyonlarca indirme gerekir |
| Yayıncıyla çalışınca pazarlama maliyeti onlarda | Kullanıcı edinme maliyeti (CPI) yüksek ve artıyor; organik büyüme çok zor |
| | Sanat, ses, oyun tasarımı ve sürekli test (prototip → CPI testi) gerekir |
| | Gelir öngörülemiyor, kullanıcılar hızla bırakıyor |

**Sonuç:** Yüksek risk, yüksek varyans. Ekibin yoksa ve oyun geliştirme deneyimin sınırlıysa ilk ürün olarak önermem. Gelir getirmesi daha çok şansa bağlı.

### 2.2 Mobil Uygulama (B2C, araç/abonelik)

| Artı | Eksi |
|---|---|
| Kullanıcılar mobilde abonelik ödemeye alışık | App Store / Google Play komisyonu (%15–30) |
| Mağaza üzerinden keşfedilebilirlik (ASO) | Mağaza incelemesi ve kurallar yüzünden yavaş iterasyon |
| | Popüler kategoriler (takip, fitness, not, AI sohbet) çok kalabalık |
| | B2C'de kullanıcı başına gelir düşük, bırakma oranı yüksek |
| | iOS için Mac + yıllık geliştirici ücreti gerekir |

**Sonuç:** Orta risk. İyi bir niş bulunursa çalışır ama dağıtım (kullanıcıya ulaşmak) asıl sorun olur.

### 2.3 İçerik / Reklam Sitesi (blog, SEO, AdSense)

| Artı | Eksi |
|---|---|
| Çok düşük maliyet | Google'ın AI özetleri ve sohbet tabanlı arama, sitelere giden organik trafiği belirgin şekilde azalttı |
| Teknik olarak kolay | Türkçe trafikte reklam geliri (RPM) düşük |
| | Anlamlı gelir için 12–24 ay gerekir; AI içerik bolluğu rekabeti artırdı |

**Sonuç:** 2026'da tek başına içerik sitesi riskli ve yavaş. Ancak ana ürüne trafik getiren yardımcı bir kanal olarak işe yarar.

### 2.4 Web Mikro-SaaS (B2B, abonelik) ✅

| Artı | Eksi |
|---|---|
| **Müşteri işletme:** aracın ona para kazandırdığını görürse ödemeye çok daha istekli | Satış ve pazarlama emeği ister (soğuk erişim, topluluklar) |
| Mağaza komisyonu ve onay süreci yok, aynı gün sürüm çıkarılabilir | Müşteri desteği gerekir |
| Düzenli ve öngörülebilir aylık gelir (MRR) | |
| Altyapı maliyeti düşük (aylık birkaç on dolar) | |
| Küresele açılınca dövizle gelir, TL değer kaybına karşı koruma sağlar | |
| Mobil uyumlu web ile mobil kullanıcılar da kapsanır, sonra mobil uygulamaya sarılabilir | |

**Sonuç:** Kısıtlı bütçeyle tek kişinin gelir elde etme ihtimalinin en yüksek olduğu seçenek.

### 2.5 Puanlama (1–5, yüksek daha iyi)

| Kriter (ağırlık) | Mobil Oyun | Mobil Uygulama | İçerik Sitesi | **Web SaaS** |
|---|---|---|---|---|
| Gelire ulaşma hızı (×3) | 2 | 3 | 1 | **4** |
| Gelirin öngörülebilirliği (×3) | 1 | 3 | 2 | **5** |
| Başlangıç maliyeti (×2) | 2 | 3 | 5 | **4** |
| Dağıtım / kullanıcıya ulaşma (×3) | 2 | 2 | 2 | **4** |
| Tek kişiyle yapılabilirlik (×2) | 2 | 4 | 5 | **4** |
| Büyüme potansiyeli (×2) | 5 | 4 | 2 | **4** |
| **Toplam (75 üzerinden)** | **31** | **46** | **39** | **62** |

---

## 3. Neden Bu Niş: Pazaryeri Satıcı Araçları

1. **Ödeme yapan, belirli bir kitle.** Türkiye'de pazaryerlerinde yüz binlerce satıcı var. Bu kişiler işlerini büyütmeye çalışıyor ve zaten çeşitli araçlara para ödüyor. Kendisine satış getiren araca para ödemek onlar için kolay bir karar.
2. **Somut ve ölçülebilir bir fayda.** Daha iyi başlık ve anahtar kelime daha fazla görünürlük getirir; rakip fiyatını zamanında görmek de Buy Box / öne çıkma şansını artırır. Satıcı bunu doğrudan cirosunda görür.
3. **Türkçe dil avantajı.** Global araçlar Türkçe SEO'yu ve yerel pazaryerlerini iyi desteklemiyor. Yerel bir geliştirici bu açığı kolayca doldurabilir.
4. **Teknik olarak uygulanabilir.** Trendyol ve Hepsiburada'nın satıcı API'leri var; yapay zekâ API'leriyle metin üretmek ucuz ve kolay.
5. **Ulaşılabilir müşteriler.** Satıcılar Facebook/Telegram/WhatsApp gruplarında, YouTube'da ve e-ticaret forumlarında toplanıyor. Ücretsiz bir araç ve içerikle bu topluluklara girmek mümkün.
6. **Küresel genişleme yolu.** Aynı çekirdek (listeleme optimizasyonu ve fiyat takibi) Etsy, Amazon ve Shopify için de geçerli. Bu pazarlarda gelir dövizle gelir.

### Alternatif nişler (ilk fikir doğrulanamazsa)

| Fikir | Hedef kitle | Not |
|---|---|---|
| Randevu ve hatırlatma sistemi (WhatsApp entegrasyonlu) | Kuaför, diş hekimi, güzellik salonu, psikolog | Rekabet var ama yerel ve sektöre özel çözümler az |
| Emlak ilanı açıklama ve görsel iyileştirme aracı | Emlak danışmanları | Hızlı değer, düşük teknik zorluk |
| Restoran QR menü ve yorum toplama aracı | Kafe ve restoranlar | Kolay satış, düşük fiyat, daha yüksek bırakma oranı |
| Ön muhasebe ve tahsilat hatırlatma | Serbest çalışanlar, KOBİ'ler | Büyük rakipler var; nişe odaklanmak şart |

---

## 4. Ürün Tanımı (MVP)

### Temel özellikler (ilk 6 hafta)
1. **Kayıt / giriş** (e-posta + Google).
2. **Mağaza bağlantısı:** Trendyol satıcı API anahtarıyla ürünleri çekme.
3. **Listeleme puanı:** Her ürüne 0–100 arası bir puan (başlık uzunluğu, anahtar kelime, görsel sayısı, açıklama kalitesi, özellik doluluğu).
4. **AI ile başlık ve açıklama önerisi:** Tek tıkla optimize edilmiş metin, isteğe bağlı olarak pazaryerine geri gönderme.
5. **Rakip fiyat takibi:** Seçilen ürünler için günlük fiyat kontrolü ve e-posta / Telegram uyarısı.
6. **Ödeme ve abonelik yönetimi.**

### Sonraki aşama
- Hepsiburada, Amazon TR entegrasyonu
- Otomatik fiyatlama kuralları ("rakipten 1 TL ucuz ol, X'in altına inme")
- Kâr hesaplayıcı (komisyon + kargo + maliyet)
- İngilizce sürüm + Etsy/Amazon entegrasyonu

### Fiyatlandırma (başlangıç önerisi)

| Paket | Fiyat (aylık) | İçerik |
|---|---|---|
| Ücretsiz | 0 ₺ | 10 ürün analizi, ayda 5 AI önerisi; trafik ve tanıtım için |
| Başlangıç | ~299 ₺ | 100 ürün, 100 AI önerisi, 20 ürün fiyat takibi |
| Pro | ~799 ₺ | 1.000 ürün, sınırsıza yakın AI, 200 ürün fiyat takibi |
| Ajans | ~1.999 ₺ | Çoklu mağaza, ekip üyeleri |

Yıllık ödemede 2 ay bedava ver. Fiyatları ilk müşteri görüşmelerinden sonra güncelle.

### Basit gelir hedefi
- Ortalama gelir/müşteri ≈ 500 ₺/ay varsayımıyla:
  - 50 müşteri → ~25.000 ₺/ay (ilk 6 ay hedefi)
  - 200 müşteri → ~100.000 ₺/ay (ilk 12–18 ay hedefi)
- Altyapı ve AI API maliyeti gelirin genelde %10'unun altında kalır.

---

## 5. Teknik Mimari Önerisi

| Katman | Öneri | Neden |
|---|---|---|
| Ön yüz + arka uç | **Next.js (TypeScript)** | Tek kod tabanı, SEO dostu açılış sayfaları, geniş ekosistem |
| Veritabanı + kimlik doğrulama | **Supabase (PostgreSQL)** veya Postgres + Auth.js | Hızlı başlangıç, ücretsiz katman |
| Arka plan işleri (fiyat takibi) | Zamanlanmış işler (cron) + kuyruk (ör. Inngest / BullMQ) | Günlük ve saatlik taramalar |
| Yapay zekâ | Bir LLM API'si (ör. Claude) | Türkçe metin üretim kalitesi yüksek; maliyet kullanım başına |
| Barındırma | Vercel / Railway / Hetzner | Düşük maliyet |
| Ödeme (TR) | **iyzico** veya **PayTR** | TL ve yerel kartlarla tekrarlayan ödeme |
| Ödeme (global) | **Paddle** veya **Lemon Squeezy** (Merchant of Record) | Stripe Türkiye'deki şirketlere doğrudan açık değil; MoR vergi işlerini de üstlenir |
| Mobil | Önce PWA, gerekirse Capacitor / React Native | Ek maliyet olmadan mobil deneyim |

Yasal notlar: KVKK uyumlu aydınlatma metni, mesafeli satış sözleşmesi ve şahıs şirketi ya da e-ticaret için uygun vergi kaydı gerekir. Pazaryeri API kullanım şartlarına uy; izinsiz veri kazıma (scraping) yerine resmî API'leri tercih et.

---

## 6. Yol Haritası

| Hafta | İş | Başarı ölçütü |
|---|---|---|
| **0–2: Doğrulama** | 15–20 satıcıyla görüş (gruplar, LinkedIn, tanıdıklar). Açılış sayfası + bekleme listesi. Ücretsiz "listeleme puanı" aracını yayınla. | En az 10 kişiden "bunu kullanırım/ödeme yaparım" cevabı ve 100+ bekleme listesi kaydı |
| **3–8: MVP** | Bölüm 4'teki temel özellikler | 10 beta kullanıcı haftalık aktif |
| **9–12: Satış** | Ücretli paketleri aç, ilk 10 müşteriye birebir kurulum desteği ver | İlk 10 ödeme yapan müşteri |
| **4–6. ay: Büyüme** | YouTube/TikTok eğitim içerikleri, satıcı topluluklarına katkı, referans programı (%20–30 komisyon), SEO blog | 50 müşteri, aylık bırakma oranı < %6 |
| **7–12. ay: Genişleme** | Hepsiburada/Amazon TR, sonra İngilizce sürüm + Etsy | 200 müşteri ve ilk döviz geliri |

**Durma / pivot kuralı:** 2. haftanın sonunda görüşmelerde ciddi ilgi yoksa ya da 12. haftada 5 ödeme yapan müşteriye ulaşılmazsa, aynı teknik altyapıyla Bölüm 3'teki alternatif nişlerden birine geç.

---

## 7. Riskler ve Önlemler

| Risk | Önlem |
|---|---|
| Pazaryeri API'sinin değişmesi veya kısıtlanması | Birden fazla pazaryerini destekle, entegrasyon katmanını ayrı tut |
| Pazaryerinin kendi benzer aracı çıkarması | Çoklu pazaryeri, kâr hesabı ve otomasyon gibi tek bir pazaryerinin sunmayacağı özelliklere odaklan |
| Rakip araçlar | Türkçe ve yerel odak, birebir destek, daha uygun fiyat |
| AI maliyetlerinin artması | Paket başına kota, önbellekleme, işe göre küçük ve ucuz modeller |
| Satış yapamama (geliştiricilerde en yaygın hata) | Zamanın en az %40'ını müşteriyle konuşmaya ve pazarlamaya ayır, kod yazmadan önce doğrula |

---

## 8. Neden Oyun Değil?

Oyun geliştirmek istiyorsan bu tamamen kapatılmış bir kapı değil. Ama "gelir getirmesi" öncelikliyse doğru sıralama şu:
1. Önce SaaS ile düzenli bir gelir oluştur.
2. Yan proje olarak haftada birkaç saat küçük oyun prototipleri yap ve bunları Türk hyper-casual / hybrid-casual yayıncılarına gönder. Bu yolda pazarlama riskini yayıncı üstlenir.

---

## 9. Sonraki Adım

Karar onaylanırsa bu depoda şunları başlatabilirim:
1. Next.js + Supabase proje iskeleti
2. Bekleme listesi toplayan açılış sayfası
3. Ücretsiz "Listeleme Puanı" aracı (ürün linki ya da başlık girilince puan ve öneriler veren sayfa). İlk trafiği ve doğrulamayı bu araç sağlar.

Farklı bir yetenek setin varsa (ör. Unity, Flutter, oyun tasarımı) ya da belirli bir sektörde deneyimin/çevren varsa söyle; analizi buna göre güncelleyeyim, çünkü mevcut bir çevre ve sektör bilgisi en güçlü avantajdır.
