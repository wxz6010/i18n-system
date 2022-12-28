import {
  ActionType,
  ParamsType,
  ProCard,
  ProColumns,
  ProTable,
} from "@ant-design/pro-components";
import { Button, Input, Tree } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { termsState, TermsType } from "@/models/terms";
import { useSnapshot } from "valtio";

import { languageState } from "@/models/language";
import { buseeMoule } from "@/models/busseModule";

import NiceModal from "@ebay/nice-modal-react";
import { TermresModlId, TermsModal } from "@/compoents/TermsModal";

function Right({ sin, reset }: { sin: string; reset: () => void }) {
  const actionRef = useRef<ActionType>();
  const lanugesSource = useSnapshot(languageState);
  const termsSource = useSnapshot(termsState);
  const [dataSrouce, $data] = useState(termsSource);

  const search = useCallback(
    (data: ParamsType) => {
      const keys = Object.keys(data);
      if (keys.length > 0) {
        const filters = termsSource.filter((terms: any) =>
          keys.reduce((acc, crr) => {
            // 检索未翻译的语言
            if (crr === "languageCode") {
              const code = data[crr];
              //只要有一个未翻译
              if (code == "all") {
                for (let lan of lanugesSource) {
                  if (!terms[lan.code!]) {
                    return true;
                  }
                }
                return false;
              }
              //单一未翻译语言
              return acc && !terms[data[crr]];
            }
            return acc && terms[crr] == data[crr];
          }, true)
        );
        $data(filters);
      }
    },
    [lanugesSource, sin]
  );

  // useEffect(() => {
  //   // actionRef.current?.reset?.();
  //   $data(termsSource);
  // }, [termsSource]);

  useEffect(() => {
    if (sin && sin != "rest") {
      $data(termsSource.filter((x) => x.busseId == sin));
      actionRef.current?.reset?.();
    } else {
      $data(termsSource);
    }
  }, [sin, termsSource]);

  // console.log(sin)
  const columns = useMemo(
    () =>
      [
        {
          title: "shortId",
          dataIndex: "id",
          width: 110,
          fixed: "left",
          copyable: true,
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
          dataIndex: "busseId",
          fixed: "left",
          renderText(text, record, index, action) {
            return buseeMoule.searchById(text)?.name || text;
          },
        },

        ...lanugesSource.map((it) => ({
          title: it.languagetype!,
          dataIndex: it.code!,
          width: 150,
          ellipsis: true,
        })),
        {
          title: "操作",
          valueType: "option",
          key: "option",
          fixed: "right",
          render: (text, record, _, action) => [
            <a
              key="editable"
              onClick={() => NiceModal.show(TermresModlId, record)}
            >
              编辑
            </a>,
          ],
        },
      ] as ProColumns<TermsType>[],
    [lanugesSource]
  );

  return (
    <ProTable<TermsType>
      columns={columns}
      actionRef={actionRef}
      scroll={{ x: 1300 }}
      cardBordered
      rowKey="id"
      search={{
        labelWidth: 100,
      }}
      dataSource={dataSrouce}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      toolBarRender={() => [
        <Button
          onClick={() => NiceModal.show(TermsModal)}
          key="button"
          icon={<PlusOutlined />}
          type="primary"
        >
          新建
        </Button>,
      ]}
      onSubmit={search}
      onReset={() => reset()}
    />
  );
}

export default function () {
  const moduleSource = useSnapshot(buseeMoule.buseeMoules);
  const [inp, $in] = useState("");
  const [sl, $sl] = useState("");

  const resest = useCallback(() => {
    console.log("rest_parent");
    $sl("rest");
  }, []);

  return (
    <div className=" flex flex-row">
      <div className="flex flex-col" style={{ width: "20%", marginRight: 10 }}>
        <Input.Search
          value={inp}
          onChange={(e) => $in(e.target.value)}
          style={{ marginBottom: 8 }}
          placeholder="Search"
        />
        <Tree
          autoExpandParent={true}
          filterTreeNode={(n) => {
            //@ts-ignore
            return inp !== "" && n.name.includes(inp);
          }}
          onSelect={(e) => (e.length > 0 ? $sl(e[0].toString()) : $sl(""))}
          selectedKeys={[sl]}
          // @ts-ignore
          treeData={moduleSource}
          fieldNames={{ key: "id", title: "name" }}
        ></Tree>
      </div>

      <div style={{ width: "80%" }}>
        <Right sin={sl} reset={resest} />
      </div>
    </div>
  );
}
