// wire-settings.jsx — Bean wireframe: account settings (5 tabs) + states

function SettingsScreen({ active, children, saveBar }) {
  return (
    <WAppFrame railActive="settings">
      <WSettingsSidebar active={active} />
      <WSettingsContent saveBar={saveBar}>{children}</WSettingsContent>
    </WAppFrame>
  );
}

function SocialRow({ icon, prefix, placeholder }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: `1px solid ${WC.line}`, borderRadius: 14, padding: "8px 12px" }}>
      <div style={{ width: 32, height: 32, borderRadius: 10, border: `1px solid ${WC.line}`, display: "grid", placeItems: "center", flex: "none" }}>
        <WIcon name={icon} size={18} color={WC.sub} />
      </div>
      <span style={{ color: WC.muted, fontSize: 14, flex: "none" }}>{prefix}</span>
      <span style={{ fontSize: 14, color: WC.muted }}>{placeholder}</span>
    </div>
  );
}

// 1 — Профиль
function ScreenSettingsProfile() {
  const saveBar = (
    <div style={{ position: "absolute", left: 36, right: 40, bottom: 24, maxWidth: 660 }}>
      <div style={{ background: "#fff", border: `1px solid ${WC.line}`, borderRadius: 16, boxShadow: "0 8px 28px rgba(0,0,0,.10)", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <span style={{ fontSize: 14, color: WC.sub }}>У вас есть несохранённые изменения</span>
        <div style={{ display: "flex", gap: 10 }}><WBtn variant="ghost">Сбросить</WBtn><WBtn>Сохранить</WBtn></div>
      </div>
    </div>
  );
  return (
    <SettingsScreen active="profile" saveBar={saveBar}>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, paddingBottom: 90 }}>
        <WHeading title="Настройки аккаунта" />
        <WInput label="Имя" value="Аркадий" />
        <WInput label="Имя пользователя" value="arkadiyparovozov" prefix="@" mono />
        <WTextarea label="О себе" placeholder="Расскажите о себе" rows={3} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <WHeading title="Социальные сети" size={20} />
          <SocialRow icon="send" prefix="t.me/" placeholder="username" />
          <SocialRow icon="hash" prefix="vk.com/" placeholder="id" />
          <SocialRow icon="instagram" prefix="instagram.com/" placeholder="username" />
          <SocialRow icon="youtube" prefix="youtube.com/" placeholder="@channel" />
          <SocialRow icon="globe" prefix="https://" placeholder="example.com" />
        </div>
      </div>
    </SettingsScreen>
  );
}

