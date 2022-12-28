import { proxy, subscribe } from "valtio";

export type TermsType = {
  id: string;
  title: string;
  code: string;
  state: string;
  comments: string;
  busseId: string;
  created_at: string;
  updated_at: string;
};

export const termsState = proxy(
  JSON.parse(localStorage.getItem("terms") || "[]") as TermsType[]
);

subscribe(termsState, () => {
  localStorage.setItem("terms", JSON.stringify(termsState));
});

export function saveTermsItem(data: TermsType) {
  const index = termsState.findIndex((x) => x.id == data.id);
  if (index > -1) {
    termsState[index] = data;
  } else {
    termsState.push(data);
  }
}


