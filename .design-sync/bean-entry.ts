// Curated entry for design-sync (NOT app code — bundled by the converter into window.BeanUI).
// Scoped to the 16 user-facing components. The app's own barrel exports more, but app-specific
// pieces (Logo, OfflineBanner, HydrationBoundary, Form, ContentErrorState) are left out.
export { Button } from "@/shared/components/Button";
export { Input } from "@/shared/components/Input";
export { Textarea } from "@/shared/components/Textarea";
export { Switch } from "@/shared/components/Switch";
export { SegmentedControl } from "@/shared/components/SegmentedControl";
export { Avatar } from "@/shared/components/Avatar";
export { Dropdown } from "@/shared/components/Dropdown";
export { Tooltip } from "@/shared/components/Tooltip";
export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/Dialog";
export { Skeleton } from "@/shared/components/Skeleton";
export { Separator } from "@/shared/components/Separator";
export { ThemeToggle } from "@/shared/components/ThemeToggle";
export { Select } from "@/shared/components/Select";
export { Tabs, Tab } from "@/shared/components/Tabs";
export { Toaster, toast } from "@/shared/components/Toast";
export { DeleteDialog } from "@/shared/components/DeleteDialog";

// Re-exported so authored Input/Textarea previews wrap fields in the SAME react-hook-form
// instance the components use (a separate RHF copy = a different context object = fields
// render blank). Not in componentSrcMap, so these never become component cards.
export { FormProvider, useForm } from "react-hook-form";
