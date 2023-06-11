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
import { Table } from "@/stores/tablesStores";

import "reactflow/dist/style.css";
import DbTable from "./dbTableNode";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];

export default function DrawingBoard() {
  const tables = useTablesStore((state) => state.tables);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  useEffect(() => {
    const initialTablesNodes = tables.map((table, index) => ({
      id: table.tableName,
      position: { x: 0, y: index * 50 },
      data: { label: table.tableName },
    }));
    setNodes(initialTablesNodes);
  }, [tables, setNodes]);

  const nodeTypes = { dbTable: DbTable };
  const rfStyle = {
    backgroundColor: "#B8CEFF",
  };

  return (
    <div className="h-[calc(100vh-56px)] w-screen bg-slate-100">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        fitView
        nodeTypes={nodeTypes}
        style={rfStyle}
      >
        <Controls position="bottom-right" />
        <MiniMap position="bottom-left" />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
