import { Handle, Position } from "reactflow";
import style from "./dbTableNode.module.css";
import { useTableUXStore } from "@/stores/tableUXStore";

export default function DbTable({ data, isConnectable }: any) {
  const selectedTable = useTableUXStore((state) => state.selectedTable);

  const selectedClass =
    selectedTable === data.label
      ? "border-0 border-transparent ring-2 ring-sky-500 "
      : "border-0 border-transparent";

  return (
    <div
      className={`${selectedClass} rounded-md min-w-40 shadow-md shadow-slate-700/30 bg-white flex flex-col overflow-hidden`}
    >
      <div className="tableName text-center font-semibold text-base border-b border-slate-400 bg-slate-200">
        {data.label}
      </div>
      {data.fields.map((field: any, index: number) => (
        <div
          key={index}
          className={
            "tableField group hover:bg-sky-50 text-sm w-full transition-colors"
          }
        >
          {selectedTable === data.label && (
            <Handle
              type="target"
              position={Position.Left}
              isConnectable={isConnectable}
            />
          )}

          <div className={style.fieldRow}>
            <div className={"fieldName group-hover:text-purple-500 mr-4"}>
              {field.columnName}
            </div>
            <div className="fieldType text-slate-400 group-hover:text-purple-500">
              {field.columnType}
            </div>
          </div>

          {selectedTable === data.label && (
            <Handle
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
            />
          )}
        </div>
      ))}
    </div>
  );
}
