import { useState } from 'react';
import { createDefaultSiteData } from '../data/defaults.ts';
import { ORDERED_ADMIN_SECTIONS, ADMIN_QUICK_ACTIONS, ADMIN_SECTION_LABELS } from '../data/admin-view.ts';
import type { AdminSection, ServiceCategory } from '../data/models.ts';

const DEMO = createDefaultSiteData();
const ALL_SERVICES = [...DEMO.categories].sort((a, b) => a.sortOrder - b.sortOrder);

function SectionHeader({ eyebrow, title, detail }: { eyebrow: string; title: string; detail: string }) {
  return <div className="admin-section-header">
    <div><p className="admin-eyebrow">{eyebrow}</p><h2>{title}</h2><p className="admin-section-description">{detail}</p></div>
    <span className="admin-section-tag">Taslak arayüz</span>
  </div>;
}

function InfoCard({ label, value, note }: { label: string; value: string; note: string }) {
  return <article className="admin-stat-card"><p>{label}</p><strong>{value}</strong><span>{note}</span></article>;
}

function DemoService({ service }: { service: ServiceCategory }) {
  return <li className="admin-service-row">
    <span className="admin-service-illustration" aria-hidden="true">▤</span>
    <span className="admin-service-main"><strong>{service.name}</strong><small>{service.group === 'cam-balkon' ? 'Cam Balkon' : service.group === 'pvc' ? 'PVC Sistemleri' : 'Diğer Hizmetler'}</small></span>
    <span className={service.visible ? 'admin-status admin-status--visible' : 'admin-status'}>
      {service.visible ? 'Görünür' : 'Gizli'}
    </span>
  </li>;
}

function WebSiteView() {
  return <>
    <SectionHeader eyebrow="GENEL BAKIŞ" title="Web Sitem" detail="İşletmenizin dijital vitrinini oluşturan örnek içerikleri burada inceleyebilirsiniz." />
    <div className="admin-stats">
      <InfoCard label="Hizmet kategorileri" value={String(DEMO.categories.length)} note="Örnek kategori kaydı" />
      <InfoCard label="Görünür hizmetler" value={String(DEMO.categories.filter((c) => c.visible).length)} note="Ziyaretçi vitrininde" />
      <InfoCard label="Proje fotoğrafları" value="0" note="Gerçek fotoğraf eklenmedi" />
    </div>
    <div className="admin-two-columns">
      <article className="admin-card">
        <div className="admin-card-title"><span className="admin-kicker">01 / SİTE ÖNİZLEMESİ</span><h3>Vitrin görünümü</h3></div>
        <div className="admin-preview-art" role="img" aria-label="Cam balkon ana görseli için temsili demo yer tutucusu">
          <span className="admin-preview-window" aria-hidden="true"><i></i><i></i><i></i></span>
          <span className="admin-preview-caption">Örnek görsel alanı</span>
        </div>
        <p className="admin-muted">Fotoğraf, logo ve işletme açıklamaları ileride buradan yönetilecek. Şu anda veri değiştirilmez.</p>
      </article>
      <article className="admin-card admin-overview-card">
        <div className="admin-card-title"><span className="admin-kicker">02 / İŞLETME KİMLİĞİ</span><h3>Tanıtım bilgileri</h3></div>
        <dl className="admin-details">
          <div><dt>İşletme adı</dt><dd>{DEMO.business.name}</dd></div>
          <div><dt>Görünüm teması</dt><dd>{DEMO.business.palette === 'orman' ? 'Orman yeşili' : DEMO.business.palette}</dd></div>
          <div><dt>WhatsApp</dt><dd>Numara tanımlanmadı</dd></div>
          <div><dt>Hesaplama</dt><dd>Devre dışı</dd></div>
        </dl>
        <p className="admin-safety-inline">Bu sayfa yalnızca tanıtım amaçlı demo panelidir. Ayarlar henüz düzenlenemez.</p>
      </article>
    </div>
  </>;
}

function ServicesView() {
  return <>
    <SectionHeader eyebrow="İÇERİK YÖNETİMİ" title="Hizmetler ve Projeler" detail="Kategori listesi demo verisinden okunur. Proje ekleme ve fotoğraf yükleme sonraki aşamalarda açılacak." />
    <div className="admin-two-columns">
      <section className="admin-card admin-wide">
        <div className="admin-card-title"><span className="admin-kicker">HİZMET LİSTESİ</span><h3>Örnek kategoriler</h3></div>
        <ul className="admin-service-list">{ALL_SERVICES.map((service) => <DemoService key={service.id} service={service} />)}</ul>
      </section>
      <aside className="admin-card admin-project-placeholder">
        <div className="admin-card-title"><span className="admin-kicker">PROJE GALERİSİ</span><h3>Proje Ekle — önizleme</h3></div>
        <div className="admin-empty-state" aria-label="Henüz örnek proje fotoğrafı yok">
          <span aria-hidden="true">▧</span><strong>Henüz proje eklenmedi</strong>
          <p>Gerçek fotoğraf, açıklama ve proje düzenleme kontrolleri sonraki adımda geliştirilecek.</p>
        </div>
        <p className="admin-muted">Bu ekranda kaydetme veya dosya yükleme işlemi yoktur.</p>
      </aside>
    </div>
  </>;
}

