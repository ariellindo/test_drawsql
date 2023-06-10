import { field } from "@/components/ui/tablesAccordions/accordion-item";
import { create } from "zustand";

export type Table = {
  tableName: string;
  fields: field[];
};

type TablesStore = {
  tables: Table[];
  addTable: (table: Table) => void;
  initTables: (tables: Table[]) => void;
  removeTable: (tableName: string) => void;
};

export const useTablesStore = create<TablesStore>((set) => ({
  tables: [],
  initTables: (tables: Table[]) => set({ tables }),
  addTable: (table: Table) => {
    set((state) => {
      const newTable = {
        ...table,
        tableName: `Table_${state.tables.length + 1}`,
      };

      return { tables: [...state.tables, newTable] };
    });
  },
  removeTable: (tableName: string) =>
    set((state) => ({
      tables: state.tables.filter((t) => t.tableName !== tableName),
    })),
}));
