import type { BusinessSettings, ServiceCategory } from '../data/models.ts';

/** Yalnızca işletmecinin görünür yaptığı hizmetleri, açık sırayla listeler. */
export function getVisibleServices(categories: readonly ServiceCategory[]): ServiceCategory[] {
  return categories
    .filter((category) => category.visible)
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, 'tr'));
}

/** Numara girilmediyse gerçek WhatsApp linki oluşturulmaz. */
export function getWhatsAppQuoteHref(business: Pick<BusinessSettings, 'name' | 'whatsappNumber'>): string | null {
  const number = business.whatsappNumber.trim();
  if (!/^\+?[1-9]\d{7,14}$/.test(number)) return null;
  const digits = number.replace(/\D/g, '');
  const message = 'Merhaba, ' + business.name + ' için cam balkon / PVC hizmetleri hakkında teklif almak istiyorum.';
  return 'https://wa.me/' + digits + '?text=' + encodeURIComponent(message);
}

/** Hesaplama özelliği tamamlanana kadar sahte bir fiyat bağlantısı sunulmaz. */
export function shouldShowCalculatorLink(): boolean {
  return false;
}
