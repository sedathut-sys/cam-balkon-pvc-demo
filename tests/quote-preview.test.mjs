import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createDefaultSiteData } from '../src/data/defaults.ts';
import {
  servicesForKind, emptyGlassPreview, emptyPvcPreview,
  validPreviewDimension, validPreviewDimensions, glassPreviewReady, pvcPreviewReady,
} from '../src/lib/quote-preview.ts';

test('Cam Balkon ve PVC seçimleri farklı kategoriler verir', () => {
  const data = createDefaultSiteData();
  const glass = servicesForKind(data.categories, 'cam-balkon');
  const pvc = servicesForKind(data.categories, 'pvc');
  assert.ok(glass.length > 0);
  assert.ok(pvc.length > 0);
  assert.ok(glass.every((s) => s.group === 'cam-balkon' && s.pricingEngine === 'cam-balkon'));
  assert.ok(pvc.every((s) => s.group === 'pvc' && s.pricingEngine === 'pvc'));
  assert.deepEqual(glass.filter((s) => pvc.includes(s)), []);
  assert.deepEqual(servicesForKind(data.categories, null), []);
  assert.equal(servicesForKind(data.categories, 'pvc').some((s) => s.id === 'sineklik'), false);
});
test('Gizli veya çapraz motorlu hizmet seçime girmez', () => {
  const data = createDefaultSiteData();
  data.categories[0].pricingEngine = 'pvc';
  data.categories[1].visible = false;
  const glass = servicesForKind(data.categories, 'cam-balkon');
  assert.equal(glass.some((s) => s.id === data.categories[0].id), false);
  assert.equal(glass.some((s) => s.id === data.categories[1].id), false);
});
test('Sayısal ölçü girişinde sınırlar denetlenir ama alan veya fiyat hesaplanmaz', () => {
  for (const text of ['20','123.5','1500','22,4']) assert.equal(validPreviewDimension(text), true);
  for (const text of ['', '1', '19.99', '1500.1', '-45', 'x', 'NaN', 'Infinity']) assert.equal(validPreviewDimension(text), false);
});
test('Ölçü bilinmiyor seçeneği örnek akışa izin verir', () => {
  assert.equal(validPreviewDimensions({widthCm:'',heightCm:'',unknownMeasurements:true}), true);
  assert.equal(validPreviewDimensions({widthCm:'',heightCm:'',unknownMeasurements:false}), false);
});
test('Cam ve PVC taslaklarının doğrulaması farklıdır', () => {
  const glass = emptyGlassPreview();
  const pvc = emptyPvcPreview();
  assert.equal(glassPreviewReady(glass),false);
  assert.equal(pvcPreviewReady(pvc),false);
  glass.unknownMeasurements = true;
  glass.glassType = 'temperli';
  assert.equal(glassPreviewReady(glass),true);
  assert.equal(pvcPreviewReady(pvc),false);
  pvc.widthCm = '180';
  pvc.heightCm = '240';
  pvc.opening = 'tek-acilim';
  pvc.profile = 'ornek-a';
  assert.equal(pvcPreviewReady(pvc),true);
});
test('Demo sayfa sadece tasarımdır, fiyat/WhatsApp/API arayüzü yoktur', () => {
  const source = readFileSync(new URL('../src/components/QuotePreview.tsx',import.meta.url),'utf8');
  const page = readFileSync(new URL('../src/pages/teklif/index.astro',import.meta.url),'utf8');
  assert.match(page,/QuotePreview client:load/);
  assert.match(source,/Gerçek fiyat, teklif, kayıt veya mesaj gönderimi yapılmaz/);
  assert.match(source,/Fiyat hesaplanmadı/);
  assert.equal(source.includes('fetch('), false);
  assert.equal(source.includes('localStorage'), false);
  assert.equal(source.includes('wa.me'), false);
  assert.equal(source.includes('type="submit"'), false);
});
