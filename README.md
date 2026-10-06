# 101 Puan – Okey Puan Tutucu

101 okey oyunlarında puanı kâğıt kalem yerine telefondan tutmak için basit bir iOS/Android uygulaması.
Expo (React Native) ile yazıldı. Ürün kararının gerekçesi için [ANALIZ.md](ANALIZ.md) dosyasına bakabilirsin.

## Özellikler
- Tekli (2–4 oyuncu) ve eşli (2'ye 2) oyun
- 5 / 7 / 9 / 11 el ya da sınırsız
- Her el için: kim bitirdi, okeyle / elden / çiftle bitirme (puanlar ×2, birlikte ×4 / ×8)
- Açan oyuncu için kalan taş toplamı, çift açana ×2, açamayana ceza (varsayılan 202)
- İşlek taş veya okey atma gibi ek cezalar (varsayılan 101)
- Kurallar oyun başında değiştirilebilir
- Elleri düzenleme ve silme, lider 👑, oyun sonunda kazanan ekranı
- İnternet gerekmez, her şey cihazda saklanır

## Puanlama
| Durum | Puan |
|---|---|
| Bitiren | −101 × çarpan |
| Açan | kalan taş toplamı (çift açtıysa ×2) × çarpan |
| Açamayan | 202 × çarpan |
| Ek ceza | +101 (çarpandan etkilenmez) |

Çarpan: okeyle bitirme ×2, elden ×2, çiftle ×2. Bunlar birbiriyle çarpılır. Kimse bitirmezse çarpan 1'dir. Oyunun sonunda **en düşük puan kazanır**. Eşli oyunda 1-2. ve 3-4. oyuncular birer takımdır.

Hesaplama kodu `src/lib/scoring.ts` dosyasında, testleri `src/lib/__tests__/` klasöründe.

## Geliştirme
```bash
npm install
npx expo start      # Telefondaki Expo Go uygulamasıyla QR kodu okut
npm test            # Puanlama testleri
npm run typecheck
```

## App Store'a çıkarma
1. [Apple Developer Program](https://developer.apple.com/programs/) üyeliği al (yıllık 99 $). Onay birkaç gün sürebilir.
2. `app.json` içindeki `ios.bundleIdentifier` ve `android.package` değerlerini kendine göre düzenle. Bu değer mağazada benzersiz olmalı ve yayından sonra değiştirilemez.
3. Uygulama ikonu ve açılış ekranını `assets/` klasörüne koy (1024×1024 ikon).
4. Expo hesabı aç ve giriş yap: `npx eas-cli@latest login`
5. Bulutta iOS derlemesi al: `npx eas-cli@latest build --platform ios --profile production`. Mac gerekmez.
6. App Store Connect'e gönder: `npx eas-cli@latest submit --platform ios`
7. App Store Connect'te açıklama, ekran görüntüleri (6.7" ve 6.5"), kategori (Oyunlar > Kart ya da Yardımcı Programlar) ve gizlilik politikası adresini doldur. Gizlilik politikası için `PRIVACY.md` içeriğini bir web sayfasında yayınlaman yeterli (ör. GitHub Pages).
8. İncelemeye gönder.

Google Play için 6. adımda `--platform android` kullan. Play'in tek seferlik kayıt ücreti 25 $.

## Yol haritası (gelir)
- [ ] "Pro" tek seferlik satın alma (79–99 ₺): istatistikler, oyuncu geçmişi, temalar
- [ ] Ücretsiz sürümde küçük banner reklam (AdMob)
- [ ] Maç sonucunu görsel olarak paylaşma (WhatsApp grubuna atmak için)
- [ ] Oyuncu bazlı istatistik: kazanma oranı, en çok ceza yiyen 😄
