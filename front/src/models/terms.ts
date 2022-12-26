import { proxy, subscribe } from "valtio";

export type TermsType = {
  id: number;
  title: string;
  code: string;
  state: string;
  languages?: {
    code: string;
    content: string;
  }[];
  comments: number;
  created_at: string;
  updated_at: string;
};

export const termsState = proxy(
  JSON.parse(localStorage.getItem("terms") || "[]") as TermsType[]
);

subscribe(termsState, () => {
  localStorage.setItem("terms", JSON.stringify(termsState));
});
