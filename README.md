# Cam Balkon & PVC — Ziyaretçi Demo

Bu **Public** depo yalnızca müşteriye gösterilecek örnek sektörel web sitesini içerir.

- Teknoloji: Astro 7 (statik) + React 19.
- Firma, görseller, teklif ve WhatsApp gerçek değildir; demo olarak açıkça işaretlenmiştir.
- Gerçek yönetim API'si, D1/R2, şifreler, özel işletme verileri veya müşteri verileri bu depoda yoktur.
- Asıl ana kaynak deposu **Private** `profesyonel-site-sablonlari` olarak korunur.
- Otomatik GitHub Actions: `.github/workflows/pages.yml`.
- Build: `npm run build`; kalite kontrolü: `npm run quality`.

## GitHub Pages kurulumu

GitHub **Settings → Pages → Build and deployment → Source: GitHub Actions** seçilir.
Sonra `main` dalındaki `pages.yml` derlemeyi kontrol edip yalnızca `dist/` klasörünü yayınlar.

Hedef önizleme yolu: `https://sedathut-sys.github.io/cam-balkon-pvc-demo/`.
**Yayın çalıştığı HTTP ve sayfa içeriğiyle doğrulanmadan aktif kabul edilmez.**

Bu çalışma Taş Fırın, Cloudflare ve diğer sitelerin yayınını değiştirmez.
