import "dotenv/config";

import connection from "./connection.js";
// import loadJson from "./load-json.js";

async function run() {
  // const ids = loadJson("./ids.json");
  // const in_clause = ids.map((id, index) => `:id_${index}`).join(",");

  const data = await connection.execute(`your query here`);

  for (const row of data.rows) {
    const result = await connection.execute(`sua query with :param`, {
      param: 'your param value'
    });
    console.log(result, row.ID);
  }
}

run();
