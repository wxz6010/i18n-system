import { RouteObject } from "react-router-dom";
export declare interface PageInfo {
  title: string;
  menu: {
    icon?: string;
    title: string;
  };
  access: string;
  
}

export declare function definePage(
  info: Partial<PageInfo & RouteObject>
): Partial<PageInfo & RouteObject>;
