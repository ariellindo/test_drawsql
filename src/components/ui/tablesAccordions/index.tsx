"use client";

import AccordionItem, { type AccordionItemProps } from "./accordion-item";

// import style from "./tables-accordions.module.css";

type AccordionProps = {
  tables: AccordionItemProps[];
};

//
// Main component, for complex accordion
//
export default function Accordion({ tables = [] }: AccordionProps) {
  return (
    <div className="flex flex-col w-full border-b border-b-slate-100">
      {/* {tables.map((item, index) => (
        <AccordionItem key={index} {...item} />
      ))} */}
      <AccordionItem
        key="1"
        data={{
          tableName: "table1",
          fields: [{ columnName: "id", columnType: "int", primaryKey: true }],
        }}
      />
    </div>
  );
}
