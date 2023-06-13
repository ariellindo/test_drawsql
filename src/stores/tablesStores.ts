import { Field } from "@/components/ui/tablesAccordions/accordion-item";
import { create } from "zustand";

export type Table = {
  id: string;
  tableName: string;
  position: { x: number; y: number };
  fields: Field[];
};

type TablesStore = {
  tables: Table[];
  addTable: (table: Table) => void;
  initTables: (tables: Table[]) => void;
  removeTable: (tableName: string) => void;
  addColumnToTable: (tableName: string, field: Field) => void;
  removeColumnFromTable: (tableName: string, fieldIndex: number) => void;
  updateTablePosition: (
    tableName: string,
    position: { x: number; y: number }
  ) => void;
  updateFieldsForTable: (
    tableName: string,
    fieldIndex: number,
    field: Field
  ) => void;
};

export const useTablesStore = create<TablesStore>((set) => ({
  tables: [],
  initTables: (tables: Table[]) => set({ tables }),
  addTable: (table: Table) => {
    set((state) => {
      const newTable = {
        ...table,
        tableName: `Table_${+state.tables[state.tables.length - 1].id + 1}`,
        id: (+state.tables[state.tables.length - 1].id + 1).toString(),
      };
      return { tables: [...state.tables, newTable] };
    });
  },
  addColumnToTable: (tableName: string, field: Field) =>
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
  updateFieldsForTable: (tableName: string, fieldIndex: number, field: Field) =>
    set((state) => {
      const table = state.tables.find((t) => t.tableName === tableName);
      if (!table) return state;

      table.fields[fieldIndex] = field;

      const newTable = {
        ...table,
        fields: table.fields,
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
  updateTablePosition: (
    tableName: string,
    position: { x: number; y: number }
  ) =>
    set((state) => {
      const table = state.tables.find((table) => table.tableName === tableName);
      if (!table) return state;

      const newTable = {
        ...table,
        position,
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
