import { PageContainer, ProLayout } from "@ant-design/pro-components";
import { Outlet } from "react-router-dom";
import { Tag,Input,Button } from "antd";
export default function () {
  return (
    <>
      <ProLayout
        // route={defaultProps}
        // location={{
        //   pathname,
        // }}
        fixSiderbar
        headerRender={false}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              // setPathname(item.path || "/welcome");
            }}
          >
            {dom}
          </a>
        )}
        // avatarProps={{
        //   icon: <UserOutlined />,
        // }}
      >
        <PageContainer
          onBack={() => null}
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
        >
          <Outlet />
        </PageContainer>
      </ProLayout>
    </>
  );
}
