import type { ServiceCategory } from '../data/models.ts';

export type QuoteKind = 'cam-balkon' | 'pvc';
export type QuoteStep = 1 | 2 | 3;

export interface GlassPreviewDraft {
  widthCm: string;
  heightCm: string;
  unknownMeasurements: boolean;
  glassType: '' | 'temperli' | 'isicam';
}
export interface PvcPreviewDraft {
  widthCm: string;
  heightCm: string;
  unknownMeasurements: boolean;
  profile: '' | 'ornek-a' | 'ornek-b';
  opening: '' | 'tek-acilim' | 'cift-acilim' | 'surme';
}

export function emptyGlassPreview(): GlassPreviewDraft {
  return { widthCm: '', heightCm: '', unknownMeasurements: false, glassType: '' };
}
export function emptyPvcPreview(): PvcPreviewDraft {
  return { widthCm: '', heightCm: '', unknownMeasurements: false, profile: '', opening: '' };
}

/** İki motorun hizmetleri birbirine karıştırılamaz. Fiyatlandırma motoru henüz yok. */
export function servicesForKind(categories: readonly ServiceCategory[], kind: QuoteKind | null): ServiceCategory[] {
  if (!kind) return [];
  return categories.filter((service) =>
    service.visible && service.group === kind && service.pricingEngine === kind
  ).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function validPreviewDimension(text: string): boolean {
  const trimmed = text.trim();
  if (!/^\d+(?:[.,]\d{1,2})?$/.test(trimmed)) return false;
  const number = Number(trimmed.replace(',', '.'));
  return Number.isFinite(number) && number >= 20 && number <= 1500;
}
export function validPreviewDimensions(draft: { widthCm: string; heightCm: string; unknownMeasurements: boolean }): boolean {
  return draft.unknownMeasurements ||
    (validPreviewDimension(draft.widthCm) && validPreviewDimension(draft.heightCm));
}
export function glassPreviewReady(draft: GlassPreviewDraft): boolean {
  return validPreviewDimensions(draft) && draft.glassType !== '';
}
export function pvcPreviewReady(draft: PvcPreviewDraft): boolean {
  return validPreviewDimensions(draft) && draft.opening !== '' && draft.profile !== '';
}

export const GLASS_TYPES: Readonly<Record<Exclude<GlassPreviewDraft['glassType'], ''>, string>> = {
  temperli: 'Temperli cam (örnek)',
  isicam: 'Isıcam (örnek)',
};
export const PVC_PROFILES: Readonly<Record<Exclude<PvcPreviewDraft['profile'], ''>, string>> = {
  'ornek-a': 'Örnek profil A',
  'ornek-b': 'Örnek profil B',
};
export const PVC_OPENINGS: Readonly<Record<Exclude<PvcPreviewDraft['opening'], ''>, string>> = {
  'tek-acilim': 'Tek açılım',
  'cift-acilim': 'Çift açılım',
  surme: 'Sürme',
};
