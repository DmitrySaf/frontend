// SettingsScreen.jsx — Bean account settings (5 sections + sidebar)

const SETTINGS_SECTIONS = [
  { id: "profile", label: "Профиль", icon: "user" },
  { id: "security", label: "Конфиденциальность", icon: "shield" },
  { id: "verification", label: "Верификация", icon: "badge-check" },
  { id: "payment", label: "Вывод средств", icon: "credit-card" },
  { id: "billing", label: "Транзакции", icon: "receipt-text" },
];

function LogoutButton() {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px 10px 12px",
        borderRadius: 14, fontSize: 14, fontWeight: 600, color: "var(--danger)", cursor: "pointer",
        background: hover ? "var(--danger-soft)" : "transparent", transition: "background .12s" }}>
      <Icon name="log-out" size={20} /><span>Выйти из аккаунта</span>
    </div>
  );
}

function SettingsSidebar({ active, onTab }) {
  return (
    <div style={{ width: 230, flex: "none" }}>
      <div style={{ padding: 40, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12 }}>
        <div style={{ width: 64, height: 64, borderRadius: 12, background: "var(--secondary-600)", display: "grid",
          placeItems: "center", fontSize: 32 }}>🐼</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "var(--gray-900)" }}>Arkadiy</div>
          <div style={{ fontSize: 14, color: "var(--gray-500)" }}>@arkadiyparovozov</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {SETTINGS_SECTIONS.map((s) => (
          <Tab key={s.id} icon={s.icon} label={s.label} active={active === s.id} onClick={() => onTab(s.id)} />
        ))}
      </div>
      <div style={{ height: 1, background: "var(--gray-300)", borderRadius: 9999, margin: "8px 16px 8px 12px" }} />
      <LogoutButton />
    </div>
  );
}

// ---- Profile section ----
function SocialField({ glyph, color, prefix, placeholder, globe }) {
  const [v, setV] = React.useState("");
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff",
      boxShadow: "inset 0 0 0 1px var(--gray-200)", borderRadius: 14, padding: "8px 12px" }}>
      <div style={{ width: 32, height: 32, borderRadius: 10, border: "1px solid var(--gray-400)",
        boxShadow: "var(--shadow-sm)", display: "grid", placeItems: "center", flex: "none" }}>
        {globe ? <Icon name="globe" size={20} /> : <SocialGlyph name={glyph} size={20} color={color} />}
      </div>
      <span style={{ color: "var(--text-tertiary)", flex: "none" }}>{prefix}</span>
      <input value={v} onChange={(e) => setV(e.target.value)} placeholder={placeholder}
        style={{ border: 0, outline: 0, flex: 1, fontFamily: "var(--font-sans)", fontSize: 14,
          color: "var(--text-primary)", background: "transparent", minWidth: 0 }} />
    </div>
  );
}

function ProfileSection({ dirty, name, setName, bio, setBio }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingBottom: dirty ? 110 : 0 }}>
      <h1 className="bean-page-title" style={{ margin: 0 }}>Настройки аккаунта</h1>
      <Input label="Имя" placeholder="Введите имя" value={name} onChange={(e) => setName(e.target.value)} />
      <Input label="Имя пользователя" value="arkadiyparovozov" onChange={() => {}}
        prefix={<span style={{ color: "var(--text-primary)" }}>@</span>} />
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <label className="bean-label">О себе</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Расскажите о себе" rows={3}
          style={{ boxShadow: "inset 0 0 0 1px var(--gray-200)", border: 0, borderRadius: 16, padding: "12px 16px",
            fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--text-primary)", resize: "vertical", outline: "none" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 600, color: "var(--gray-900)" }}>Социальные сети</h2>
        <SocialField glyph="telegram" color="#229ED9" prefix="t.me/" placeholder="xtsumi" />
        <SocialField glyph="vk" color="#0077FF" prefix="vk.com/" placeholder="id" />
        <SocialField glyph="instagram" color="#E1306C" prefix="instagram.com/" placeholder="xtsumi" />
        <SocialField glyph="youtube" color="#FF0000" prefix="youtube.com/" placeholder="@xtumi" />
        <SocialField globe prefix="https://" placeholder="example.com" />
      </div>
    </div>
  );
}

