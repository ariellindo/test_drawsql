"use client";

import { useCallback, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import { useTablesStore } from "@/stores/tablesStores";

import "reactflow/dist/style.css";
import DbTable from "./dbTableNode";

const nodeTypes = { dbTable: DbTable };

export default function DrawingBoard() {
  const tables = useTablesStore((state) => state.tables);
  const updateTablePosition = useTablesStore(
    (state) => state.updateTablePosition
  );
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  useEffect(() => {
    const initialTablesNodes = tables.map((table, index) => ({
      id: table.tableName,
      position: table.position || { x: 0, y: index * 50 },
      type: "dbTable",
      data: { label: table.tableName, fields: table.fields },
    }));
    setNodes(initialTablesNodes);
  }, [tables, setNodes]);

  const rfStyle = {
    // backgroundColor: "#B8CEFF",
  };

  const handleNodeDrag = useCallback(
    (event: React.MouseEvent, node: any) => {
      updateTablePosition(node.id, node.position);
    },
    [updateTablePosition]
  );

  return (
    <div className="h-[calc(100vh-56px)] w-screen bg-slate-100">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        fitView
        nodeTypes={nodeTypes}
        style={rfStyle}
        onNodeDragStop={handleNodeDrag}
      >
        <Controls position="bottom-right" />
        <MiniMap position="bottom-left" />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
