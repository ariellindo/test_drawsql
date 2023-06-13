import { Table } from "@/stores/tablesStores";

async function createPrisma({ tables }: { tables: Table[] }) {
  const res = await fetch("http://localhost:3000/api/prisma", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tables }),
  });
  return res.json();
}

const model = {
  createPrisma,
};

export default model;
