import { proxy, subscribe } from "valtio";

export type Language = {
  id: number | string;
  code?: string;
  languagetype?: string;
  desc?: string;
};

export const languageState = proxy(
  JSON.parse(localStorage.getItem("languages") || "[]") as Array<Language>
);

export function addLangesItem(lang: Language) {
  languageState.push({ ...lang, id: languageState.length });
}

export function editeLan(lang: Language) {
  const index = languageState.findIndex((x) => x.id === lang.id);
  if (index > -1) {
    languageState[index] = lang;
  }
}

subscribe(languageState, () => {
  localStorage.setItem("languages", JSON.stringify(languageState));
});
