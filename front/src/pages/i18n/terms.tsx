import {
  ActionType,
  ProCard,
  ProColumns,
  ProTable,
  TableDropdown,
} from "@ant-design/pro-components";
import { Button, Dropdown, Input, Space, Tag, Tree } from "antd";
import { useRef } from "react";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: "index",
    valueType: "indexBorder",
    width: 80,
  },
  {
    title: "shortId",
    dataIndex: "title",
    width: 100,
  },
  {
    title: "未翻译语言",
    hideInTable: true,
    valueType: "select",
  },
  {
    title: "内容",
    valueType: "text",
    hideInTable: true,
  },
  {
    title: "模块",
    width: 100,
    search: false,
  },
  {
    title: "状态",
    dataIndex: "state",
    fixed: "left",
    width: 100,
    search:false
  },
  {
    title: "中文",
    search: false,
    width: 100,
  },
  {
    title: "英文",
    search: false,
    width: 100,
  },
  {
    title: "英文1",
    search: false,
    width: 100,
  },
  {
    title: "英文2",
    search: false,
    width: 100,
  },
  {
    title: "英文3",
    search: false,
    width: 100,
  },

  {
    title: "操作",
    valueType: "option",
    key: "option",
    fixed: "right",
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: "copy", name: "复制" },
          { key: "delete", name: "删除" },
        ]}
      />,
    ],
  },
];

function Right() {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      //   request={async (params = {}, sort, filter) => {
      //     console.log(sort, filter);
      //     return request<{
      //       data: GithubIssueItem[];
      //     }>("https://proapi.azurewebsites.net/github/issues", {
      //       params,
      //     });
      //   }}
      editable={{
        type: "multiple",
      }}
      columnsState={{
        persistenceKey: "pro-table-singe-demos",
        persistenceType: "localStorage",
        onChange(value) {
          console.log("value: ", value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: "auto",
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === "get") {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
      ]}
    />
  );
}

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
      <ProCard colSpan="200px">
        <Input.Search style={{ marginBottom: 8 }} placeholder="Search" />
        <Tree
          //   onExpand={onExpand}
          //   expandedKeys={expandedKeys}
          //   autoExpandParent={autoExpandParent}
          treeData={moudelsTree}
        />
      </ProCard>
      <ProCard>
        <Right />
      </ProCard>
    </ProCard>
  );
}
