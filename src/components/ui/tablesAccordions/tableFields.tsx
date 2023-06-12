import { DeleteOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, type MenuProps } from "antd";
import { type field } from "./accordion-item";
import { type ChangeEvent } from "react";
import { useTablesStore } from "@/stores/tablesStores";

type TableFieldsProps = {
  field: field;
  tableName: string;
  fieldIndex: number;
};

export default function TableFields({
  field,
  tableName,
  fieldIndex,
}: TableFieldsProps) {
  const inputClasses =
    "border border-sky-200 p-2 rounded-md w-1/2 transition-colors hover:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300";

  const removeColumnFromTable = useTablesStore(
    (state) => state.removeColumnFromTable
  );

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "eliminar-columna") {
      removeColumnFromTable(tableName, fieldIndex);
    }
  };

  const onChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(tableName, fieldIndex, name, value);
  };

  const items: MenuProps["items"] = [
    {
      label: "Eliminar Columna",
      key: "eliminar-columna",
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="tableFields flex flex-row justify-center items-center w-full gap-2 hover:bg-slate-100 p-2">
      <input
        type="text"
        name="fieldName"
        className={inputClasses}
        value={field.columnName}
        onChange={(e) => onChangeField(e)}
      />
      <input
        type="text"
        name="fieldType"
        className={`${inputClasses} w-1/3`}
        value={field.columnType}
        onChange={(e) => onChangeField(e)}
      />
      <Dropdown menu={menuProps} placement="bottomLeft" trigger={["click"]}>
        <span className="p-2 hover:bg-slate-400/20 rounded-md flex items-center">
          <EllipsisOutlined />
        </span>
      </Dropdown>
    </div>
  );
}
