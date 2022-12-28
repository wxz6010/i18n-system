import { Language, languageState, editeLan, addLangesItem } from "@/models/language";
import { EditableProTable, ProColumns } from "@ant-design/pro-components";
import { useState } from "react";
import { useSnapshot } from "valtio";

export default function () {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const languages = useSnapshot(languageState);
  const columns: ProColumns<Language>[] = [
    {
      title: "编码",
      dataIndex: "code",
      tooltip: "语言编码",
      width: "15%",
    },
    {
      title: "语种",
      dataIndex: "languagetype",
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
      <EditableProTable<Language>
        rowKey="id"
        headerTitle="多语言配置"
        scroll={{
          x: 960,
        }}
        recordCreatorProps={{
          position: "bottom",
          creatorButtonText: "新增语言",
          record: (index, _) => ({ id: `${index}_new` }),
          newRecordType: "cache",
        }}
        loading={false}
        columns={columns}
        value={languages}
        // onChange={setDataSource}
        editable={{
          type: "multiple",
          editableKeys,
          onSave: async (rowKey, data, row) => {
            if (typeof row.id === "string") {
              addLangesItem(data);
            } else {
              editeLan(data);
            }
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
}
