// wire-admin.jsx — Bean wireframe: admin sub-pages opened from the community photo menu
// Дашборд · Внешний вид · Настройки сообщества

function AdminShell({ title, sub, actions, children }) {
  return (
    <WAppFrame railActive="community">
      <WCommunitySidebar active={null} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* admin sub-page header with back to community */}
        <div style={{ borderBottom: `1px solid ${WC.line}`, padding: "12px 24px", display: "flex", alignItems: "center", gap: 14, flex: "none", background: "#fff" }}>
          <WBtn variant="ghost" size="s" icon="arrow-left" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: WC.ink }}>{title}</div>
            {sub && <div style={{ fontSize: 12, color: WC.sub }}>{sub}</div>}
          </div>
          <WNote>только для админа</WNote>
          {actions}
        </div>
        <div style={{ flex: 1, minHeight: 0, overflow: "hidden", background: "#fff" }}>{children}</div>
      </div>
    </WAppFrame>
  );
}

// ---- Дашборд ----
function StatCard({ label, value, trend, up }) {
  return (
    <WCard pad={18} style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
      <span style={{ fontSize: 13, color: WC.sub }}>{label}</span>
      <span style={{ fontSize: 26, fontWeight: 700, color: WC.ink, fontFamily: WC.mono }}>{value}</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: WC.sub }}>
        <WIcon name={up ? "trending-up" : "trending-down"} size={15} color={WC.sub} /> {trend}
      </span>
    </WCard>
  );
}

function BarChart() {
  const bars = [40, 55, 48, 70, 62, 85, 78, 95, 88, 100, 92, 110];
  const max = 120;
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 150, paddingTop: 8 }}>
      {bars.map((b, i) => (
        <div key={i} style={{ flex: 1, height: `${(b / max) * 100}%`, background: i === bars.length - 1 ? WC.primary : WC.fill, borderRadius: "5px 5px 0 0", border: `1px solid ${WC.line}` }} />
      ))}
    </div>
  );
}

function TierRow({ name, price, subs, revenue }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0", borderBottom: `1px solid ${WC.line}` }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: WC.lineStrong, flex: "none" }} />
      <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: WC.ink }}>{name}</span>
      <span style={{ width: 90, fontSize: 13, color: WC.sub, fontFamily: WC.mono }}>{price}</span>
      <span style={{ width: 90, fontSize: 13, color: WC.sub }}>{subs} чел.</span>
      <span style={{ width: 100, textAlign: "right", fontSize: 14, fontWeight: 600, color: WC.ink, fontFamily: WC.mono }}>{revenue}</span>
    </div>
  );
}

function ScreenAdminDashboard() {
  return (
    <AdminShell title="Дашборд" sub="ProFound University" actions={<WPill icon="calendar">За 30 дней</WPill>}>
      <div style={{ height: "100%", overflow: "hidden", padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", gap: 14 }}>
          <StatCard label="Доход за месяц" value="₽ 248K" trend="+12% к прошлому" up />
          <StatCard label="Участников" value="1 284" trend="+86 за месяц" up />
          <StatCard label="Активных подписок" value="412" trend="+5%" up />
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          <WCard pad={18} style={{ flex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: WC.ink }}>Доход</span>
              <WPill>Месяц</WPill>
            </div>
            <BarChart />
          </WCard>
          <WCard pad={18} style={{ flex: 1 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: WC.ink }}>Рост участников</span>
            <div style={{ marginTop: 16, position: "relative", height: 150 }}>
              <svg width="100%" height="100%" viewBox="0 0 200 120" preserveAspectRatio="none">
                <polyline points="0,110 30,95 60,98 90,70 120,60 150,38 200,20" fill="none" stroke={WC.lineStrong} strokeWidth="2" />
              </svg>
            </div>
          </WCard>
        </div>
        <WCard pad={18}>
          <span style={{ fontSize: 15, fontWeight: 700, color: WC.ink }}>Тарифы</span>
          <div style={{ marginTop: 10 }}>
            <div style={{ display: "flex", gap: 14, padding: "0 0 8px", fontSize: 11, color: WC.muted, textTransform: "uppercase", letterSpacing: ".04em" }}>
              <span style={{ width: 8 }} /><span style={{ flex: 1 }}>Тариф</span><span style={{ width: 90 }}>Цена</span><span style={{ width: 90 }}>Подписчики</span><span style={{ width: 100, textAlign: "right" }}>Доход</span>
            </div>
            <TierRow name="Месячный" price="₽ 990 / мес" subs={284} revenue="₽ 281K" />
            <TierRow name="6 месяцев" price="₽ 4 990" subs={92} revenue="₽ 459K" />
            <TierRow name="Годовой" price="₽ 8 990" subs={36} revenue="₽ 323K" />
          </div>
        </WCard>
      </div>
    </AdminShell>
  );
}

// ---- Внешний вид (Appearance) ----
function UploadField({ label, h, icon, hint }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <WLabel>{label}</WLabel>
      <div style={{ position: "relative" }}>
        <WImg h={h} radius={14} label={hint} icon={icon} />
        <div style={{ position: "absolute", right: 12, bottom: 12 }}><WBtn variant="secondary" size="s" icon="upload">Загрузить</WBtn></div>
      </div>
    </div>
  );
}

function ScreenAdminAppearance() {
  const swatches = ["#3a3a3a", "#8a8a8a", "#bcbcbc", "#d8d8d8"];
  return (
    <AdminShell title="Внешний вид" sub="Обложка, логотип и оформление проекта" actions={<WBtn size="s">Сохранить</WBtn>}>
      <div style={{ height: "100%", overflow: "hidden", padding: 24, display: "flex", gap: 24 }}>
        {/* editor column */}
        <div style={{ flex: 1, minWidth: 0, maxWidth: 560, display: "flex", flexDirection: "column", gap: 22 }}>
          <UploadField label="Обложка сообщества" h={150} icon="image" hint="1600×400" />
          <UploadField label="Логотип" h={110} icon="bean" hint="512×512" />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <WLabel>Акцентный цвет</WLabel>
            <div style={{ display: "flex", gap: 10 }}>
              {swatches.map((c, i) => (
                <div key={i} style={{ width: 38, height: 38, borderRadius: 10, background: c, boxShadow: i === 0 ? `0 0 0 2px #fff, 0 0 0 4px ${WC.lineStrong}` : `inset 0 0 0 1px ${WC.line}` }} />
              ))}
              <div style={{ width: 38, height: 38, borderRadius: 10, border: `1px dashed ${WC.lineStrong}`, display: "grid", placeItems: "center" }}><WIcon name="plus" size={16} color={WC.muted} /></div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <WLabel>Тема</WLabel>
            <div style={{ display: "flex", gap: 10 }}>
              {[["sun", "Светлая", true], ["moon", "Тёмная", false], ["monitor", "Системная", false]].map(([ic, lb, on]) => (
                <div key={lb} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 7, padding: "14px 0", borderRadius: 12, border: `1px solid ${on ? WC.lineStrong : WC.line}`, background: on ? WC.fill : "#fff" }}>
                  <WIcon name={ic} size={20} color={WC.sub} /><span style={{ fontSize: 12, fontWeight: 600, color: WC.sub }}>{lb}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* live preview of the public card */}
        <div style={{ width: 300, flex: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          <WLabel>Превью карточки</WLabel>
          <WCard pad={0} style={{ overflow: "hidden" }}>
            <WImg h={120} radius={0} label="обложка" />
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: -42 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, border: `2px solid #fff`, background: WC.fill, display: "grid", placeItems: "center" }}><WIcon name="bean" size={24} color={WC.sub} /></div>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: WC.ink }}>ProFound University</div>
              <WLines n={2} last="50%" />
              <WBtn full>Присоединиться</WBtn>
              <span style={{ fontSize: 12, color: WC.muted, textAlign: "center" }}>1 284 участника</span>
            </div>
          </WCard>
          <WNote>обновляется в реальном времени</WNote>
        </div>
      </div>
    </AdminShell>
  );
}

