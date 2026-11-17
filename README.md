# Cam Balkon & PVC — Herkese Açık DEMO

Bu **Public** depo yalnızca örnek verilerle hazırlanan, çalışır üretim sistemi olmayan bir ziyaretçi önizlemesidir. Özel kaynak deposu \`profesyonel-site-sablonlari\` Private olarak kalır.

## Önizleme sayfaları

- Müşteri vitrini: https://sedathut-sys.github.io/cam-balkon-pvc-demo/
- Beş bölümlü demo paneli: https://sedathut-sys.github.io/cam-balkon-pvc-demo/panel/
- Cam Balkon / PVC üç adımlı teklif demosu: https://sedathut-sys.github.io/cam-balkon-pvc-demo/teklif/

**Bu bağlantılar tasarım önizlemeleridir.** Panel herkese açıktır ve gerçek giriş/yetkilendirme içermez. Teklif taslağı gerçek tutar, mesaj, kayıt veya WhatsApp iletimi oluşturmaz. Firma bilgileri ve görseller örnektir. D1/R2, Cloudflare, şifreler, API ve gerçek müşteri verileri bulunmaz.

## GitHub Pages

\`.github/workflows/pages.yml\`, \`main\` değişikliklerinde Node.js 24 ile demo birim testlerini ve \`npm run build\` komutunu çalıştırır. \`npm run quality\` üç ayrı statik sayfanın güvenlik uyarılarını ve site alt yollarını doğrular. Ardından yalnızca \`dist/\` klasörü GitHub Pages'e gönderilir.

GitHub Settings → Pages → Build and deployment → Source **GitHub Actions** olmalıdır.

**Yayın bağlantıları canlı açılarak doğrulanmadan güncellendiği iddia edilmez.**
