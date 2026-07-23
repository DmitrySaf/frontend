import * as React from "react";

/* Design-sync stub for `next/link`. Renders a plain <a> so the design bundle carries no
   Next runtime (which reads process.env.__NEXT_* at module-init and throws in the browser).
   Button only uses Link for the href variant; in Claude Design an <a> is the correct target. */
const Link = React.forwardRef<HTMLAnchorElement, Record<string, unknown>>((props, ref) => {
  const { href, children, ...rest } = props as {
    href?: string | { pathname?: string };
    children?: React.ReactNode;
  };
  const resolved = typeof href === "string" ? href : (href?.pathname ?? "#");
  return (
    <a ref={ref} href={resolved} {...rest}>
      {children}
    </a>
  );
});
Link.displayName = "Link";

export default Link;
