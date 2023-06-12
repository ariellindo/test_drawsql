import { create } from "zustand";

type TableUXStore = {
  selectedTable: string | null;
  setSelectedTable: (tableName: string | null) => void;
};

export const useTableUXStore = create<TableUXStore>((set) => ({
  selectedTable: null,
  setSelectedTable: (tableName: string | null) =>
    set({ selectedTable: tableName }),
}));
