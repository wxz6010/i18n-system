import { ProCard, ProList } from "@ant-design/pro-components";
import { Button, List, Tree } from "antd";

const dataSource = [
  {
    name: "app 导出文件",
    desc: "123123.map.json",
  },
  {
    name: "pc 导出文件",
    desc: "123123.map.json",
  },
];

const moudelsTree = [
  { title: "通用业务模块", key: "1221" },
  {
    title: "app 业务",
    key: "app1",
    children: [
      {
        title: "page1",
        key: "app2",
      },
      {
        title: "page2",
        key: "app3",
      },
    ],
  },
];

export default function () {
  return (
    <ProCard split="vertical">
      <ProCard colSpan="400px">
        <ProList<any>
          toolBarRender={() => {
            return [
              <Button key="add" type="primary">
                新建
              </Button>,
              <Button>生成</Button>,
            ];
          }}
          onRow={(record: any) => {
            return {
              onMouseEnter: () => {
                console.log(record);
              },
              onClick: () => {
                console.log(record);
              },
            };
          }}
          rowKey="name"
          headerTitle="导出配置项"
          //   tooltip="基础列表的配置"
          dataSource={dataSource}
          showActions="hover"
          showExtra="hover"
          metas={{
            title: {
              dataIndex: "name",
            },
            avatar: {
              dataIndex: "image",
            },
            description: {
              dataIndex: "desc",
            },
          }}
        />
      </ProCard>
      <ProCard>
        <Tree
          checkable
          //   defaultExpandedKeys={["0-0-0", "0-0-1"]}
          //   defaultSelectedKeys={["0-0-0", "0-0-1"]}
          //   defaultCheckedKeys={["0-0-0", "0-0-1"]}
          //   onSelect={onSelect}
          //   onCheck={onCheck}
          treeData={moudelsTree}
        />
      </ProCard>
    </ProCard>
  );
}

/* <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard> */
