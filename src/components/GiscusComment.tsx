"use client";

import { useEffect, useRef } from "react";

export default function GiscusComment() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scriptElem = document.createElement("script");
    scriptElem.src = "https://giscus.app/client.js";
    scriptElem.async = true;
    scriptElem.crossOrigin = "anonymous";

    scriptElem.setAttribute("data-repo", "wish-n/dev.wshin.me");
    scriptElem.setAttribute("data-repo-id", "R_kgDOMuQ0Fg");
    scriptElem.setAttribute("data-category", "giscus comments");
    scriptElem.setAttribute("data-category-id", "DIC_kwDOMuQ0Fs4Ciib2");
    scriptElem.setAttribute("data-mapping", "pathname");
    scriptElem.setAttribute("data-strict", "1");
    scriptElem.setAttribute("data-reactions-enabled", "1");
    scriptElem.setAttribute("data-emit-metadata", "0");
    scriptElem.setAttribute("data-input-position", "top");
    scriptElem.setAttribute("data-theme", "preferred_color_scheme");
    scriptElem.setAttribute("data-lang", "ko");

    ref.current?.appendChild(scriptElem);
  }, []);

  return <section ref={ref} className="pt-24" />;
}