// 2 — Конфиденциальность (security + privacy)
function RoField({ label, value }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <WLabel>{label}</WLabel>
      <div style={{ padding: "11px 14px", background: WC.recess, border: `1px solid ${WC.line}`, borderRadius: 14, color: WC.sub, fontSize: 14 }}>{value}</div>
    </div>
  );
}
function EditRow({ label, value, placeholder }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 12, marginTop: 14 }}>
      <div style={{ flex: 1 }}><WInput label={label} value={value} placeholder={placeholder} /></div>
      <WBtn size="l" variant="secondary">Изменить</WBtn>
    </div>
  );
}
function ScreenSettingsSecurity() {
  const toggles = [["Показывать подписки в профиле", true], ["Показывать свои сообщества", false], ["Разрешить личные сообщения", true]];
  return (
    <SettingsScreen active="security">
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <WHeading title="Конфиденциальность" sub="Данные для входа в систему." />
        <div>
          <WHeading title="Почта" size={17} />
          <EditRow label="Почта" value="arkadiy@gmail.com" placeholder="example@gmail.com" />
        </div>
        <div>
          <WHeading title="Телефон" size={17} />
          <EditRow label="Телефон" placeholder="+7 (999) 123-45-67" />
        </div>
        <div>
          <WHeading title="Приватность" size={17} />
          <div style={{ marginTop: 6 }}>
            {toggles.map(([label, on], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 0", borderBottom: `1px solid ${WC.line}` }}>
                <span style={{ fontSize: 14, color: WC.ink }}>{label}</span><WToggle on={on} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SettingsScreen>
  );
}

// 3 — Верификация — единый баннер с несколькими состояниями
// none → "Пройти верификацию"; pending → жёлтый "в процессе"; passed → "пройдена"
const VERIFY_STATES = {
  none: {
    icon: "badge-check",
    title: "Аккаунт не верифицирован",
    desc: "Подтвердите личность, чтобы выводить средства и получить значок рядом с именем.",
    action: "Пройти верификацию",
    tint: { bg: WC.recess, border: WC.line, ink: WC.ink, accent: WC.sub },
  },
  pending: {
    icon: "clock",
    title: "Верификация в процессе",
    desc: "Документы на проверке. Обычно занимает до 2 рабочих дней — мы пришлём уведомление.",
    action: null,
    tint: { bg: "#fbf3da", border: "#e7d29a", ink: "#7a5e16", accent: "#9a7b2a" },
  },
  passed: {
    icon: "badge-check",
    title: "Верификация пройдена",
    desc: "Личность подтверждена. Значок отображается в профиле, вывод средств доступен.",
    action: null,
    tint: { bg: "#eef3ec", border: "#bcd0b6", ink: "#3f5a3a", accent: "#5a7a52" },
  },
};
function VerifyBanner({ state = "none" }) {
  const s = VERIFY_STATES[state];
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16, background: s.tint.bg, border: `1px solid ${s.tint.border}`, borderRadius: 18, padding: 22 }}>
      <div style={{ width: 46, height: 46, borderRadius: 13, background: "#fff", border: `1px solid ${s.tint.border}`, display: "grid", placeItems: "center", flex: "none" }}>
        <WIcon name={s.icon} size={24} color={s.tint.accent} />
      </div>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: s.tint.ink, fontFamily: WC.font, letterSpacing: "-0.01em" }}>{s.title}</div>
        <div style={{ fontSize: 14, color: s.tint.accent, fontFamily: WC.font, lineHeight: 1.45 }}>{s.desc}</div>
        {s.action && <div style={{ marginTop: 8 }}><WBtn>{s.action}</WBtn></div>}
      </div>
    </div>
  );
}
function ScreenSettingsVerification({ state = "none" }) {
  return (
    <SettingsScreen active="verification">
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <WHeading title="Верификация аккаунта" sub="Подтвердите личность, чтобы выводить средства." />
        <VerifyBanner state={state} />
      </div>
    </SettingsScreen>
  );
}

// 4 — Вывод средств — список карт с выбором + добавление в модалке
function PayoutCard({ name, num, selected }) {
  return (
    <WCard pad={16} style={{ display: "flex", alignItems: "center", gap: 14, borderColor: selected ? WC.lineStrong : WC.line, boxShadow: selected ? `inset 0 0 0 1px ${WC.lineStrong}` : "none" }}>
      <div style={{ width: 20, height: 20, borderRadius: "50%", border: `1px solid ${selected ? WC.primary : WC.lineStrong}`, display: "grid", placeItems: "center", flex: "none" }}>
        {selected && <div style={{ width: 10, height: 10, borderRadius: "50%", background: WC.primary }} />}
      </div>
      <div style={{ width: 44, height: 30, borderRadius: 7, border: `1px solid ${WC.line}`, background: WC.recess, display: "grid", placeItems: "center", flex: "none" }}>
        <WIcon name="credit-card" size={18} color={WC.sub} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: WC.ink, fontFamily: WC.mono }}>{num}</div>
        <div style={{ fontSize: 12, color: WC.sub }}>{name}</div>
      </div>
      {selected
        ? <WPill icon="check" style={{ background: WC.fill, color: WC.ink, borderColor: WC.lineStrong }}>Выбрана для вывода</WPill>
        : <WIcon name="more-horizontal" size={18} color={WC.muted} />}
    </WCard>
  );
}
function ScreenSettingsPayment() {
  return (
    <SettingsScreen active="payment">
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <WHeading title="Вывод средств" sub="Выберите карту для получения выплат." />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <WLabel style={{ fontSize: 14 }}>Добавленные карты</WLabel>
          <WBtn variant="secondary" size="s" icon="plus">Добавить карту</WBtn>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <PayoutCard num="•••• 4921" name="Паровозов Аркадий Петрович" selected />
          <PayoutCard num="•••• 1830" name="Паровозов Аркадий Петрович" />
        </div>
      </div>
    </SettingsScreen>
  );
}
// Модалка добавления карты — ФИО раздельными полями + номер карты
function AddCardModal() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(20,20,20,.32)", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 460, background: "#fff", border: `1px solid ${WC.line}`, borderRadius: 18, boxShadow: "0 18px 50px rgba(0,0,0,.22)", padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <WHeading title="Добавить карту" size={20} />
          <WIcon name="x" size={20} color={WC.muted} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <WInput label="Фамилия" placeholder="Паровозов" />
          <WInput label="Имя" placeholder="Аркадий" />
          <WInput label="Отчество" placeholder="Петрович" />
          <WInput label="Номер карты" placeholder="0000 0000 0000 0000" mono />
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <WBtn variant="ghost">Отмена</WBtn>
          <WBtn icon="plus">Добавить</WBtn>
        </div>
      </div>
    </div>
  );
}
function StatePaymentAddCard() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <ScreenSettingsPayment />
      <AddCardModal />
    </div>
  );
}

