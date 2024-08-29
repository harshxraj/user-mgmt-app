import React from "react";
import { Modal, Button, Form, Input } from "antd";

const Register = ({ showModal, open, handleOk, handleCancel, confirmLoading, handleChange, formData }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Success:", values);
    await handleOk();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        SIGN UP
      </Button>
      <Modal
        title="SIGN UP"
        open={open}
        onOk={() => form.submit()}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="register"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={formData}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input name="email" value={formData.email} onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Firstname"
            name="firstname"
            rules={[{ required: true, message: "Please input your Firstname!" }]}
          >
            <Input name="firstname" value={formData.firstname} onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Lastname"
            name="lastname"
            rules={[{ required: true, message: "Please input your Lastname!" }]}
          >
            <Input name="lastname" value={formData.lastname} onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password name="password" value={formData.password} onChange={handleChange} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Register;
