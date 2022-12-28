import {
  MenuDataItem,
  PageContainer,
  ProLayout,
} from "@ant-design/pro-components";
import {
  Navigate,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
} from "react-router-dom";
import { Tag, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const route = {
  routes: [
    {
      path: "/i18n",
      name: "i18n多语言管理",
      routes: [
        {
          name: "语言设置",
          path: "/i18n/langue",
        },
        {
          name: "业务模块",
          path: "/i18n/moudle",
        },
        {
          name: "词条设置",
          path: "/i18n/terms",
        },
        {
          name: "导出配置",
          path: "/i18n/outsetting",
        },
      ],
    },
  ],
};

export default function () {
  const navigate = useNavigate();
  const location = useLocation();
  // todo: 配置 index
  const m = useMatch("/i18n");
  if (m) {
    return <Navigate to="/i18n/langue" />;
  }
  return (
    <>
      <ProLayout
        title="xx管理平台"
        route={route}
        location={{
          pathname: location.pathname,
        }}
       
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              navigate(item.path!, {});
              // setPathname(item.path || "/welcome");
            }}
          >
            {dom}
          </a>
        )}
        avatarProps={{
          icon: <UserOutlined />,
        }}
      >
        <PageContainer
          breadcrumbRender={false}
        >
          <Outlet />
        </PageContainer>
      </ProLayout>
    </>
  );
}
