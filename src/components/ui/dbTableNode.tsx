import { Handle, Position } from "reactflow";
import style from "./dbTableNode.module.css";

export default function DbTable({ data, isConnectable }: any) {
  return (
    <div className="border border-slate-600 rounded-md w-40 shadow-md shadow-slate-700/30 bg-white flex flex-col overflow-hidden">
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
          <Handle
            type="target"
            position={Position.Left}
            isConnectable={isConnectable}
          />

          <div className={style.fieldRow}>
            <div className={"fieldName group-hover:text-purple-500"}>
              {field.columnName}
            </div>
            <div className="fieldType text-slate-400 group-hover:text-purple-500">
              {field.columnType}
            </div>
          </div>

          <Handle
            type="source"
            position={Position.Right}
            isConnectable={isConnectable}
          />
        </div>
      ))}
    </div>
  );
}
