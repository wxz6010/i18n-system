import { buseeMoule } from "@/models/busseModule";
import { languageState } from "@/models/language";
import { saveTermsItem, termsState, TermsType } from "@/models/terms";
import shortid from "shortid";
import {
  DrawerForm,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from "@ant-design/pro-components";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Form, message } from "antd";
import { useSnapshot } from "valtio";
export const TermresModlId = "terms_modal_id";

export const TermsModal = NiceModal.create((data: TermsType) => {
  const modal = useModal();
  const [form] = Form.useForm<{ name: string; company: string }>();
  const luanges = useSnapshot(languageState);
  return (
    <DrawerForm<TermsType>
      title={`${data.id ? "编辑" : "新建"}词条`}
      form={form}
      open={modal.visible}
      onOpenChange={(v) => !v && modal.hide()}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        // await waitTime(2000);
        // console.log(values.name);
        message.success("提交成功");
        saveTermsItem(values);
        // 不返回不会关闭弹框
        return true;
      }}
      initialValues={data.id ? data : { id: shortid.generate() }}
    >
      <ProForm.Group>
        <ProFormText name="id" width="md" label="shortid" disabled />
        <ProFormTreeSelect
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="busseId"
          label="业务模块"
          placeholder="请选择业务模块"
          fieldProps={{
            treeData: buseeMoule.buseeMoules,
            fieldNames: { value: "id", label: "name" },
          }}
        />
      </ProForm.Group>

      {luanges.map((it) => (
        <ProFormTextArea
          key={it.id}
          label={it.languagetype}
          name={it.code}
          width="xl"
        />
      ))}
    </DrawerForm>
  );
});

NiceModal.register(TermresModlId, TermsModal);
