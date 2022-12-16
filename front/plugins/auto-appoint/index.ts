// import { set } from "loadsh";
import { Plugin } from "vite";
import { generateRoutes } from "./gen";

export default function autoAppoint(): Plugin {
  // const virtualId = "virtual:" + "auto-appoint";
  // const virtualModuleId = "/@" + virtualId;
  return {
    name: "vite-auto-appoint",
    enforce: "pre",
    handleHotUpdate(ctx) {
      console.log("---",ctx.file);
    },
    buildStart() {
      console.log("-render start");
      generateRoutes();
    },
  };
}
