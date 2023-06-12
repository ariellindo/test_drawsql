"use client";

import { Table } from "@/stores/tablesStores";
import AccordionItem from "./accordion-item";
import { useState } from "react";
import { useTableUXStore } from "@/stores/tableUXStore";

type AccordionProps = {
  tables: Table[];
};

export default function Accordion({ tables = [] }: AccordionProps) {
  const [tableOpen, setTableOpen] = useState<string>("");
  const setSelectedTable = useTableUXStore((state) => state.setSelectedTable);

  const toggleTable = (tableName: string) => {
    if (tableOpen === tableName) {
      setTableOpen("");
      setSelectedTable(null);
      return;
    }
    setSelectedTable(tableName);
    setTableOpen(tableName);
  };

  return (
    <div className="flex flex-col w-full border-b border-b-slate-100">
      {tables.map((item, index) => (
        <AccordionItem
          key={index}
          data={{ ...item }}
          isOpen={item.tableName === tableOpen}
          toggleTable={toggleTable}
        />
      ))}
    </div>
  );
}
