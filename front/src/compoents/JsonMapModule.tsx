import { exportState, ExportType } from "@/models/exprotfile";
import { DrawerForm, ProCard, ProFormField } from "@ant-design/pro-components";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useSnapshot } from "valtio";

export const JsonMapModal = NiceModal.create(({ idx }: { idx: number }) => {
  const modal = useModal();
  //   const state = useSnapshot(data)
  const state = useSnapshot(exportState);
  return (
    <DrawerForm open={modal.visible} onOpenChange={(v) => !v && modal.hide()}>
      {state[idx].exportMaps?.map((it) => (
        <ProCard
          title={`${it.code}.map.json`}
          headerBordered
          collapsible
          defaultCollapsed
        >
          <ProFormField
            ignoreFormItem
            fieldProps={{
              style: {
                width: "100%",
              },
            }}
            mode="read"
            valueType="jsonCode"
            text={JSON.stringify(it.maps)}
          />
        </ProCard>
      ))}
    </DrawerForm>
  );
});
