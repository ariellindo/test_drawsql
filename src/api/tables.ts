async function getTables() {
  const index = Math.floor(Math.random() * 10);
  const res = await fetch("http://localhost:4000/tables");
  return res.json();
}

const schemas = {
  getTables,
};

export default schemas;