// ---- Настройки сообщества (Community settings) ----
function PricingTierCard({ name, price, period, badge }) {
  return (
    <WCard pad={14} style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <WIcon name="grip-vertical" size={18} color={WC.muted} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: WC.ink }}>{name} {badge && <WPill style={{ marginLeft: 6 }}>{badge}</WPill>}</div>
        <div style={{ fontSize: 13, color: WC.sub, fontFamily: WC.mono, marginTop: 2 }}>{price} {period}</div>
      </div>
      <WToggle on />
      <WIcon name="pencil" size={16} color={WC.muted} />
      <WIcon name="trash-2" size={16} color={WC.muted} />
    </WCard>
  );
}

function ScreenAdminSettings() {
  return (
    <AdminShell title="Настройки сообщества" sub="Название, доступ и тарифы" actions={<WBtn size="s">Сохранить</WBtn>}>
      <div style={{ height: "100%", overflow: "hidden", padding: "24px 40px", maxWidth: 680 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <WInput label="Название сообщества" value="ProFound University" />
          <WTextarea label="Описание" placeholder="Расскажите, о чём ваше сообщество" rows={3} />
          <WInput label="Публичный адрес" value="profound-university" prefix="bean.com/" mono helper="Уникальный адрес страницы сообщества" />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <WLabel>Видимость</WLabel>
            <div style={{ display: "flex", gap: 10 }}>
              {[["globe", "Публичное", "Видно всем, открыта витрина", true], ["lock", "Закрытое", "Только по приглашению", false]].map(([ic, t, d, on]) => (
                <div key={t} style={{ flex: 1, display: "flex", gap: 11, padding: 14, borderRadius: 14, border: `1px solid ${on ? WC.lineStrong : WC.line}`, background: on ? WC.fill : "#fff" }}>
                  <WIcon name={ic} size={18} color={WC.sub} />
                  <div><div style={{ fontSize: 14, fontWeight: 600, color: WC.ink }}>{t}</div><div style={{ fontSize: 12, color: WC.sub, marginTop: 2 }}>{d}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <WLabel style={{ fontSize: 14 }}>Тарифы подписки</WLabel>
              <WBtn variant="ghost" size="s" icon="plus">Добавить тариф</WBtn>
            </div>
            <PricingTierCard name="Месячный" price="₽ 990" period="/ мес" />
            <PricingTierCard name="6 месяцев" price="₽ 4 990" period="/ 6 мес" badge="−15%" />
            <PricingTierCard name="Годовой" price="₽ 8 990" period="/ год" badge="−24%" />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

Object.assign(window, { ScreenAdminDashboard, ScreenAdminAppearance, ScreenAdminSettings });
