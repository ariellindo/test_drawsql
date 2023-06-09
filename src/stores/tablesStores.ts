import { create } from "zustand";

type TablesStore = {
  tables: any[];
  addTable: (tables: any[]) => void;
  removeTable: (table: any) => void;
};

export const useTablesStore = create<TablesStore>((set) => ({
  tables: [],
  addTable: (table) => set((state) => ({ tables: [...state.tables, table] })),
  removeTable: (table) =>
    set((state) => ({
      tables: state.tables.filter((t) => t.name !== table.name),
    })),
}));
