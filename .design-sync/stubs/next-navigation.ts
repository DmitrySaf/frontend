/* Design-sync stub for `next/navigation`. Tabs calls usePathname() at render; outside a Next
   app there is no router context. Return stable no-ops instead of pulling Next's client router
   (which reads process.env.__NEXT_* at module-init and throws in the browser bundle). An empty
   pathname means every Tab renders inactive — previews show the active state via `<Tab isActive>`. */
export const usePathname = () => "";
export const useRouter = () => ({
  push() {},
  replace() {},
  back() {},
  forward() {},
  refresh() {},
  prefetch() {},
});
export const useSearchParams = () => new URLSearchParams();
export const useParams = () => ({});
export const redirect = () => {};
export const notFound = () => {};
