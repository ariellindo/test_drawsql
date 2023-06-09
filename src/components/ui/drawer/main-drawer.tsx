"use client";

import { Drawer, Tooltip } from "antd";
import { useEffect, useState } from "react";
import {
  DoubleRightOutlined,
  DoubleLeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import style from "./main-drawer.module.css";
import Accordion from "../tablesAccordions";
import api from "@/api";
import { useTablesStore } from "@/stores/tablesStores";

export const emptyTable = {
  tableName: "",
  fields: [
    {
      columnName: "id",
      columnType: "int",
    },
  ],
};

export default function MainDrawer() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => setOpenDrawer(!openDrawer);
  const addTable = useTablesStore((state) => state.addTable);
  const initTables = useTablesStore((state) => state.initTables);
  const tables = useTablesStore((state) => state.tables);

  useEffect(() => {
    let tables = [];
    async function getTables() {
      try {
        tables = await api.schemas.getTables();
        initTables(tables);
      } catch (error) {
        console.log(error);
      }
    }
    const tablesLoadded = getTables();
  }, [initTables]);

  // callbacks
  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const drawerWidth = 300;
  const drawerBtnClass = openDrawer ? `${drawerWidth + 10}px` : "12px";

  const addNewTable = () => {
    console.log("add new table");
  };

  console.log(tables);
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
        extra={
          <div>
            <button
              onClick={addNewTable}
              className="text-md bg-sky-700 text-white font-semibold px-2 py-1 flex flex-row justify-center items-center rounded hover:bg-sky-600 transition-colors"
            >
              <PlusOutlined />
              <span className="ml-2">New table</span>
            </button>
          </div>
        }
      >
        <Accordion tables={[]} />
      </Drawer>
    </>
  );
}
