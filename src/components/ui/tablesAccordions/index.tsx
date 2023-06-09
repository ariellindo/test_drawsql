"use client";

import { useState } from "react";

// import style from "./tables-accordions.module.css";

type AccordionProps = {
  tables: AccordionItemProps[];
};

type AccordionItemProps = {
  tableName: string;
  columns: column[];
};

type column = {
  columnName: string;
  columnType: columnType;
  primaryKey: boolean;
};

type columnType = "char" | "int" | "boolean" | "date" | "float" | "double";

//
// Main component, for complex accordion
//
export default function Accordion({ tables = [] }: AccordionProps) {
  return (
    <div className="flex flex-col w-full">
      {tables.map((item, index) => (
        <AccordionItem key={index} {...item} />
      ))}
    </div>
  );
}

function AccordionItem({ ...props }: AccordionItemProps) {
  const [itemOpen, setItemOpen] = useState(false);
  const toggleItem = () => setItemOpen(!itemOpen);

  console.log(props);
  return (
    <div className="flex flex-col">
      <div className={`accordionItemHead w-full min-h-40`} onClick={toggleItem}>
        Tile
      </div>
      <div className={`AccordionItemContent`}>
        <div className={`accordionItemContent w-full min-h-40`}> Form</div>
        <div className={`accordionItemFooter w-full min-h-40`}>
          footer actions
        </div>
      </div>
    </div>
  );
}
