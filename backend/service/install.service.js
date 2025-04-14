const conn = require("../config/db.config");
const fs = require("fs/promises");

async function install() {
  const queryFilePath = __dirname + "/sql/initial-queries.sql";
  let queries = [];
  let finalMessage = {};

  try {
    const sqlFileContent = await fs.readFile(queryFilePath, "utf-8");
    // Split queries based on semicolons
    queries = sqlFileContent.split(";").map((query) => query.trim());

    for (let i = 0; i < queries.length; i++) {
      try {
        if (queries[i]) {
          const result = await conn.query(queries[i]);
          console.log("Query executed successfully");
        }
      } catch (err) {
        console.error("Error executing query:", err);
        finalMessage.message = "Not all tables are created";
        break; // Stop processing queries on the first error
      }
    }

    if (!finalMessage.message) {
      finalMessage.message = "All tables are created";
      finalMessage.status = 200;
    } else {
      finalMessage.status = 500;
    }
  } catch (error) {
    console.error("Error reading SQL file:", error);
    finalMessage.message = "Error reading SQL file";
    finalMessage.status = 500;
  }

  return finalMessage;
}

module.exports = { install };
