import { proxy, subscribe } from "valtio";
import _ from "lodash-es";
export type BusseModuleType = {
  id: string;
  name?: string;
  decs?: string;
  createAt?: string;
  pid?: string;
  children?: BusseModuleType[];
};

class BusseModule {
  buseeMoules: BusseModuleType[] = proxy(
    JSON.parse(localStorage.getItem("busse_module") ?? "[]")
  );
  constructor() {
    subscribe(this.buseeMoules, () => {
      localStorage.setItem("busse_module", JSON.stringify(this.buseeMoules));
    });
  }

  saveItem(model: BusseModuleType) {
    let ms = this.buseeMoules;
    let id: string = "";

    if (model.pid) {
      const pids = model.pid.split("/");
      //
      for (let pid of pids) {
        const m = ms.find((x) => x.id == pid);
        if (m?.children) {
          ms = m.children;
        } else {
          ms = proxy([]);
          m!.children = ms;
        }
      }
      //create add a id
    }

    if (model.id.indexOf("new") > 0) {
      id = `${(Math.random() * 1000000).toFixed(0)}_${ms.length}`;
      ms.push({ ...model, id });
    } else {
      const index = ms.findIndex((x) => x.id == model.id);
      ms[index] = model;
    }
  }

  searchById(id: string) {
    const stack = [...this.buseeMoules];
    while (stack.length) {
      const temp = stack.shift();
      if (temp?.children) {
        stack.concat(temp.children);
      }
      if (temp?.id == id) {
        return temp;
      }
    }
  }
}

export const buseeMoule = new BusseModule();