function PricingView() {
  return <>
    <SectionHeader eyebrow="HESAPLAMA TASARIMI" title="Fiyat Hesaplama" detail="Cam Balkon ve PVC için ayrı fiyat motorlarının geleceği, yalnızca görsel amaçlı taslak ekran." />
    <div className="admin-engine-grid">
      <article className="admin-engine-card"><div className="admin-engine-symbol" aria-hidden="true">▤</div>
        <span className="admin-kicker">MOTOR 01</span><h3>Cam Balkon</h3>
        <p>Cam tipi, sistem türü, ölçüler ve işçilik seçenekleri ayrı kurallarla yönetilecek.</p>
        <span className="admin-status">Hesaplama kapalı</span>
      </article>
      <article className="admin-engine-card"><div className="admin-engine-symbol" aria-hidden="true">▣</div>
        <span className="admin-kicker">MOTOR 02</span><h3>PVC Pencere ve Kapı</h3>
        <p>Profil, kanat, açılım ve aksesuarlar Cam Balkon hesaplamasından bağımsız olacak.</p>
        <span className="admin-status">Hesaplama kapalı</span>
      </article>
    </div>
    <section className="admin-card admin-note-card"><h3>Fiyat Güncelle — önizleme</h3>
      <p>Şu anda fiyat girilmez, hesap yapılmaz ve sahte teklif üretilmez. PVC-05 ve PVC-06 aşamalarında iki motor ayrı ayrı kurulacak.</p>
      <a className="admin-preview-link" href={(import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/') + 'teklif/'}>Üç adımlı hesaplama arayüzü demosunu aç ↗</a>
    </section>
  </>;
}

function LinksView() {
  return <>
    <SectionHeader eyebrow="TEKLİF İLETİŞİMİ" title="Teklif Bağlantıları" detail="Özel teklif bağlantılarının oluşturulacağı alanın tasarım önizlemesi." />
    <div className="admin-card admin-note-card">
      <div className="admin-card-title"><span className="admin-kicker">BAĞLANTI YÖNETİMİ</span><h3>Teklif Linki Gönder — önizleme</h3></div>
      <div className="admin-empty-state"><span aria-hidden="true">↗</span><strong>Henüz teklif bağlantısı yok</strong>
        <p>Hesaplama modları: Herkese açık, özel bağlantı ve kapalı. Şimdilik tamamı işlevsiz taslaktır.</p>
      </div>
      <p className="admin-safety-inline">WhatsApp veya başka bir uygulamaya bağlantı gönderilmez. Link oluşturma özelliği PVC-07 aşamasında geliştirilecek.</p>
    </div>
  </>;
}

function SettingsView() {
  return <>
    <SectionHeader eyebrow="GÖRÜNÜM VE AYARLAR" title="Ayarlar" detail="İşletme kimliği, iletişim ve site görünümüne ilişkin örnek ayarlar. Şu an salt okunur." />
    <div className="admin-two-columns">
      <article className="admin-card"><div className="admin-card-title"><span className="admin-kicker">MARKA BİLGİLERİ</span><h3>İşletme</h3></div>
        <dl className="admin-details"><div><dt>Firma adı</dt><dd>{DEMO.business.name}</dd></div>
          <div><dt>Telefon / WhatsApp</dt><dd>Henüz eklenmedi</dd></div>
          <div><dt>Adres</dt><dd>Henüz eklenmedi</dd></div></dl>
      </article>
      <article className="admin-card"><div className="admin-card-title"><span className="admin-kicker">RENK PALETLERİ</span><h3>Görünüm seçenekleri</h3></div>
        <div className="admin-palettes">
          <div><span className="admin-swatch admin-swatch--forest" aria-hidden="true"></span><strong>Orman yeşili</strong><small>Örnek aktif tema</small></div>
          <div><span className="admin-swatch admin-swatch--navy" aria-hidden="true"></span><strong>Lacivert</strong><small>Önizleme</small></div>
          <div><span className="admin-swatch admin-swatch--charcoal" aria-hidden="true"></span><strong>Antrasit</strong><small>Önizleme</small></div>
        </div>
        <p className="admin-muted">Tema değiştirme işlevi bu adımda etkinleştirilmez.</p>
      </article>
    </div>
  </>;
}

export default function AdminDemo() {
  const [active, setActive] = useState<AdminSection>('web-sitem');
  const [notice, setNotice] = useState('');
  const navigate = (section: AdminSection) => { setActive(section); setNotice(''); };
  const goToAction = (target: AdminSection, label: string) => {
    setActive(target);
    setNotice(label + ': İlgili taslak bölüme geçildi. Gerçek işlem yapılmadı, veri kaydedilmedi.');
  };

  return <div className="admin-shell" data-testid="admin-panel">
    <div className="admin-demo-banner" role="status">
      <span className="admin-demo-dot" aria-hidden="true"></span>
      <strong>DEMO PANEL</strong><span>Bu ekran herkese açık bir arayüz taslağıdır; şifre koruması veya gerçek yönetim yetkisi sunmaz.</span>
    </div>
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand"><span className="admin-brand-logo" aria-hidden="true">▤</span>
          <span><strong>Atölye Panel</strong><small>Cam Balkon &amp; PVC</small></span>
        </div>
        <div className="admin-nav-header">YÖNETİM BÖLÜMLERİ</div>
        <nav aria-label="Panel bölümleri" className="admin-navigation">
          {ORDERED_ADMIN_SECTIONS.map((section) =>
            <button key={section.id} type="button" aria-pressed={active === section.id} onClick={() => navigate(section.id)}
              className={'admin-nav-button' + (active === section.id ? ' is-active' : '')}>
              <span aria-hidden="true">{section.icon}</span><span>{section.label}</span>
            </button>)}
        </nav>
        <div className="admin-sidebar-bottom">
          <strong>Güvenli demo sınırı</strong>
          <p>Gerçek yönetici girişi, fiyat hesabı veya mesaj gönderimi bu sürümde yoktur.</p>
        </div>
      </aside>
      <div className="admin-workspace">
        <header className="admin-topbar">
          <div><p className="admin-eyebrow">İŞLETME YÖNETİMİ / ÖRNEK EKRAN</p>
            <h1>{ADMIN_SECTION_LABELS[active]}</h1></div>
          <span className="admin-user-chip"><span aria-hidden="true">◉</span> Demo görünümü</span>
        </header>
        <main className="admin-main">
          <section className="admin-welcome">
            <div><span className="admin-kicker">İŞLETME YÖNETİM PANELİ</span>
              <h2>İşletmeniz, <em>kontrolünüzde.</em></h2>
              <p>Cam Balkon ve PVC işletmeleri için sade, anlaşılır bir yönetim deneyiminin ilk önizlemesi.</p>
            </div>
            <span className="admin-welcome-deco" aria-hidden="true">◈</span>
          </section>
          <section className="admin-quick-section" aria-labelledby="quick-actions-title">
            <div className="admin-quick-heading"><h2 id="quick-actions-title">Hızlı İşlemler</h2><span>Yalnızca bölüm önizlemesi açılır</span></div>
            <div className="admin-quick-grid">{ADMIN_QUICK_ACTIONS.map((action) =>
              <button type="button" key={action.id} data-action={action.id} onClick={() => goToAction(action.target, action.label)}
                className="admin-quick-action"><span className="admin-action-icon" aria-hidden="true">{action.id === 'proje-ekle' ? '+' : action.id === 'fiyat-guncelle' ? '₺' : '↗'}</span>
                <span className="admin-action-copy"><strong>{action.label}</strong><small>{action.hint} · İşlem yapmaz</small></span>
                <span className="admin-action-arrow" aria-hidden="true">↗</span>
              </button>)}</div>
            {notice && <p className="admin-action-feedback" role="status">{notice}</p>}
          </section>
          <section className="admin-section" aria-label="Seçili panel bölümü" data-section={active}>
            {active === 'web-sitem' && <WebSiteView />}
            {active === 'hizmetler-ve-projeler' && <ServicesView />}
            {active === 'fiyat-hesaplama' && <PricingView />}
            {active === 'teklif-baglantilari' && <LinksView />}
            {active === 'ayarlar' && <SettingsView />}
          </section>
          <footer className="admin-footer"><span>Cam Balkon &amp; PVC · Tasarım prototipi</span>
            <a href={import.meta.env.BASE_URL}>← Müşteri sitesi önizlemesine dön</a></footer>
        </main>
      </div>
    </div>
  </div>;
}
