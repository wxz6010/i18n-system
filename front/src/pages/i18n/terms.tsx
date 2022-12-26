import {
  ActionType,
  ProCard,
  ProColumns,
  ProTable,
  TableDropdown,
} from "@ant-design/pro-components";
import { Button, Input, Tree } from "antd";
import { useMemo, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { termsState, TermsType } from "@/models/terms";
import { useSnapshot } from "valtio";

import { languageState } from "@/models/language";
import { buseeMoule, BusseModuleType } from "@/models/busseModule";

function Right() {
  const actionRef = useRef<ActionType>();

  const lanugesSource = useSnapshot(languageState);
  const busseMoudleSource = useSnapshot(buseeMoule.buseeMoules);
  const termsSource = useSnapshot(termsState);

  const columns = useMemo(
    () =>
      [
        {
          title: "shortId",
          dataIndex: "title",
          width: 100,
        },
        {
          title: "未翻译语言",
          hideInTable: true,
          valueType: "select",
          dataIndex: "languageCode",
          fieldProps: {
            options: [
              { value: "all", label: "所有语言" },
              ...lanugesSource.map((it) => ({
                value: it.code,
                label: it.languagetype,
              })),
            ],
          },
        },
        {
          title: "模块",
          width: 100,
          search: false,
        },

        ...lanugesSource.map((it) => ({
          title: it.languagetype!,
          dataIndex: it.code!,
          wdith: 130,
        })),
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
          ],
        },
      ] as ProColumns<TermsType>[],
    [lanugesSource]
  );

  console.log(columns);

  return (
    <ProTable<TermsType>
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
      // editable={{
      //   type: "multiple",
      // }}
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
      // options={{
      //   setting: {
      //     listsHeight: 400,
      //   },
      // }}
      // form={{
      //   // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
      //   syncToUrl: (values, type) => {
      //     if (type === "get") {
      //       return {
      //         ...values,
      //         created_at: [values.startTime, values.endTime],
      //       };
      //     }
      //     return values;
      //   },
      // }}
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
