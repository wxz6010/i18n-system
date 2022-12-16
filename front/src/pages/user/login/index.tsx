import { LoginForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { useEffect } from "react";
import pageInfo from "./pageInfo";
export default function () {
  useEffect(()=>{
    console.log(pageInfo);
  },[])
  return (
    <div className="flex min-h-screen justify-center items-center bg-slate-200">
      <LoginForm
        className="bg-white p-3 rounded-md "
        grid
        onFinish={async (e) => {
          console.log(e);
        }}
        title="I18N 管理平台"
        subTitle="嗯嗯........."
      >
        <ProFormText label="用户名" name={"username"} />
        <ProFormText.Password label="密码" name={"password"} />
      </LoginForm>
    </div>
  );
}