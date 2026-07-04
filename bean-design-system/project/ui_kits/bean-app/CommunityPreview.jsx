// CommunityPreview.jsx — public community page (media + description + pricing + author)

const PREVIEW_COMMUNITY = {
  name: "Clipr Campaigns",
  description: `Добро пожаловать в Clipr — новый стандарт клиппинга.

Clipr — это ведущее сообщество для клипперов и авторов, которые хотят доминировать в коротком формате.

Внутри Clipr вы получите:
• Элитное обучение: всё о контенте, виральности и монетизации.
• Премиальные кампании: эксклюзивный доступ к топовым сообществам.
• Профессиональное комьюнити: команда клипперов, помогающих друг другу расти.`,
  media: [
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
  ],
  memberCount: 486,
  author: { displayName: "Prithvi (PB)", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  tiers: [
    { id: "monthly", price: 12.99, interval: "/ месяц" },
    { id: "6m", price: 69.99, interval: "/ 6 месяцев", discount: 10 },
    { id: "year", price: 119.0, interval: "/ год", discount: 24 },
  ],
};

function PublicHeader({ onBack }) {
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <BeanMark size={36} radius={12} />
        <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>ProFound</span>
      </div>
      <Button variant="secondary" size="m" onClick={onBack}>Войти</Button>
    </div>
  );
}

function MediaCarousel({ media }) {
  const [i, setI] = React.useState(0);
  return (
    <div>
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "4 / 3", background: "#000" }}>
        <img src={media[i]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <button onClick={() => setI((i - 1 + media.length) % media.length)} style={{ ...carBtn, left: 12 }}><Icon name="chevron-left" size={20} /></button>
        <button onClick={() => setI((i + 1) % media.length)} style={{ ...carBtn, right: 12 }}><Icon name="chevron-right" size={20} /></button>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        {media.map((m, k) => (
          <div key={k} onClick={() => setI(k)} style={{ width: 64, height: 48, borderRadius: 10, overflow: "hidden",
            cursor: "pointer", boxShadow: k === i ? "0 0 0 2px var(--primary-600)" : "0 0 0 1px var(--border)" }}>
            <img src={m} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
const carBtn = { position: "absolute", top: "50%", transform: "translateY(-50%)", width: 36, height: 36,
  borderRadius: "50%", border: 0, background: "rgba(255,255,255,.9)", display: "grid", placeItems: "center",
  cursor: "pointer", boxShadow: "var(--shadow-sm)" };

function PricingCard({ tiers, memberCount }) {
  const [sel, setSel] = React.useState(tiers[0].id);
  const fmtMembers = (n) => n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K` : "" + n;
  return (
    <div style={{ borderRadius: 16, border: "1px solid var(--border)", background: "#fff", padding: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {tiers.map((t) => {
          const on = sel === t.id;
          return (
            <label key={t.id} onClick={() => setSel(t.id)} style={{ display: "flex", alignItems: "center", gap: 12,
              borderRadius: 16, border: `2px solid ${on ? "var(--primary-500)" : "var(--border)"}`,
              background: on ? "var(--primary-50)" : "#fff", padding: 12, cursor: "pointer", transition: "all .12s" }}>
              <span style={{ width: 16, height: 16, borderRadius: "50%", flex: "none",
                border: `2px solid ${on ? "var(--primary-600)" : "var(--gray-300)"}`,
                boxShadow: on ? "inset 0 0 0 3px #fff, 0 0 0 1px var(--primary-600)" : "none",
                background: on ? "var(--primary-600)" : "#fff" }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "var(--gray-900)" }}>${t.price.toFixed(2)} {t.interval}</span>
                {t.discount && <span style={{ fontSize: 12, fontWeight: 500, color: "var(--tw-blue-700)",
                  background: "var(--tw-blue-100)", borderRadius: 9999, padding: "2px 8px" }}>-{t.discount}%</span>}
              </div>
            </label>
          );
        })}
      </div>
      <Button size="l" full>Присоединиться</Button>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 16,
        fontSize: 14, color: "var(--gray-500)" }}>
        <Icon name="users" size={16} /><span>{fmtMembers(memberCount)} участников</span>
      </div>
    </div>
  );
}

function AuthorCard({ author }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, borderRadius: 16, border: "1px solid var(--border)",
      background: "#fff", padding: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", flex: "none", background: "var(--gray-100)" }}>
        {author.avatarUrl && <img src={author.avatarUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
      </div>
      <span style={{ fontSize: 14, fontWeight: 500, color: "var(--gray-900)" }}>{author.displayName}</span>
    </div>
  );
}

function CommunityPreview({ onBack }) {
  const c = PREVIEW_COMMUNITY;
  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--tw-gray-50)", overflowY: "auto" }}>
      <PublicHeader onBack={onBack} />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 16px", display: "flex", gap: 32 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <MediaCarousel media={c.media} />
          <div style={{ marginTop: 32 }}>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "var(--gray-900)" }}>{c.name}</h1>
            <p style={{ margin: "16px 0 0", whiteSpace: "pre-line", color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.6 }}>{c.description}</p>
          </div>
        </div>
        <div style={{ width: 320, flex: "none" }}>
          <div style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <PricingCard tiers={c.tiers} memberCount={c.memberCount} />
            <AuthorCard author={c.author} />
          </div>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { CommunityPreview });
