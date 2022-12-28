import { generate } from "shortid";
import { proxy, subscribe } from "valtio";
import { buseeMoule } from "./busseModule";
import { languageState } from "./language";
import { termsState } from "./terms";

type exportType = { code: string; maps: any }[];

export type ExportFileType = {
  id: string;
  name?: "string";
  selectModuelsKeys?: string[];
  exportMaps?: exportType;
};

export const exportState = proxy<ExportFileType[]>(
  JSON.parse(localStorage.getItem("export_files") || "[]")
);

subscribe(exportState, () => {
  localStorage.setItem("export_files", JSON.stringify(exportState));
});

export function newExprotFile(file: ExportFileType) {
  file.id = generate();
  file.selectModuelsKeys = [];
  exportState.push(file);
}

export function changeSelectItems(id: string, keys: string[]) {
  const temp = exportState.find((x) => x.id === id);
  temp!.selectModuelsKeys = proxy(keys);
}

export function generateMaps() {
  // const busse = buseeMoule.buseeMoules;
  for (let exportfile of exportState.filter(
    (x) => x.selectModuelsKeys && true
  )) {
    const terms = termsState.filter((x) =>
      exportfile.selectModuelsKeys!.includes(x.busseId)
    );
    let arr: exportType = [];

    for (let language of languageState) {
      arr.push({
        code: language.code!,
        maps: terms.reduce((arr: any, crr: any) => {
          arr[crr.id] = crr[language.code!] || crr[languageState[0].code!];
          return arr;
        }, {}),
      });
    }
    exportfile.exportMaps = arr;
  }
}
