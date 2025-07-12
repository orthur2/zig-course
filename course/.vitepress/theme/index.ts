// .vitepress/theme/index.ts
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import giscus from "./giscus.js";
import version from "./version.js";
import "./style/print.css";

import { h } from "vue";

export default {
  extends: DefaultTheme,
  enhanceApp(ctx: any) {
    DefaultTheme.enhanceApp(ctx);
    if (typeof window != "undefined") {
      // 保证在打印时所有的 details 都是展开的
      window.addEventListener("beforeprint", function () {
        document.querySelectorAll("details").forEach(function (details) {
          details.setAttribute("open", "");
        });
      });

      // 打印后重置 details 的展开状态
      window.addEventListener("afterprint", function () {
        document.querySelectorAll("details").forEach(function (details) {
          details.removeAttribute("open");
        });
      });
    }
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "doc-after": () => h(giscus),
      "doc-before": () => h(version),
    });
  },
} satisfies Theme;
