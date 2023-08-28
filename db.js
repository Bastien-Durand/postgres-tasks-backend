import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "bastiendurand",
  host: "localhost",
  post: "5432",
  database: "checklist",
});

export default pool;
