import { useEffect } from "react";
import { Toaster, toast } from "frontend";

/* Toasts are imperative + transient: there's no visual component to place — you call toast.*
   and the <Toaster/> (mounted once at app root) renders the queue. We fire two on mount so the
   card shows real toasts. Bean pattern: success WITHOUT description, error WITH description
   (toast.error is aliased to HeroUI's .danger). */

export const Notifications = () => {
  useEffect(() => {
    toast.success("Изменения сохранены");
    toast.error("Не удалось загрузить", {
      description: "Проверьте соединение и попробуйте снова.",
    });
  }, []);

  return (
    <div style={{ position: "relative", minHeight: 380, width: "100%" }}>
      <Toaster />
    </div>
  );
};
