"use client";

import api from "@/api";
import { Table, useTablesStore } from "@/stores/tablesStores";
import { SyncOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export default function Header({ title }: { title: string }) {
  const [originalTables, setOriginalTables] = useState<Table[] | []>([]);
  const tables = useTablesStore((state) => state.tables);
  const initTables = useTablesStore((state) => state.initTables);

  useEffect(() => {
    const getTables = async () => {
      setOriginalTables(await api.schemas.getTables());
    };

    getTables();
  }, []);

  const handleSyncTables = async () => {
    const updatingTables = tables.filter((table) => {
      return (
        originalTables.find((originalTable: Table) => {
          return originalTable.id === table.id;
        }) !== undefined
      );
    });

    const creatingTables = tables.filter((table) => {
      return originalTables.every((originalTable: Table) => {
        return originalTable.id !== table.id;
      });
    });

    const updatedCalls = updatingTables.map((table) =>
      api.schemas.updateTables(table)
    );
    const createdCalls = creatingTables.map((table) =>
      api.schemas.createTables(table)
    );

    await Promise.all([...updatedCalls, ...createdCalls]);
    initTables(await api.schemas.getTables());
  };

  return (
    <header
      className="flex justify-between items-center h-14 bg-slate-400 text-white font-semibold relative shadow-md px-4"
      role="banner"
    >
      <div>{title}</div>

      <div>
        <button
          onClick={() => handleSyncTables()}
          className="flex flex-row justify-center items-center bg-transparent text-white font-semibold px-2 py-1 rounded hover:bg-white/30 transition-colors border border-white"
        >
          <SyncOutlined />
          <span className="ml-2">Sync Tables</span>
        </button>
      </div>
    </header>
  );
}