function SaveBar({ visible, onReset }) {
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 0 28px", pointerEvents: "none" }}>
      <div style={{ background: "#fff", boxShadow: "inset 0 0 0 1px var(--border), var(--shadow-card)", borderRadius: 16,
        padding: "16px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
        pointerEvents: "auto", opacity: visible ? 1 : 0.55, transition: "opacity .2s" }}>
        <span style={{ fontSize: 15, color: "var(--text-secondary)" }}>У вас есть несохранённые изменения</span>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button variant="ghost" onClick={onReset}>Сбросить</Button>
          <Button>Сохранить</Button>
        </div>
      </div>
    </div>
  );
}

// ---- Security section ----
function ReadonlyField({ label, value }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 14, fontWeight: 500, color: "var(--gray-700)" }}>{label}</label>
      <div style={{ padding: "10px 16px", background: "var(--gray-100)", border: "1px solid var(--border)",
        borderRadius: 14, color: "var(--gray-700)", fontSize: 15 }}>{value}</div>
    </div>
  );
}

function ChangeRow({ label, placeholder }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 12, marginTop: 16 }}>
      <div style={{ flex: 1 }}><Input label={label} placeholder={placeholder} value="" onChange={() => {}} /></div>
      <Button size="l">Изменить</Button>
    </div>
  );
}

function SecuritySection() {
  const [a, setA] = React.useState(true); const [b, setB] = React.useState(false); const [c, setC] = React.useState(true);
  const rows = [
    ["Показывать подписки в профиле", a, setA],
    ["Показывать свои сообщества", b, setB],
    ["Разрешить личные сообщения", c, setC],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "var(--gray-900)" }}>Безопасность</h2>
        <p style={{ margin: 0, fontSize: 14, color: "var(--text-secondary)" }}>Данные для входа в систему.</p>
      </div>
      <div>
        <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 600, color: "var(--gray-900)" }}>Email</h3>
        <ReadonlyField label="Текущий email" value="arkadiy@gmail.com" />
        <ChangeRow label="Новый email" placeholder="example@email.com" />
        <p style={{ margin: "8px 0 0", fontSize: 12, color: "var(--gray-500)" }}>После изменения на новый email будет отправлено письмо с подтверждением</p>
      </div>
      <div>
        <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 600, color: "var(--gray-900)" }}>Телефон</h3>
        <ReadonlyField label="Текущий номер" value="Не указан" />
        <ChangeRow label="Новый номер телефона" placeholder="+7 (999) 123-45-67" />
        <p style={{ margin: "8px 0 0", fontSize: 12, color: "var(--gray-500)" }}>После изменения на новый номер будет отправлен код подтверждения</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 600, color: "var(--gray-900)" }}>Конфиденциальность</h3>
        {rows.map(([label, val, set], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "16px 0", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
            <span style={{ fontSize: 15, color: "var(--text-primary)" }}>{label}</span>
            <Toggle on={val} onChange={set} />
          </div>
        ))}
      </div>
    </div>
  );
}

function StubSection({ title, text }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h1 className="bean-page-title" style={{ margin: 0 }}>{title}</h1>
      <p style={{ margin: 0, fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.5, maxWidth: 520 }}>{text}</p>
    </div>
  );
}

function SettingsScreen() {
  const [tab, setTab] = React.useState("profile");
  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const dirty = name !== "" || bio !== "";
  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", flex: "none", paddingRight: 32 }}>
        <SettingsSidebar active={tab} onTab={setTab} />
      </div>
      <div style={{ flex: 1, position: "relative", overflowY: "auto", paddingTop: 40, paddingLeft: 32, paddingRight: 40, minWidth: 0 }}>
        <div style={{ maxWidth: 640 }}>
          {tab === "profile" && <ProfileSection dirty={dirty} name={name} setName={setName} bio={bio} setBio={setBio} />}
          {tab === "security" && <SecuritySection />}
          {tab === "verification" && <StubSection title="Верификация аккаунта"
            text="Здесь будет реализована верификация через паспорт или документы самозанятого / ИП / ООО." />}
          {tab === "payment" && <StubSection title="Способы оплаты"
            text="Здесь будут настройки способов вывода средств и банковских карт." />}
          {tab === "billing" && <StubSection title="История платежей"
            text="Здесь будет отображаться история всех платежей и транзакций." />}
        </div>
        {tab === "profile" && (
          <div style={{ position: "sticky", bottom: 0, maxWidth: 640 }}>
            <SaveBar visible={dirty} onReset={() => { setName(""); setBio(""); }} />
          </div>
        )}
      </div>
    </div>
  );
}
Object.assign(window, { SettingsScreen, SettingsSidebar });
