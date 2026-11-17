/** Cam Balkon & PVC sektörel veri sözleşmesi; fiyat kuralları ayrı geliştirilecektir. */
export const ADMIN_SECTIONS = [
  'web-sitem', 'hizmetler-ve-projeler', 'fiyat-hesaplama',
  'teklif-baglantilari', 'ayarlar',
] as const;
export type AdminSection = (typeof ADMIN_SECTIONS)[number];
export type ServiceGroup = 'cam-balkon' | 'pvc' | 'diger';
export type PricingEngine = 'cam-balkon' | 'pvc' | 'none';
export type CalculatorAccess = 'public' | 'link-only' | 'disabled';
export type PaletteId = 'orman' | 'lacivert' | 'antrasit';

export interface OptionalQuoteFields {
  unknownMeasurements: boolean;
  replacement: boolean;
  floorAccess: boolean;
  colorChoice: boolean;
  inclusions: boolean;
  plannedTiming: boolean;
}
export interface BusinessSettings {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  serviceAreas: string[];
  logoUrl: string;
  heroImageUrl: string;
  palette: PaletteId;
  calculatorAccess: CalculatorAccess;
  optionalQuoteFields: OptionalQuoteFields;
}
export interface ServiceCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  group: ServiceGroup;
  pricingEngine: PricingEngine;
  visible: boolean;
  calculatorEnabled: boolean;
  sortOrder: number;
  imageUrl: string;
}
export interface SiteData {
  schemaVersion: 1;
  business: BusinessSettings;
  categories: ServiceCategory[];
}
