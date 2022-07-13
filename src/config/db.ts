import pg from "pg";
import "./setup.js";

const { Pool } = pg;

const devConfig = { connectionString: process.env.DATABASE_URL };
const prodConfig = { connectionString: process.env.DATABASE_URL, ssl: {} };

if (process.env.MODE === "PROD") {
  prodConfig.ssl = {
    rejectUnauthorized: false,
  };
}

const db = new Pool(process.env.MODE === "PROD" ? prodConfig : devConfig);
export default db;
