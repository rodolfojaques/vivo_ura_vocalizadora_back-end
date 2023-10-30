import { Pool, QueryConfig } from "pg";

const dbConfig = {
  user: "ura@history",
  database: "ura_history",
  password: "1234",
  host: "db_new",
  port: 5432,
};

const pool = new Pool(dbConfig);

async function queryDatabase(query: QueryConfig) {
  const client = await pool.connect();
  try {
    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
}

async function queryBuilderParamsService(
  RTIPO_TA: string | null,
  RTIPO_REDE: string | null
) {
  try {
    console.log(typeof RTIPO_TA, RTIPO_TA);
    console.log(typeof RTIPO_REDE, RTIPO_REDE);
    const query = {
      text: `SELECT * FROM alarmes_history WHERE ($1::text IS NULL OR "TIPO_TA" = $1::text)
                                             AND ($2::text IS NULL OR "TIPO_REDE" = $2::text)`,
      values: [RTIPO_TA, RTIPO_REDE],
    };

    const results = await queryDatabase(query);

    console.log("Resultados da consulta:");
    return results;
  } catch (error) {
    console.error("Erro ao consultar o banco de dados:", error);
  }
}

export default queryBuilderParamsService;
