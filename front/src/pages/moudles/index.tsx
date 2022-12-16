import { definePage } from "@/index";

export default function () {
  return <div>业务模块管理</div>;
}
export const pageInfo = definePage({
  title: "业务模块",
  menu: {
    icon: "",
    title: "业务模块",
  },
});
