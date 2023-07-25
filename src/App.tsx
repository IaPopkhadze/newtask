import React, { useEffect, useState } from "react";
import { DatePicker, Button, Input, Table, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import "./style/style.css";

interface IState {
  people: {
    id: number;
    name: string;
    email: string;
    gender: string;
    address: {
      street: string;
      city: string;
    };
    phone: string;
  }[];
}

const App = () => {
  const [data, setData] = useState<IState["people"]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const getData = async () => {
    try {
      const response = await axios.get("http://192.168.1.5:5000/persons");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);



  const handleDelete = (id: number) => {
    const updatedData = data.filter((person) => person.id !== id);
    setData(updatedData);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address: { street: string; city: string }) => `${address.city}, ${address.street}`,
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];


  const  handleModal=()=>{
    setIsModalVisible(true);
  }


  return (
    <div className="table_container">
      <div className="add_person_container">
        <button className="my_btn" onClick={handleModal}>Add New Person</button>
      </div>
      <Table dataSource={data} columns={columns} />;
    </div>
  );
};

export default App;
