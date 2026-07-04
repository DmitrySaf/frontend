// wire-create-preview.jsx — Bean wireframe: create-community modal + public preview page

// ---- Create community modal (over dimmed app shell) ----
function ScreenCreateModal() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", fontFamily: WC.font }}>
      {/* dimmed shell behind */}
      <div style={{ position: "absolute", inset: 0, filter: "saturate(0)", opacity: 0.5, pointerEvents: "none" }}>
        <WAppFrame railActive="community">
          <div style={{ flex: 1, background: WC.recess }} />
        </WAppFrame>
      </div>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.32)" }} />
      {/* modal */}
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", padding: 24 }}>
        <div style={{ width: 440, maxWidth: "100%", background: "#fff", border: `1px solid ${WC.line}`, borderRadius: 24, padding: 28, boxShadow: "0 30px 70px rgba(0,0,0,.22)", boxSizing: "border-box" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: WC.ink }}>Создать новое сообщество</h2>
            <WIcon name="x" size={20} color={WC.muted} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <UploadField label="Логотип" h={92} icon="bean" hint="необязательно" />
            <WInput label="Название сообщества" placeholder="Введите название сообщества" />
            <WInput label="URL" value="profound-university" prefix="bean.com/" mono helper="Уникальное имя — подставляется автоматически" />
            <WBtn size="l" full>Создать</WBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Public community preview ----
function PublicHeader() {
  return (
    <div style={{ background: "#fff", borderBottom: `1px solid ${WC.line}`, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", flex: "none" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, border: `1px solid ${WC.line}`, background: WC.recess, display: "grid", placeItems: "center" }}>
          <WIcon name="bean" size={18} color={WC.ink} stroke={2.2} />
        </div>
        <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", color: WC.ink }}>Bean</span>
      </div>
      <WBtn variant="secondary">Войти</WBtn>
    </div>
  );
}

function PreviewPricingCard() {
  return (
    <WCard pad={18} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[["₽ 990 / мес", null, false], ["₽ 4 990 / 6 мес", "−15%", true], ["₽ 8 990 / год", "−24%", false]].map(([label, disc, on], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, borderRadius: 14, border: `${on ? 2 : 1}px solid ${on ? WC.primary : WC.line}`, background: on ? WC.fill : "#fff", padding: 12 }}>
            <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${on ? WC.primary : WC.line}`, background: on ? WC.primary : "#fff", flex: "none", boxShadow: on ? "inset 0 0 0 3px #fff" : "none" }} />
            <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: WC.ink }}>{label}</span>
            {disc && <WPill>{disc}</WPill>}
          </div>
        ))}
      </div>
      <WBtn size="l" full>Присоединиться</WBtn>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 13, color: WC.sub }}>
        <WIcon name="users" size={15} color={WC.sub} /> 1 284 участника
      </div>
    </WCard>
  );
}

function ScreenCommunityPreview() {
  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden", background: WC.recess, display: "flex", flexDirection: "column", fontFamily: WC.font }}>
      <PublicHeader />
      <div style={{ flex: 1, overflow: "hidden", padding: "28px 16px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: 28 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* media carousel */}
            <WImg h={380} radius={16} label="медиа сообщества" icon="image" iconSize={36} />
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              {[0, 1, 2, 3].map((k) => (
                <div key={k} style={{ width: 70, height: 50, borderRadius: 10, background: WC.fillSoft, border: `${k === 0 ? 2 : 1}px solid ${k === 0 ? WC.primary : WC.line}` }} />
              ))}
            </div>
            <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 12 }}>
              <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: WC.ink }}>ProFound University</h1>
              <WPill icon="badge-check">Проверено</WPill>
            </div>
            <p style={{ margin: "14px 0 0", fontSize: 15, lineHeight: 1.6, color: WC.sub }}>
              Закрытое сообщество для тех, кто строит личный бренд и зарабатывает на контенте. Курсы, разборы и поддержка комьюнити.
            </p>
            <div style={{ marginTop: 18 }}><WLines n={4} last="45%" /></div>
            {/* what's inside */}
            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: WC.ink }}>Что внутри</h3>
              {[["book-open", "Курсы и разборы"], ["newspaper", "Регулярные посты и эфиры"], ["users", "Закрытое комьюнити"]].map(([ic, t]) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid ${WC.line}`, background: "#fff", display: "grid", placeItems: "center", flex: "none" }}><WIcon name={ic} size={18} color={WC.sub} /></div>
                  <span style={{ fontSize: 14, color: WC.ink }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          {/* sticky right column */}
          <div style={{ width: 320, flex: "none", display: "flex", flexDirection: "column", gap: 14 }}>
            <PreviewPricingCard />
            <WCard pad={14} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <WAvatar size={40} icon="user" />
              <div><div style={{ fontSize: 14, fontWeight: 600, color: WC.ink }}>Аркадий П.</div><div style={{ fontSize: 12, color: WC.sub }}>Автор сообщества</div></div>
            </WCard>
          </div>
        </div>
      </div>
    </div>
  );
}

// companion: join while logged-out → auth dialog
function StatePreviewAuthDialog() {
  return (
    <div style={{ width: "100%", height: "100%", background: WC.recess, position: "relative", overflow: "hidden", fontFamily: WC.font }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.4 }}><WImg h="100%" radius={0} label="" /></div>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.3)" }} />
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", padding: 18 }}>
        <div style={{ width: 320, background: "#fff", border: `1px solid ${WC.line}`, borderRadius: 20, padding: 24, boxShadow: "0 24px 60px rgba(0,0,0,.2)", boxSizing: "border-box", textAlign: "center" }}>
          <WNote>вход для гостя</WNote>
          <div style={{ width: 44, height: 44, borderRadius: 13, border: `1px solid ${WC.line}`, background: WC.recess, display: "grid", placeItems: "center", margin: "14px auto 12px" }}><WIcon name="bean" size={24} color={WC.ink} /></div>
          <div style={{ fontSize: 15, fontWeight: 700, color: WC.ink, marginBottom: 6 }}>Войдите, чтобы вступить</div>
          <p style={{ margin: "0 0 16px", fontSize: 13, color: WC.sub }}>Создайте аккаунт или войдите для доступа к сообществу.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <WInput placeholder="example@gmail.com" />
            <WBtn size="l" full>Продолжить</WBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatePreviewLoading() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", padding: 22, boxSizing: "border-box", fontFamily: WC.font, display: "flex", flexDirection: "column", gap: 16 }}>
      <WNote>загрузка — скелетон</WNote>
      <div style={{ width: 110, height: 110, borderRadius: 14, background: WC.skeleton }} />
      <WBar w="60%" h={20} />
      <WLines n={4} last="40%" />
      <WBar w="100%" h={44} round={12} mt={6} />
    </div>
  );
}

Object.assign(window, { ScreenCreateModal, ScreenCommunityPreview, StatePreviewAuthDialog, StatePreviewLoading });
