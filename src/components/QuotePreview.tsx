import { useState } from 'react';
import { createDefaultSiteData } from '../data/defaults.ts';
import type { ServiceCategory } from '../data/models.ts';
import {
  emptyGlassPreview, emptyPvcPreview, glassPreviewReady, pvcPreviewReady,
  servicesForKind, GLASS_TYPES, PVC_OPENINGS, PVC_PROFILES,
  type GlassPreviewDraft, type PvcPreviewDraft, type QuoteKind, type QuoteStep,
} from '../lib/quote-preview.ts';

const CATEGORIES: ServiceCategory[] = createDefaultSiteData().categories;
const KIND_NAMES: Record<QuoteKind, string> = {
  'cam-balkon': 'Cam Balkon',
  pvc: 'PVC Pencere ve Kapı',
};
const STEPS = ['Hizmet seçimi', 'Ölçü / seçenekler', 'Talep özeti'];

type DimensionFieldsProps = {
  prefix: string;
  widthCm: string;
  heightCm: string;
  unknownMeasurements: boolean;
  onWidth: (text: string) => void;
  onHeight: (text: string) => void;
  onUnknown: (checked: boolean) => void;
};
function DimensionFields(props: DimensionFieldsProps) {
  return <fieldset className="qp-fieldset">
    <legend>Yaklaşık ölçüler</legend>
    <p className="qp-field-help">Ölçüler yalnızca ekran önizlemesi içindir; fiyat veya alan hesabında kullanılmaz.</p>
    <label className="qp-check">
      <input type="checkbox" checked={props.unknownMeasurements} onChange={(event) => props.onUnknown(event.target.checked)} />
      <span>Ölçülerimi henüz bilmiyorum</span>
    </label>
    <div className="qp-dim-grid">
      <label htmlFor={props.prefix + '-width'}>Genişlik (cm)
        <input id={props.prefix + '-width'} type="number" inputMode="decimal" min="20" max="1500" step="0.01"
          placeholder="Örn. 300" disabled={props.unknownMeasurements} value={props.widthCm}
          onChange={(event) => props.onWidth(event.target.value)} />
      </label>
      <label htmlFor={props.prefix + '-height'}>Yükseklik (cm)
        <input id={props.prefix + '-height'} type="number" inputMode="decimal" min="20" max="1500" step="0.01"
          placeholder="Örn. 220" disabled={props.unknownMeasurements} value={props.heightCm}
          onChange={(event) => props.onHeight(event.target.value)} />
      </label>
    </div>
  </fieldset>;
}
function SummaryRow({ term, value }: { term: string; value: string }) {
  return <div className="qp-summary-row"><dt>{term}</dt><dd>{value}</dd></div>;
}
function GlassFields({ draft, setDraft }: {
  draft: GlassPreviewDraft;
  setDraft: (next: GlassPreviewDraft) => void;
}) {
  return <div data-testid="glass-fields" className="qp-fields">
    <h3>Cam Balkon seçenekleri</h3>
    <DimensionFields prefix="glass" widthCm={draft.widthCm} heightCm={draft.heightCm}
      unknownMeasurements={draft.unknownMeasurements}
      onWidth={(text) => setDraft({ ...draft, widthCm: text })}
      onHeight={(text) => setDraft({ ...draft, heightCm: text })}
      onUnknown={(checked) => setDraft({ ...draft, unknownMeasurements: checked })} />
    <label htmlFor="glass-type">Cam türü
      <select id="glass-type" value={draft.glassType}
        onChange={(event) => setDraft({ ...draft, glassType: event.target.value as GlassPreviewDraft['glassType'] })}>
        <option value="">Cam türü seçin</option>
        {Object.entries(GLASS_TYPES).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
      </select>
    </label>
    <p className="qp-field-help">Cam Balkon sistemi, PVC profil ve açılım seçeneklerinden bağımsızdır.</p>
  </div>;
}
function PvcFields({ draft, setDraft }: {
  draft: PvcPreviewDraft;
  setDraft: (next: PvcPreviewDraft) => void;
}) {
  return <div data-testid="pvc-fields" className="qp-fields">
    <h3>PVC seçenekleri</h3>
    <DimensionFields prefix="pvc" widthCm={draft.widthCm} heightCm={draft.heightCm}
      unknownMeasurements={draft.unknownMeasurements}
      onWidth={(text) => setDraft({ ...draft, widthCm: text })}
      onHeight={(text) => setDraft({ ...draft, heightCm: text })}
      onUnknown={(checked) => setDraft({ ...draft, unknownMeasurements: checked })} />
    <div className="qp-dim-grid">
      <label htmlFor="pvc-profile">Profil seçeneği
        <select id="pvc-profile" value={draft.profile}
          onChange={(event) => setDraft({ ...draft, profile: event.target.value as PvcPreviewDraft['profile'] })}>
          <option value="">Profil seçin</option>
          {Object.entries(PVC_PROFILES).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </label>
      <label htmlFor="pvc-opening">Açılım türü
        <select id="pvc-opening" value={draft.opening}
          onChange={(event) => setDraft({ ...draft, opening: event.target.value as PvcPreviewDraft['opening'] })}>
          <option value="">Açılım seçin</option>
          {Object.entries(PVC_OPENINGS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </label>
    </div>
    <p className="qp-field-help">PVC seçimi, Cam Balkon cam türü ve hesaplama seçeneklerinden bağımsızdır.</p>
  </div>;
}

export default function QuotePreview() {
  const [step, setStep] = useState<QuoteStep>(1);
  const [kind, setKind] = useState<QuoteKind | null>(null);
  const [serviceId, setServiceId] = useState('');
  const [glass, setGlass] = useState<GlassPreviewDraft>(emptyGlassPreview);
  const [pvc, setPvc] = useState<PvcPreviewDraft>(emptyPvcPreview);
  const [notice, setNotice] = useState('');

  const services = servicesForKind(CATEGORIES, kind);
  const service = services.find((item) => item.id === serviceId);
  const isReady = kind === 'cam-balkon' ? glassPreviewReady(glass) :
    kind === 'pvc' ? pvcPreviewReady(pvc) : false;

  const changeKind = (next: QuoteKind) => {
    if (kind !== next) {
      setGlass(emptyGlassPreview());
      setPvc(emptyPvcPreview());
      setServiceId('');
    }
    setKind(next);
    setStep(1);
    setNotice('');
  };
  const reset = () => {
    setKind(null);
    setServiceId('');
    setGlass(emptyGlassPreview());
    setPvc(emptyPvcPreview());
    setStep(1);
    setNotice('');
  };
  const goNext = () => {
    if (step === 1 && service) { setStep(2); setNotice(''); }
    else if (step === 2 && isReady) { setStep(3); setNotice(''); }
  };
  const back = () => { if (step === 2) setStep(1); else if (step === 3) setStep(2); setNotice(''); };

  return <div className="qp-root" data-testid="quote-demo">
    <div className="qp-demo-banner" role="status">DEMO / Görsel akış önizlemesi · Gerçek fiyat, teklif, kayıt veya mesaj gönderimi yapılmaz.</div>
    <header className="qp-header">
      <div className="qp-container qp-header-inner">
        <a className="qp-brand" href={import.meta.env.BASE_URL}><span aria-hidden="true">▤</span> Cam Balkon &amp; PVC <small>Teklif ekranı demosu</small></a>
        <span className="qp-readonly">Hesaplama kapalı</span>
      </div>
    </header>
    <main className="qp-container qp-main">
      <div className="qp-intro">
        <div><p className="qp-overline">ÜÇ ADIMDA TALEP ÖNİZLEMESİ</p>
          <h1>Projenizi birlikte <em>şekillendirelim.</em></h1>
          <p>Bu arayüz ölçü ve tercihlerinizin nasıl toplanacağını gösterir. Gerçek bir fiyat teklifi oluşturmaz.</p>
        </div>
        <div className="qp-intro-icon" aria-hidden="true">▥</div>
      </div>

      <nav className="qp-progress" aria-label="Teklif adımları">
        <ol>{STEPS.map((title, index) => {
          const number = (index + 1) as QuoteStep;
          return <li key={title} className={step === number ? 'is-current' : step > number ? 'is-done' : ''}
            aria-current={step === number ? 'step' : undefined}>
            <span className="qp-progress-number">{number}</span><span className="qp-progress-label">{title}</span>
          </li>;
        })}</ol>
      </nav>

      <div className="qp-content-grid">
        <section className="qp-card qp-stage" data-step={step} aria-label={'Adım ' + step + ': ' + STEPS[step - 1]}>
          <div className="qp-stage-header">
            <span className="qp-step-mark">ADIM 0{step} / 03</span>
            <h2>{step === 1 ? 'Hangi hizmeti arıyorsunuz?' : step === 2 ? 'Ölçü ve tercihlerinizi belirtin' : 'Talep bilgilerinizi gözden geçirin'}</h2>
            <p>{step === 1 ? 'Cam Balkon ve PVC farklı süreçlerdir. Önce birini seçin.' :
              step === 2 ? 'Yalnızca seçtiğiniz hizmete uygun alanları doldurun.' :
              'Bu ekran fiyatlandırma değil, girilen demo bilgilerinin özetidir.'}</p>
          </div>
          {step === 1 && <div className="qp-step-one">
            <div className="qp-modes" role="group" aria-label="Sistem seçimi">
              {(['cam-balkon', 'pvc'] as const).map((item) =>
                <button key={item} type="button" data-testid={item === 'cam-balkon' ? 'choose-glass' : 'choose-pvc'}
                  className={'qp-mode' + (kind === item ? ' is-selected' : '')}
                  aria-pressed={kind === item} onClick={() => changeKind(item)}>
                  <span className="qp-mode-icon" aria-hidden="true">{item === 'cam-balkon' ? '▤' : '▣'}</span>
                  <strong>{KIND_NAMES[item]}</strong>
                  <small>{item === 'cam-balkon' ? 'Katlanır / sürgülü balkon sistemleri' : 'Pencere / kapı / sürme sistemler'}</small>
                </button>)}
            </div>
            {kind && <div className="qp-select-service">
              <label htmlFor="quote-service">Hizmet türü
                <select id="quote-service" value={serviceId} onChange={(event) => setServiceId(event.target.value)}>
                  <option value="">Hizmet seçin</option>
                  {services.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
                </select>
              </label>
              <p className="qp-field-help">Yalnızca {KIND_NAMES[kind]} kategorileri listelenir.</p>
            </div>}
          </div>}
          {step === 2 && kind === 'cam-balkon' && <GlassFields draft={glass} setDraft={setGlass} />}
          {step === 2 && kind === 'pvc' && <PvcFields draft={pvc} setDraft={setPvc} />}
          {step === 3 && kind && service && <div className="qp-summary" data-testid="quote-summary">
            <div className="qp-summary-head">
              <span aria-hidden="true">✓</span><div><strong>Talep taslağı hazır</strong><small>Özet yalnızca bu ekranda görüntülenir.</small></div>
            </div>
            <dl className="qp-summary-list">
              <SummaryRow term="Sistem" value={KIND_NAMES[kind]} />
              <SummaryRow term="Hizmet" value={service.name} />
              {kind === 'cam-balkon' && <>
                <SummaryRow term="Ölçüler" value={glass.unknownMeasurements ? 'Ölçüler henüz bilinmiyor' : glass.widthCm + ' × ' + glass.heightCm + ' cm'} />
                <SummaryRow term="Cam türü" value={GLASS_TYPES[glass.glassType as Exclude<GlassPreviewDraft['glassType'], ''>]} />
              </>}
              {kind === 'pvc' && <>
                <SummaryRow term="Ölçüler" value={pvc.unknownMeasurements ? 'Ölçüler henüz bilinmiyor' : pvc.widthCm + ' × ' + pvc.heightCm + ' cm'} />
                <SummaryRow term="Profil" value={PVC_PROFILES[pvc.profile as Exclude<PvcPreviewDraft['profile'], ''>]} />
                <SummaryRow term="Açılım" value={PVC_OPENINGS[pvc.opening as Exclude<PvcPreviewDraft['opening'], ''>]} />
              </>}
            </dl>
            <div className="qp-no-price" role="note">
              <strong>Fiyat hesaplanmadı.</strong>
              <p>Bu bir teklif veya sipariş değildir. Toplam tutar, fiyat aralığı, WhatsApp mesajı ve bağlantı üretilmez.</p>
            </div>
          </div>}
          <div className="qp-controls">
            {step > 1 && <button type="button" className="qp-button qp-button-back" onClick={back}>← Geri</button>}
            {step < 3 && <button type="button" className="qp-button qp-button-next" onClick={goNext}
              disabled={step === 1 ? !service : !isReady}>
              {step === 1 ? 'Ölçü ve seçeneklere geç' : 'Özeti gör'} <span aria-hidden="true">→</span>
            </button>}
            {step === 3 && <button type="button" className="qp-button qp-button-next" onClick={reset}>Yeni taslak başlat ↺</button>}
          </div>
          {step < 3 && <p className="qp-guidance">
            {step === 1 ? 'Devam etmek için önce bir sistem ve hizmet türü seçin.' :
              'Yaklaşık ölçüler (veya bilmiyorum tercihi) ile ilgili ürün seçeneklerini tamamlayın.'}
          </p>}
          {notice && <p role="status">{notice}</p>}
        </section>
        <aside className="qp-side" aria-label="Demo hakkında bilgi">
          <div className="qp-side-card">
            <span className="qp-overline">TASARIM PRENSİBİ</span>
            <h2>İki sektör, iki ayrı akış.</h2>
            <p>Cam Balkonun cam sistemi, PVC’nin profil ve açılım seçeneklerinden ayrıdır. Bu demo herhangi bir hesaplama motorunu açmaz.</p>
            <div className="qp-side-split"><span className="qp-side-icon">▤</span><div><strong>Cam Balkon</strong><small>Cam türü + ölçü önizlemesi</small></div></div>
            <div className="qp-side-split"><span className="qp-side-icon">▣</span><div><strong>PVC</strong><small>Profil + açılım + ölçü önizlemesi</small></div></div>
          </div>
          <p className="qp-safety-note"><strong>Gizlilik:</strong> Bu önizleme formdaki örnek tercihleri sunucuya göndermez, kaydetmez ve WhatsApp açmaz.</p>
        </aside>
      </div>
      <footer className="qp-footer">Cam Balkon &amp; PVC · Sadece tasarım ve etkileşim demosu</footer>
    </main>
  </div>;
}
