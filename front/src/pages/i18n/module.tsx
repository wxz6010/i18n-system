import { BusseModuleType, buseeMoule } from "@/models/busseModule";
import type { ProColumns } from "@ant-design/pro-components";
import { EditableProTable } from "@ant-design/pro-components";
import React, { useState } from "react";
import { useSnapshot } from "valtio";

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const dataSource = useSnapshot(buseeMoule.buseeMoules);

  // const removeRow = useRefFunction((record: DataSourceType) => {
  //   setDataSource(loopDataSourceFilter(dataSource, record.id));
  // });
  const columns: ProColumns<BusseModuleType>[] = [
    {
      title: "业务名称",
      dataIndex: "name",
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
      search: false,
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      valueType: "date",
      search: false,
    },
    {
      title: "操作",
      valueType: "option",
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="edite"
          onClick={() => {
            // removeRow(record);
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="add_child"
          onClick={() => {
            action?.addEditRecord?.(
              {
                pid: record.pid ? `${record.pid}/${record.id}` : record.id,
                id: `${record.id}_new`,
              },
              { parentKey: record.id, position: "bottom" }
            );
          }}
        >
          新增子项
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<BusseModuleType>
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
          newRecordType: "cache",
          // parentKey: () => 624748504,
          record: (index) => ({ id: `${index}_new` }),
        }}
        columns={columns}
        // @ts-ignore
        value={dataSource}
        // onChange={setDataSource}
        editable={{
          type: "multiple",
          editableKeys,
          onSave: async (rowKey, data, row) => {
            // console.log(rowKey, data, row);
            // await waitTime(2000);
            buseeMoule.saveItem(data);
          },
          onChange: setEditableRowKeys,
        }}
        search={{
          labelWidth: "auto",
        }}
      />
    </>
  );
};
