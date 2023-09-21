import { Button, Checkbox, Form, Input, message } from "antd";
import apiRequest from "../../shared/utils/api/apiRequest";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import { useState } from "react";
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const {
        data: { success, token },
      } = await apiRequest.post("/login", {
        ...values,
      });
      if (success) {
        localStorage.setItem("JWT", `Bearer ${token}`);
        navigate("/");
      } else {
        message.error("Wrong email or password");
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      message.error("Something get wrong!");
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.login}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              disabled={loading}
              loading={loading}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Index;
