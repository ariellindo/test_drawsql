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
  addColumnToTable: (tableName: string, field: field) => void;
  removeColumnFromTable: (tableName: string, fieldIndex: number) => void;
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
  addColumnToTable: (tableName: string, field: field) =>
    set((state) => {
      const table = state.tables.find((t) => t.tableName === tableName);
      if (!table) return state;

      const newTable = {
        ...table,
        fields: [...table.fields, field],
      };

      return {
        tables: state.tables.map((table) =>
          table.tableName === tableName ? newTable : table
        ),
      };
    }),
  removeColumnFromTable: (tableName: string, fieldIndex: number) =>
    set((state) => {
      const table = state.tables.find((table) => table.tableName === tableName);
      if (!table) return state;

      const newTable = {
        ...table,
        fields: table.fields.filter((_, index) => index !== fieldIndex),
      };

      return {
        tables: state.tables.map((table) =>
          table.tableName === tableName ? newTable : table
        ),
      };
    }),

  removeTable: (tableName: string) =>
    set((state) => ({
      tables: state.tables.filter((t) => t.tableName !== tableName),
    })),
}));
