import React, { useState } from "react";
import { Button, Table, Row, Col, Space, Modal, message, Spin } from "antd";
import axios from "axios";

const Users = ({ dataSource, setDataSource, selectedRowKeys, setSelectedRowKeys }) => {
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_URL;

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const handleDelete = async (id) => {
    try {
      // Confirm delete action
      Modal.confirm({
        title: "Are you sure you want to delete this user?",
        onOk: async () => {
          await axios.delete(`${BASE_URL}/api/users/${id}`);
          // Update dataSource state
          setDataSource((prevDataSource) => prevDataSource.filter((user) => user._id !== id));
          message.success("User deleted successfully");
        },
      });
    } catch (error) {
      console.error("There was an error deleting the user!", error);
      message.error("Failed to delete the user");
    }
  };

  const columns = [
    {
      title: "Firstname",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="underline text-base text-red-500">
          <a onClick={() => handleDelete(record._id)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={16}>
        <Col className="flex items-center gap-4 ">
          <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
            Reload
          </Button>

          {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
        </Col>
      </Row>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        rowKey="_id"
      />
    </div>
  );
};

export default Users;
