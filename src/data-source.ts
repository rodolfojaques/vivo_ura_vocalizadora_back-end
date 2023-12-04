import { DataSource } from "typeorm";
import "dotenv/config";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "10.215.19.183",
  port: 5431,
  username: process.env.DB_USER || "ura@dev",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB || "ura_vocalizadora",
  logging: true,
  synchronize: true,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
});

const AppDataSourceHistory = new DataSource({
  type: "postgres",
  host: process.env.DB_NEW_HOST || "10.215.19.183",
  port: 5433,
  username: process.env.DB_NEW_USER || "ura@history",
  password: process.env.DB_NEW_PASSWORD || "1234",
  database: process.env.DB_NEW_NAME || "ura_history",
  logging: true,
  synchronize: true,
  entities: ["src-new/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
});

export { AppDataSource, AppDataSourceHistory };
