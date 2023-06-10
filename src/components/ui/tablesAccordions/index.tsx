"use client";

import { Table } from "@/stores/tablesStores";
import AccordionItem from "./accordion-item";

// import style from "./tables-accordions.module.css";

type AccordionProps = {
  tables: Table[];
};

//
// Main component, for complex accordion
//
export default function Accordion({ tables = [] }: AccordionProps) {
  return (
    <div className="flex flex-col w-full border-b border-b-slate-100">
      {tables.map((item, index) => (
        <AccordionItem key={index} data={{ ...item }} />
      ))}
    </div>
  );
}
