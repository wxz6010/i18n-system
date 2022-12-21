import {
  MenuDataItem,
  PageContainer,
  ProLayout,
} from "@ant-design/pro-components";
import { Outlet, useNavigate } from "react-router-dom";
import { Tag, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

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

  return (
    <>
      <ProLayout
        title="xx管理平台"
        route={route}
        // location={{
        //   pathname,
        // }}
        fixSiderbar
        headerRender={false}
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
        {/* <PageContainer
          tags={<Tag color="blue">状态一</Tag>}
          header={{
            style: {
              padding: "8px 16px",
              backgroundColor: "#fff",
              position: "fixed",
              top: 0,
              width: "100%",
              left: 0,
              zIndex: 999,
              boxShadow: "0 2px 8px #f0f1f2",
            },
          }}
          style={{
            paddingBlockStart: 48,
          }}
          extra={[
            <Input.Search
              key="search"
              style={{
                width: 240,
              }}
            />,
            <Button key="3">操作一</Button>,
            <Button key="2" type="primary">
              操作一
            </Button>,
          ]}
        > */}
        <Outlet />
        {/* </PageContainer> */}
      </ProLayout>
    </>
  );
}
