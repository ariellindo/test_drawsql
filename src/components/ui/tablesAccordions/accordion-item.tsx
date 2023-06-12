import {
  CaretDownOutlined,
  CaretRightOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import TableFields from "./tableFields";
import { Dropdown, MenuProps } from "antd";
import { useTablesStore } from "@/stores/tablesStores";

export type AccordionItemProps = {
  data: {
    tableName: string;
    fields: field[];
  };
};

export type field = {
  columnName: string;
  columnType: columnType;
  primaryKey?: boolean;
};

export type columnType =
  | "char"
  | "int"
  | "boolean"
  | "date"
  | "float"
  | "double";

export default function AccordionItem({ data }: AccordionItemProps) {
  const [itemOpen, setItemOpen] = useState(false);
  const { tableName, fields } = data;
  const addColumnToTable = useTablesStore((state) => state.addColumnToTable);
  const tables = useTablesStore((state) => state.tables);

  const toggleItem = () => {
    setItemOpen(!itemOpen);
  };

  function addColumn({ tableName }: { tableName: string }): void {
    const table = tables.find((table) => table.tableName === tableName);
    const fields = table?.fields;

    const newField: field = {
      columnName: `column_${fields && +fields?.length + 1}`,
      columnType: "char",
    };

    addColumnToTable(tableName, newField);
  }

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };

  const items: MenuProps["items"] = [
    {
      label: "Eliminar tabla",
      key: "eliminar-tabla",
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="flex flex-col">
      <div
        className={`accordionItemHead w-full min-h-40 bg-blue-300 text-blue-700 font-bold p-2 flex flex-row justify-between items-center cursor-pointer hover:bg-blue-400/80 transition-colors`}
        onClick={() => toggleItem()}
      >
        <div className="flex items-center">
          {itemOpen ? <CaretDownOutlined /> : <CaretRightOutlined />}
          <span className="ml-2">{tableName}</span>
        </div>

        <Dropdown menu={menuProps} placement="bottomLeft" trigger={["click"]}>
          <span
            onClick={(e) => e.stopPropagation()}
            className="p-2 hover:bg-blue-400/50 rounded-md flex items-center"
          >
            <EllipsisOutlined />
          </span>
        </Dropdown>
      </div>

      <div
        className={`AccordionItemContent ${
          itemOpen ? "h-auto" : "h-0 overflow-hidden"
        }`}
      >
        <div className={`accordionItemContent w-full min-h-14`}>
          {fields.map((field, index) => (
            <TableFields
              key={index}
              field={field}
              tableName={tableName}
              fieldIndex={index}
            />
          ))}
        </div>
        <div
          className={`accordionItemFooter w-full min-h-14 border-t border-t-slate-100 p-2 flex flex-row justify-end items-center`}
        >
          <button
            onClick={() => addColumn({ tableName: tableName })}
            className="p-2 border border-emerald-700 rounded-md text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            Add Column
          </button>
        </div>
      </div>
    </div>
  );
}
