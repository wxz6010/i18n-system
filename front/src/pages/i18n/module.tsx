import type { ProColumns } from "@ant-design/pro-components";
import {
  EditableProTable,
  ProCard,
  ProFormField,
  useRefFunction,
} from "@ant-design/pro-components";
import React, { useState } from "react";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id?: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624691229,
    title: "通用模块",
    decs: "多平台通用",
    created_at: "1590481162000",
  },
  {
    id: 624748504,
    title: "app 某页面",
    decs: "业务特殊翻译",
    created_at: "1590486176000",
    children: [
      {
        id: 6246912293,
        title: "app 子页面",
        decs: "子业务模块",
        created_at: "1590481162000",
      },
    ],
  },
];

const loopDataSourceFilter = (
  data: readonly DataSourceType[],
  id: React.Key | undefined
): DataSourceType[] => {
  return data
    .map((item) => {
      if (item.id !== id) {
        if (item.children) {
          const newChildren = loopDataSourceFilter(item.children, id);
          return {
            ...item,
            children: newChildren.length > 0 ? newChildren : undefined,
          };
        }
        return item;
      }
      return null;
    })
    .filter(Boolean) as DataSourceType[];
};

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>(
    () => defaultData
  );

  const removeRow = useRefFunction((record: DataSourceType) => {
    setDataSource(loopDataSourceFilter(dataSource, record.id));
  });
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "业务名称",
      dataIndex: "title",
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 2 ? [{ required: true, message: "此项为必填项" }] : [],
        };
      },
      width: "30%",
      search: {
        transform: () => "",
      },
    },
    {
      title: "描述",
      dataIndex: "decs",
      fieldProps: (form, { rowKey, rowIndex }) => {
        if (form.getFieldValue([rowKey || "", "title"]) === "不好玩") {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          };
        }
        return {};
      },
      search:false
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      valueType: "date",
      search:false
    },
    {
      title: "操作",
      valueType: "option",
      width: 200,
      render: (text, record) => [
        <a
          key="delete"
          onClick={() => {
            removeRow(record);
          }}
        >
          编辑
        </a>,
        <a>新增</a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        expandable={{
          // 使用 request 请求数据时无效
          defaultExpandAllRows: true,
        }}
        scroll={{
          x: 960,
        }}
        rowKey="id"
        maxLength={5}
        recordCreatorProps={{
          position: "bottom",
          newRecordType: "dataSource",
          parentKey: () => 624748504,
          record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
        }}
        columns={columns}
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
        search={{
            labelWidth: 'auto',
          }}
      />
      {/* <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
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
      </ProCard> */}
    </>
  );
};
