# Cam Balkon & PVC — Herkese Açık Görselli DEMO

Bu **Public** depo yalnızca müşteriye gösterilecek **derlenmiş statik demo** yayınını içerir. Tam Astro/React kaynak kodu, testler ve gerçek işletmeci altyapısı özel `sedathut-sys/profesyonel-site-sablonlari` deposundadır. Public depoda bulunan önceki demo geliştirme kaynakları, artık **yayımlanan sürümün kaynağı değildir**; `site/` GitHub Pages'e dağıtılır.

## Ziyaretçi test adresleri

- [Müşteri ana sayfası](https://sedathut-sys.github.io/cam-balkon-pvc-demo/)
- [Hizmetler — Cam Balkon](https://sedathut-sys.github.io/cam-balkon-pvc-demo/hizmetler/cam-balkon/)
- [Hizmetler — PVC](https://sedathut-sys.github.io/cam-balkon-pvc-demo/hizmetler/pvc/)
- [Proje galerisi](https://sedathut-sys.github.io/cam-balkon-pvc-demo/projeler/)
- [Beş bölümlü demo paneli](https://sedathut-sys.github.io/cam-balkon-pvc-demo/panel/)
- [Üç adımlı teklif demosu](https://sedathut-sys.github.io/cam-balkon-pvc-demo/teklif/)

## Sınırlar ve güvenlik

Görseller yapay zekâ ile oluşturulmuş **temsili** örneklerdir; gerçek işletme referansları değildir. Bu sitede gerçek fiyat motoru, WhatsApp gönderimi, yönetim API'si, D1/R2/Cloudflare, gerçek üyelik veya müşteri verisi bulunmaz. Panel herkese açık tasarım demodur.

- **Asıl özel geliştirme dalı:** `feature/cam-balkon-pvc-gorsel-hazirlik-20261118`
- **Kaynakta doğrulanan test:** 52/52 birim testi, 450/450 Playwright, Astro/TypeScript ve üretim derlemesi PASS (18 Kasım 2026)
- **Yayın güvencesi:** `.github/workflows/pages.yml` içindeki `node scripts/check-static-release.mjs` yalnızca `site/` klasörünü test edip yayımlar.
- **Eski demo yedeği:** `backup/onceki-demo-2026-11-18` dalı.

Yayın sonrası gerçek URL ve görseller HTTP üzerinden kontrol edilmeden "canlı onay" verilmez.
