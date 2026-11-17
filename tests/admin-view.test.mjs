import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ADMIN_SECTIONS } from '../src/data/models.ts';
import { ADMIN_QUICK_ACTIONS, ADMIN_SECTION_LABELS, ORDERED_ADMIN_SECTIONS } from '../src/data/admin-view.ts';
import { createDefaultSiteData } from '../src/data/defaults.ts';

test('Panelde tam olarak kilitli beş ana bölüm görünür', () => {
  assert.equal(ORDERED_ADMIN_SECTIONS.length, 5);
  assert.deepEqual(ORDERED_ADMIN_SECTIONS.map((section) => section.id), ADMIN_SECTIONS);
  assert.deepEqual(ORDERED_ADMIN_SECTIONS.map((section) => section.label), [
    'Web Sitem', 'Hizmetler ve Projeler', 'Fiyat Hesaplama', 'Teklif Bağlantıları', 'Ayarlar',
  ]);
});
test('Üç hızlı işlem yalnızca bir taslak bölüme yönlendirir', () => {
  assert.deepEqual(ADMIN_QUICK_ACTIONS.map((action) => action.label),
    ['Proje Ekle', 'Fiyat Güncelle', 'Teklif Linki Gönder']);
  assert.equal(new Set(ADMIN_QUICK_ACTIONS.map((action) => action.id)).size, 3);
  for (const action of ADMIN_QUICK_ACTIONS) assert.ok(ADMIN_SECTIONS.includes(action.target));
  assert.equal(ADMIN_QUICK_ACTIONS[0].target, 'hizmetler-ve-projeler');
  assert.equal(ADMIN_QUICK_ACTIONS[1].target, 'fiyat-hesaplama');
  assert.equal(ADMIN_QUICK_ACTIONS[2].target, 'teklif-baglantilari');
});
test('Demo fiyat ve gerçek WhatsApp özellikleri kapalıdır', () => {
  const demo = createDefaultSiteData();
  assert.equal(demo.business.calculatorAccess, 'disabled');
  assert.equal(demo.business.whatsappNumber, '');
  assert.equal(demo.categories.every((category) => !category.calculatorEnabled), true);
});
test('Panel sayfasında React island ve noindex etiketini veren Main kullanılır', () => {
  const source = readFileSync(new URL('../src/pages/panel/index.astro',import.meta.url),'utf8');
  assert.match(source, /AdminDemo client:load/);
  assert.match(source, /<Main/);
  assert.match(source, /admin.css/);
});
test('Panelde sahte kaydetme, para talebi veya WhatsApp gönderim olayı yoktur', () => {
  const component = readFileSync(new URL('../src/components/AdminDemo.tsx',import.meta.url),'utf8');
  assert.match(component, /Gerçek işlem yapılmadı, veri kaydedilmedi/);
  assert.match(component, /şifre koruması veya gerçek yönetim yetkisi sunmaz/);
  assert.ok(!component.includes('fetch('));
  assert.ok(!component.includes('localStorage'));
  assert.ok(!component.includes('wa.me'));
  assert.ok(!component.includes('type="submit"'));
  assert.equal(Object.keys(ADMIN_SECTION_LABELS).length, 5);
});
