import type { SiteData, ServiceCategory } from './models.ts';

const initialCategories: ServiceCategory[] = [
  { id: 'katlanir-cam-balkon', slug: 'katlanir-cam-balkon', name: 'Katlanır Cam Balkon', description: '', group: 'cam-balkon', pricingEngine: 'cam-balkon', visible: true, calculatorEnabled: false, sortOrder: 10, imageUrl: '' },
  { id: 'surgulu-cam-balkon', slug: 'surgulu-cam-balkon', name: 'Sürgülü Cam Balkon', description: '', group: 'cam-balkon', pricingEngine: 'cam-balkon', visible: true, calculatorEnabled: false, sortOrder: 20, imageUrl: '' },
  { id: 'isicamli-cam-balkon', slug: 'isicamli-cam-balkon', name: 'Isıcamlı Cam Balkon', description: '', group: 'cam-balkon', pricingEngine: 'cam-balkon', visible: true, calculatorEnabled: false, sortOrder: 30, imageUrl: '' },
  { id: 'pvc-pencere', slug: 'pvc-pencere', name: 'PVC Pencere', description: '', group: 'pvc', pricingEngine: 'pvc', visible: true, calculatorEnabled: false, sortOrder: 40, imageUrl: '' },
  { id: 'pvc-kapi', slug: 'pvc-kapi', name: 'PVC Kapı', description: '', group: 'pvc', pricingEngine: 'pvc', visible: true, calculatorEnabled: false, sortOrder: 50, imageUrl: '' },
  { id: 'pvc-surgu', slug: 'pvc-surgu', name: 'PVC Sürgülü Sistem', description: '', group: 'pvc', pricingEngine: 'pvc', visible: true, calculatorEnabled: false, sortOrder: 60, imageUrl: '' },
  { id: 'sineklik', slug: 'sineklik', name: 'Sineklik', description: '', group: 'diger', pricingEngine: 'none', visible: false, calculatorEnabled: false, sortOrder: 70, imageUrl: '' },
];
/** Örnek veri gerçek işletme iletişimi veya fiyat bilgisi içermez. */
export function createDefaultSiteData(): SiteData {
  return {
    schemaVersion: 1,
    business: {
      name: 'Örnek Cam Balkon & PVC',
      tagline: 'Cam Balkon ve PVC Hizmetleri',
      description: '', phone: '', whatsappNumber: '', email: '', address: '',
      serviceAreas: [], logoUrl: '', heroImageUrl: '', palette: 'orman',
      calculatorAccess: 'disabled',
      optionalQuoteFields: {
        unknownMeasurements: true, replacement: false, floorAccess: false,
        colorChoice: false, inclusions: false, plannedTiming: false,
      },
    },
    categories: initialCategories.map((category) => ({ ...category })),
  };
}
