import React, { useState, useEffect } from "react";
import { Button, Card, Space, Table, Tag, Popover } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import MainService from "../services/MainService";
import Swal from "sweetalert2";

const UIControlWrapper = () => {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    MainService.getMenu().then(({ data }) => {
      setItemList(data);
    });
  };

  const handleChangeStatus = (menuId) => {
    Swal.fire({
      title: "คำเตือน ?",
      text: "ต้องการที่จะเปลี่ยนการตั้งค่า",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("success", "เปลี่ยนการตั้งค่าสำเร็จ", "success");
        console.log("menuId ==> ", menuId);
      }
    });
  };

  const COLUMN = {
    MAIN: [
      {
        title: "#",
        align: "center",
        dataIndex: "index",
        render: (text, record, index) => (
          <div _id={record._id}>{index + 1}</div>
        ),
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        align: "center",
        render: (price) => `฿${price}`,
      },
      {
        title: "Status",
        dataIndex: "is_active",
        key: "is_active",
        align: "center",
        render: (is_active, { _id }) => {
          const info = is_active
            ? { title: "Open", type: "blue" }
            : { title: "Close", type: "red" };
          return (
            <Tag
              color={info.type}
              style={{ cursor: "pointer" }}
              onClick={() => handleChangeStatus(_id)}
            >
              {info.title}
            </Tag>
          );
        },
      },

      {
        title: "Actions",
        key: "actions",
        render: (record) => (
          <Space>
            <Popover
              placement="right"
              content={
                <Card className="fix-pd-card">
                  <img
                    src={record?.img_url}
                    width={150}
                    height="auto"
                    style={{ borderRadius: "8px" }}
                  />
                </Card>
              }
            >
              <Button type="primary" icon={<PictureOutlined />} />
            </Popover>

            <Button
              type="primary"
              style={{ background: "#f1a739", borderColor: "#f1a739" }}
              icon={<EditOutlined className="antd-fix-icon" />}
            />

            <Button
              type="primary"
              style={{ background: "#ed4c4c", borderColor: "#ed4c4c" }}
              icon={<DeleteOutlined className="antd-fix-icon" />}
            />
          </Space>
        ),
      },
      ,
    ],
  };

  return (
    <Card>
      <Table
        dataSource={itemList}
        columns={COLUMN.MAIN}
        pagination={false}
        scroll={{ x: 700 }}
        bordered
        rowKey="_id"
      />
    </Card>
  );
};

export default UIControlWrapper;
