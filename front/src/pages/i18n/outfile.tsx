import { JsonMapModal } from "@/compoents/JsonMapModule";
import { NewExportModal } from "@/compoents/NewExprotFile";
import { buseeMoule } from "@/models/busseModule";
import {
  changeSelectItems,
  ExportFileType,
  exportState,
  generateMaps,
} from "@/models/exprotfile";
import { ProCard, ProFormField, ProList } from "@ant-design/pro-components";
import NiceModal from "@ebay/nice-modal-react";
import { Button, List, message, Tree } from "antd";
import { Key, ReactText, useEffect, useState } from "react";
import { useSnapshot } from "valtio";

export default function () {
  const exportsSource = useSnapshot(exportState);
  const [selectedItem, $left] = useState<ExportFileType>();
  const [keys, $keys] = useState<Key[]>([]);

  useEffect(() => {
    $keys(selectedItem?.selectModuelsKeys || []);
  }, [selectedItem]);

  const setKeys = (keys: Key[]) => {
    if (selectedItem) {
      // @ts-ignore
      changeSelectItems(selectedItem?.id, keys);
      $keys(keys);
    } else {
      message.error("请先选择左侧需要修改的文件");
    }
  };

  return (
    <ProCard split="vertical">
      <ProCard colSpan="400px">
        <ProList<any>
          toolBarRender={() => {
            return [
              <Button
                key="add"
                type="primary"
                onClick={() => NiceModal.show(NewExportModal)}
              >
                新建
              </Button>,
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
          // @ts-ignore
          dataSource={exportsSource}
          showActions="hover"
          showExtra="hover"
          metas={{
            title: {
              dataIndex: "name",
            },
            avatar: {
              dataIndex: "image",
            },
            actions: {
              render: (_, _en, idx) => {
                // const data = exportState[idx].exportMaps;
                // console.log('121212',data)
                return [
                  <a
                    key={"query"}
                    onClick={() => NiceModal.show(JsonMapModal, {idx})}
                  >
                    查看生成文件
                  </a>,
                ];
              },
            },
          }}
          key={"id"}
          rowSelection={{
            onChange: (e) => !e.length && $left(undefined),
            onSelect: $left,
            type: "radio",
            columnTitle: <div />,
          }}
        />
      </ProCard>
      <ProCard split="horizontal">
        <ProCard
          extra={
            <Button type="primary" onClick={generateMaps}>
              生成
            </Button>
          }
        ></ProCard>
        <ProCard>
          <Tree
            checkable
            //@ts-ignore
            treeData={buseeMoule.buseeMoules}
            fieldNames={{ title: "name", key: "id" }}
            //@ts-ignore
            onCheck={setKeys}
            checkedKeys={keys}
          />
        </ProCard>
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
