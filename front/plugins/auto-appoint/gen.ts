import fg from "fast-glob";
import fs from "fs";
import shortid from "shortid";
shortid.characters("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$");
export async function generateRoutes() {
  // console.log("-----generateRoutes------");
  const paths: Array<{
    name: string;
    path: string;
  }> = [];
  const pages = await fg("**/*.tsx", { dot: true, cwd: "src/pages" });
  pages.map((it) => {
    let path: string;
    if (it.endsWith("index.tsx")) {
      path = it.replace("index.tsx", "");
    } else {
      path = it.replace(".tsx", "");
    }
    if (path.endsWith("/")) {
      path = path.substring(0, path.length - 1);
    }
    if (path == "") {
      path = "/";
    }
    paths.push({
      name: "C" + shortid.generate(),
      path,
    });
  });

  const templte = `
  import React from "react";
  // import { useRoutes } from "react-router-dom";
  import { RouteObject } from "react-router-dom";
  ${paths.map(
    (it) => `const ${it.name} = React.lazy(()=>import(\"@/pages/${it.path}\"))`
  ).join('\n')}
  const routes: Array<RouteObject> = [
    ${paths.map(it=>`{
      path:\"${it.path}\",
      element: <${it.name}/>,
    }`).join(',\n')}
  ];
  export default routes`;
  fs.writeFileSync(`${process.cwd()}/src/Routes/test.tsx`, templte);
  // console.log(files);
}
