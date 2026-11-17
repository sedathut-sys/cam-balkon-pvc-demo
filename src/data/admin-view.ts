import { ADMIN_SECTIONS, type AdminSection } from './models.ts';

export const ADMIN_SECTION_LABELS: Record<AdminSection, string> = {
  'web-sitem': 'Web Sitem',
  'hizmetler-ve-projeler': 'Hizmetler ve Projeler',
  'fiyat-hesaplama': 'Fiyat Hesaplama',
  'teklif-baglantilari': 'Teklif Bağlantıları',
  'ayarlar': 'Ayarlar',
};

export const ADMIN_SECTION_ICONS: Record<AdminSection, string> = {
  'web-sitem': '◈',
  'hizmetler-ve-projeler': '▦',
  'fiyat-hesaplama': '⊞',
  'teklif-baglantilari': '↗',
  'ayarlar': '⚙',
};

export type QuickActionId = 'proje-ekle' | 'fiyat-guncelle' | 'teklif-linki-gonder';

export interface QuickAction {
  id: QuickActionId;
  label: string;
  target: AdminSection;
  hint: string;
}

export const ADMIN_QUICK_ACTIONS: readonly QuickAction[] = [
  { id: 'proje-ekle', label: 'Proje Ekle', target: 'hizmetler-ve-projeler', hint: 'Proje yönetimi önizlemesi' },
  { id: 'fiyat-guncelle', label: 'Fiyat Güncelle', target: 'fiyat-hesaplama', hint: 'Fiyat motoru önizlemesi' },
  { id: 'teklif-linki-gonder', label: 'Teklif Linki Gönder', target: 'teklif-baglantilari', hint: 'Bağlantı yönetimi önizlemesi' },
] as const;

export const ORDERED_ADMIN_SECTIONS = ADMIN_SECTIONS.map((id) => ({
  id,
  label: ADMIN_SECTION_LABELS[id],
  icon: ADMIN_SECTION_ICONS[id],
}));
