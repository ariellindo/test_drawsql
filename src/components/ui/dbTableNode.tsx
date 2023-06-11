import { Handle, Position } from "reactflow";

export default function DbTable({ data, isConnectable }: any) {
  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>{data.label}</div>
    </div>
  );
}
