import {
  EditableProTable,
  ProCard,
  ProColumns,
  ProFormField,
  ProFormRadio,
  ProTable,
} from "@ant-design/pro-components";
import { useState } from "react";

type DataSourceType = {
  id: React.Key;
  code?: string;
  langaue?: string;
  decs?: string;
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    code: "en_US",
    langaue:"English",

  },
  {
    id: 624691229,
    code: "zh_CN",
    langaue:"中文",
  },
];

export default function () {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState<"top" | "bottom" | "hidden">(
    "bottom"
  );

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "编码",
      dataIndex: "code",
      tooltip: "语言编码",
      width: "15%",
    },
    {
      title: "语种",
      dataIndex: "langaue",
      tooltip: "语言种类名称 如:english,中文",
      width: "15%",
    },
    {
      title: "描述",
      dataIndex: "decs",
      valueType: "text",
    },

    {
      title: "操作",
      valueType: "option",
      width: 200,
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
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle="多语言配置"
        maxLength={5}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={
          position !== "hidden"
            ? {
                position: position as "top",
                record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
              }
            : false
        }
        loading={false}
        // toolBarRender={() => [
        //   <ProFormRadio.Group
        //     key="render"
        //     fieldProps={{
        //       value: position,
        //       onChange: (e) => setPosition(e.target.value),
        //     }}
        //     options={[
        //       {
        //         label: "添加到顶部",
        //         value: "top",
        //       },
        //       {
        //         label: "添加到底部",
        //         value: "bottom",
        //       },
        //       {
        //         label: "隐藏",
        //         value: "hidden",
        //       },
        //     ]}
        //   />,
        // ]}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: "multiple",
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
      />
      {/* <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: "100%",
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard> */}
    </>
  );
}
