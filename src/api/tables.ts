import { Table } from "@/stores/tablesStores";

async function getTables() {
  const res = await fetch("http://localhost:4000/tables");
  return res.json();
}

async function updateTables(table: Table) {
  const tableUrl = `http://localhost:4000/tables/${table.id}`;
  const res = await fetch(tableUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(table),
  });
  return res.json();
}

async function createTables(tables: Table[] | Table) {
  const res = await fetch("http://localhost:4000/tables", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tables),
  });
  return res.json();
}

const schemas = {
  getTables,
  updateTables,
  createTables,
};

export default schemas;