// 5 — Транзакции
function TxRow({ title, sub, amount, neg, status }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: `1px solid ${WC.line}` }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid ${WC.line}`, background: WC.recess, display: "grid", placeItems: "center", flex: "none" }}>
        <WIcon name={neg ? "arrow-up-right" : "arrow-down-left"} size={16} color={WC.sub} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: WC.ink }}>{title}</div>
        <div style={{ fontSize: 12, color: WC.sub }}>{sub}</div>
      </div>
      {status && <WPill>{status}</WPill>}
      <div style={{ fontSize: 14, fontWeight: 600, color: WC.ink, fontFamily: WC.mono, whiteSpace: "nowrap" }}>{neg ? "−" : "+"} ₽ {amount}</div>
    </div>
  );
}
function ScreenSettingsBilling() {
  return (
    <SettingsScreen active="billing">
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <WHeading title="Транзакции" sub="История платежей и выплат." />
        <div style={{ display: "flex", gap: 8 }}>
          {["Все", "Поступления", "Выводы"].map((t, i) => <WPill key={t} style={i === 0 ? { background: WC.fill, color: WC.ink, borderColor: WC.lineStrong } : {}}>{t}</WPill>)}
        </div>
        <div>
          <TxRow title="Подписка — Иван П." sub="Сегодня, 14:32" amount="1 290" status="Завершено" />
          <TxRow title="Вывод на карту •••• 4921" sub="Вчера, 09:10" amount="20 000" neg status="В обработке" />
          <TxRow title="Подписка — Мария К." sub="28 мая, 18:45" amount="2 490" status="Завершено" />
          <TxRow title="Подписка — Олег Д." sub="27 мая, 11:02" amount="990" status="Завершено" />
          <TxRow title="Вывод на карту •••• 4921" sub="20 мая, 16:20" amount="35 000" neg status="Завершено" />
        </div>
      </div>
    </SettingsScreen>
  );
}

// ---- companion states ----
function StateBillingEmpty() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", fontFamily: WC.font, padding: 24, boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 16 }}>
      <WNote>пусто — нет транзакций</WNote>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, border: `1px solid ${WC.line}`, background: WC.recess, display: "grid", placeItems: "center" }}>
          <WIcon name="receipt-text" size={26} color={WC.muted} />
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: WC.ink }}>Пока нет транзакций</div>
        <div style={{ fontSize: 13, color: WC.sub, maxWidth: 220 }}>Здесь появятся платежи и выплаты после первой продажи.</div>
      </div>
    </div>
  );
}
function StatePaymentEmpty() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", fontFamily: WC.font, padding: 24, boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 16 }}>
      <WNote>пусто — нет способов вывода</WNote>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, border: `1px solid ${WC.line}`, background: WC.recess, display: "grid", placeItems: "center" }}>
          <WIcon name="credit-card" size={26} color={WC.muted} />
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: WC.ink }}>Нет привязанных карт</div>
        <div style={{ fontSize: 13, color: WC.sub, maxWidth: 220 }}>Добавьте карту или реквизиты, чтобы выводить заработок.</div>
        <WBtn icon="plus">Добавить способ</WBtn>
      </div>
    </div>
  );
}
function StateVerificationPending() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", fontFamily: WC.font, padding: 24, boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 14 }}>
      <WNote>баннер — в процессе</WNote>
      <VerifyBanner state="pending" />
    </div>
  );
}
function StateVerificationPassed() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", fontFamily: WC.font, padding: 24, boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 14 }}>
      <WNote>баннер — пройдена</WNote>
      <VerifyBanner state="passed" />
    </div>
  );
}

Object.assign(window, { ScreenSettingsProfile, ScreenSettingsSecurity, ScreenSettingsVerification, ScreenSettingsPayment, ScreenSettingsBilling, StateBillingEmpty, StatePaymentEmpty, StatePaymentAddCard, StateVerificationPending, StateVerificationPassed });
