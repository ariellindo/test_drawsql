"use client";

import { Drawer, Tooltip } from "antd";
import { useState } from "react";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons";

import style from "./main-drawer.module.css";

export default function MainDrawer() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const drawerWidth = 300;
  const drawerBtnClass = openDrawer ? `${drawerWidth + 10}px` : "12px";

  return (
    <>
      <div
        style={{ left: drawerBtnClass }}
        className={`absolute top-2 z-30 transition-all ease-in-out duration-300`}
      >
        <Tooltip title="Open table config" placement="right">
          <a
            onClick={toggleDrawer}
            className="bg-white border border-slate-400 p-2 rounded-md shadow-md flex flex-row items-center justify-center cursor-pointer"
          >
            {openDrawer ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
          </a>
        </Tooltip>
      </div>

      <Drawer
        title="Tables"
        placement={"left"}
        onClose={onClose}
        open={openDrawer}
        mask={false}
        closable={false}
        getContainer={false}
        className={style.customDrawer}
        width={drawerWidth}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
}
