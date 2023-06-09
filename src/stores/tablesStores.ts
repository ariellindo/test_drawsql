import { field } from "@/components/ui/tablesAccordions/accordion-item";
import { create } from "zustand";

type Table = {
  id: number;
  tableName: string;
  fields: field[];
};

type TablesStore = {
  tables: Table[];
  addTable: (table: Table) => void;
  initTables: (tables: Table[]) => void;
  removeTable: (id: number) => void;
};

export const useTablesStore = create<TablesStore>((set) => ({
  tables: [],
  initTables: (tables: Table[]) => set({ tables }),
  addTable: (table: Table) =>
    set((state) => ({ tables: [...state.tables, table] })),
  removeTable: (id: number) =>
    set((state) => ({
      tables: state.tables.filter((t) => t.id !== id),
    })),
}));
