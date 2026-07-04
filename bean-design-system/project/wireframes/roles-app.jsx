// roles-app.jsx — assembles the admin/member role-split exploration onto its own canvas

const RS_W = 1280, RS_H = 860;     // full app screens
const MODELS_W = 1400, MODELS_H = 800;
const MATRIX_W = 860, MATRIX_H = 720;

function RolesApp() {
  return (
    <DesignCanvas>
      <DCSection id="r-models" title="Развилка: как разделить роли" subtitle="Три модели + базовая матрица прав. Выбранная как основная — A (инлайн «Просмотр ↔ Редактирование»)">
        <DCArtboard id="r-models-3" label="Три модели" width={MODELS_W} height={MODELS_H}><ScreenRoleModels /></DCArtboard>
        <DCArtboard id="r-matrix" label="Матрица прав" width={MATRIX_W} height={MATRIX_H}><ScreenRoleMatrix /></DCArtboard>
      </DCSection>

      <DCSection id="r-courses" title="Курсы · модель A (инлайн-режим)" subtitle="Один экран. Участник смотрит → админ видит «Редактировать» → тот же экран становится конструктором">
        <DCArtboard id="rc-member" label="Участник — плеер" width={RS_W} height={RS_H}><ScreenCoursesMember /></DCArtboard>
        <DCArtboard id="rc-adminview" label="Админ — просмотр (+ кнопка Ред.)" width={RS_W} height={RS_H}><ScreenCoursesAdminView /></DCArtboard>
        <DCArtboard id="rc-edit" label="Админ — конструктор (режим ред.)" width={RS_W} height={RS_H}><ScreenCoursesEdit /></DCArtboard>
        <DCArtboard id="rc-add" label="Состояние — добавить урок" width={RS_W} height={RS_H}><AddLessonModal /></DCArtboard>
        <DCArtboard id="rc-empty" label="Состояние — пустой курс" width={RS_W} height={RS_H}><ScreenCoursesEmpty /></DCArtboard>
      </DCSection>

      <DCSection id="r-courses-alt" title="Курсы · альтернативные модели" subtitle="Тот же конструктор, но в логике B (контролы всегда видны) и C (отдельная «Студия»)">
        <DCArtboard id="rc-b" label="Модель B — always-on" width={RS_W} height={RS_H}><ScreenCoursesModelB /></DCArtboard>
        <DCArtboard id="rc-c" label="Модель C — Студия" width={RS_W} height={RS_H}><ScreenCoursesModelC /></DCArtboard>
      </DCSection>

      <DCSection id="r-posts" title="Посты · модель A (инлайн-режим)" subtitle="Та же лента. Участник читает и реагирует → у админа модерация, закрепление, публикация">
        <DCArtboard id="rp-member" label="Участник — лента" width={RS_W} height={RS_H}><ScreenPostsMember /></DCArtboard>
        <DCArtboard id="rp-admin" label="Админ — лента + модерация" width={RS_W} height={RS_H}><ScreenPostsAdmin /></DCArtboard>
        <DCArtboard id="rp-menu-member" label="Меню поста — участник" width={RS_W} height={RS_H}><ScreenPostMenuMember /></DCArtboard>
        <DCArtboard id="rp-menu-admin" label="Меню поста — админ" width={RS_W} height={RS_H}><ScreenPostMenuAdmin /></DCArtboard>
        <DCArtboard id="rp-compose" label="Админ — создание поста" width={RS_W} height={RS_H}><ScreenPostsCompose /></DCArtboard>
        <DCArtboard id="rp-queue" label="Состояние — очередь модерации" width={RS_W} height={RS_H}><ScreenPostsQueue /></DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

window.__renderRoles = () => {
  if (!window.__rolesRoot) window.__rolesRoot = ReactDOM.createRoot(document.getElementById("root"));
  window.__rolesRoot.render(<RolesApp />);
};
window.__renderRoles();
