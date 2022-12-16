import fg from "fast-glob";
import fs from "fs";
import shortid from "shortid";
import { slash } from "./utils";
import utils from "node:util";
import path from "path";
import * as ts from "typescript";


shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$"
);
export async function generateRoutes() {
  // console.log("-----generateRoutes------");
  const paths: Array<{
    name: string;
    path: string;
  }> = [];
  const infos: Array<any> = [];
  const pages = await fg("**/*.tsx", { dot: true, cwd: "src/pages" });
  pages.map((it) => {
    let pagePath: string;
    if (it.endsWith("index.tsx")) {
      pagePath = it.replace("index.tsx", "");
    } else {
      pagePath = it.replace(".tsx", "");
    }
    if (pagePath.endsWith("/")) {
      pagePath = pagePath.substring(0, pagePath.length - 1);
    }
    const filePath = path.join(process.cwd(), "src/pages", it);
    getPageMoudleByPagefile(filePath);
    if (pagePath == "") {
      pagePath = "/";
    }
    paths.push({
      name: "C" + shortid.generate(),
      path: pagePath,
    });
  });

  const routerTemplte = `
  import React from "react";
  import { RouteObject } from "react-router-dom";
  ${paths
    .map(
      (it) =>
        `const ${it.name} = React.lazy(()=>import(\"@/pages/${it.path}\"))`
    )
    .join("\n")}
  const routes: Array<RouteObject> = [
    ${paths
      .map(
        (it) => `{
      path:\"${it.path}\",
      element: <${it.name}/>,
    }`
      )
      .join(",\n")}
  ];
  export default routes`;
  fs.writeFileSync(`${process.cwd()}/src/Routes/test.tsx`, routerTemplte);
  // console.log(files);
}

async function getPageMoudleByPagefile(filePath: string) {
  if (filePath.endsWith("index.tsx")) {
    filePath = filePath.replace("index.tsx", "pageInfo.ts");
  } else {
    filePath = filePath.replace(".tsx", "PageInfo.ts");
  }

  // console.log(process.platform)
  if (fs.existsSync(filePath)) {
 
   fs.readFile(filePath,"utf-8", function(err,data){
    if(!err){
      const result= ts.transpileModule(data,{})
      console.log(result.diagnostics)
    }
   });
  }
}
