// wire-app.jsx — assembles all Bean wireframes onto the design canvas

const SHELL_W = 1280, SHELL_H = 860;
const AUTH_W = 1040, AUTH_H = 700;
const PREVIEW_W = 1080, PREVIEW_H = 940;
const ST_W = 360, ST_H = 520;
const ST_SH = 380;

function WireApp() {
  return (
    <DesignCanvas>
      <DCSection id="auth" title="Вход и регистрация" subtitle="Авторизация по почте + OAuth (VK / Яндекс)">
        <DCArtboard id="auth-login" label="Вход — почта" width={AUTH_W} height={AUTH_H}><ScreenAuthLogin /></DCArtboard>
        <DCArtboard id="auth-code" label="Код подтверждения" width={AUTH_W} height={AUTH_H}><ScreenAuthCode /></DCArtboard>
        <DCArtboard id="auth-error" label="Состояние · ошибка" width={ST_W} height={ST_SH}><StateAuthError /></DCArtboard>
        <DCArtboard id="auth-loading" label="Состояние · загрузка" width={ST_W} height={ST_SH}><StateAuthLoading /></DCArtboard>
      </DCSection>

      <DCSection id="settings" title="Настройки аккаунта" subtitle="5 разделов · боковое меню + форма">
        <DCArtboard id="set-profile" label="Профиль" width={SHELL_W} height={SHELL_H}><ScreenSettingsProfile /></DCArtboard>
        <DCArtboard id="set-security" label="Конфиденциальность" width={SHELL_W} height={SHELL_H}><ScreenSettingsSecurity /></DCArtboard>
        <DCArtboard id="set-verify" label="Верификация · не пройдена" width={SHELL_W} height={SHELL_H}><ScreenSettingsVerification state="none" /></DCArtboard>
        <DCArtboard id="set-verify-pending" label="Верификация · в процессе" width={ST_W} height={ST_H}><StateVerificationPending /></DCArtboard>
        <DCArtboard id="set-verify-passed" label="Верификация · пройдена" width={ST_W} height={ST_H}><StateVerificationPassed /></DCArtboard>
        <DCArtboard id="set-payment" label="Вывод средств" width={SHELL_W} height={SHELL_H}><ScreenSettingsPayment /></DCArtboard>
        <DCArtboard id="set-payment-add" label="Вывод · добавление карты" width={SHELL_W} height={SHELL_H}><StatePaymentAddCard /></DCArtboard>
        <DCArtboard id="set-payment-empty" label="Вывод · пусто" width={ST_W} height={ST_H}><StatePaymentEmpty /></DCArtboard>
        <DCArtboard id="set-billing" label="Транзакции" width={SHELL_W} height={SHELL_H}><ScreenSettingsBilling /></DCArtboard>
        <DCArtboard id="set-billing-empty" label="Транзакции · пусто" width={ST_W} height={ST_H}><StateBillingEmpty /></DCArtboard>
      </DCSection>

      <DCSection id="community" title="Сообщество" subtitle="Категории + субчаты (чат / посты / курсы) · меню по фото сообщества">
        <DCArtboard id="com-chat" label="Чат" width={SHELL_W} height={SHELL_H}><ScreenCommunityChat /></DCArtboard>
        <DCArtboard id="com-add-channel" label="Добавить таб" width={SHELL_W} height={SHELL_H}><ScreenCommunityAddChannel /></DCArtboard>
        <DCArtboard id="com-posts" label="Посты" width={SHELL_W} height={SHELL_H}><ScreenCommunityPosts /></DCArtboard>
        <DCArtboard id="com-courses" label="Курсы — плеер" width={SHELL_W} height={SHELL_H}><ScreenCommunityCourses /></DCArtboard>
        <DCArtboard id="com-menu-admin" label="Меню по фото · админ" width={SHELL_W} height={SHELL_H}><ScreenCommunityMenu admin /></DCArtboard>
        <DCArtboard id="com-menu-member" label="Меню по фото · участник" width={SHELL_W} height={SHELL_H}><ScreenCommunityMenu /></DCArtboard>
      </DCSection>

      <DCSection id="admin" title="Админ-разделы" subtitle="Открываются из меню по фото сообщества — только для админа">
        <DCArtboard id="adm-dashboard" label="Дашборд" width={SHELL_W} height={SHELL_H}><ScreenAdminDashboard /></DCArtboard>
        <DCArtboard id="adm-appearance" label="Внешний вид" width={SHELL_W} height={SHELL_H}><ScreenAdminAppearance /></DCArtboard>
        <DCArtboard id="adm-settings" label="Настройки сообщества" width={SHELL_W} height={SHELL_H}><ScreenAdminSettings /></DCArtboard>
      </DCSection>

      <DCSection id="create-preview" title="Создание и витрина" subtitle="Модалка создания · публичная страница сообщества">
        <DCArtboard id="create-modal" label="Создать сообщество" width={SHELL_W} height={SHELL_H}><ScreenCreateModal /></DCArtboard>
        <DCArtboard id="preview" label="Витрина — публичная страница" width={PREVIEW_W} height={PREVIEW_H}><ScreenCommunityPreview /></DCArtboard>
        <DCArtboard id="preview-auth" label="Витрина · вход гостя" width={ST_W} height={ST_H}><StatePreviewAuthDialog /></DCArtboard>
        <DCArtboard id="preview-loading" label="Витрина · загрузка" width={ST_W} height={ST_H}><StatePreviewLoading /></DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

// Exposed so the Tweaks controller can re-render the canvas after it mutates
// the WC / DC token banks. Same root → DesignCanvas state (order, focus,
// sidecar) is preserved across re-renders.
window.__renderWire = () => {
  if (!window.__wireRoot) window.__wireRoot = ReactDOM.createRoot(document.getElementById("root"));
  window.__wireRoot.render(<WireApp />);
};
window.__renderWire();
