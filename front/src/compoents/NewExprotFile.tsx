import { newExprotFile } from "@/models/exprotfile";
import { ModalForm, ProFormText } from "@ant-design/pro-components";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

export const NewExportModal = NiceModal.create((data: { name: string }) => {
  const modal = useModal();
  return (
    <ModalForm
      onFinish={async (value: any) => {
        newExprotFile(value);
        return true;
      }}
      open={modal.visible}
      onOpenChange={(v) => !v && modal.hide()}
    >
      <ProFormText label="名称" name={"name"} required />
    </ModalForm>
  );
});
