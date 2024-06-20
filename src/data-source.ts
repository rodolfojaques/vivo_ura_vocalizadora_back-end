import { DataSource } from "typeorm";
import "dotenv/config";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT_1),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  logging: true,
  synchronize: true,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
});

const AppDataSourceHistory = new DataSource({
  type: "postgres",
  host: process.env.DB_NEW_HOST,
  port: Number(process.env.DB_PORT_2),
  username: process.env.DB_NEW_USER,
  password: process.env.DB_NEW_PASSWORD,
  database: process.env.DB_NEW_NAME,
  logging: true,
  synchronize: true,
  entities: ["src-new/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
})

const AppDataSourceTemsHistory = new DataSource({
  type: "postgres",
  host: process.env.DB_TEMS_HOST,
  port: Number(process.env.DB_PORT_3),
  username: process.env.DB_TEMS_USER,
  password: process.env.DB_TEMS_PASSWORD,
  database: process.env.DB_TEMS_NAME,
  logging: true,
  synchronize: true,
  entities: ["src-temsHist/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
});

export { AppDataSource, AppDataSourceHistory, AppDataSourceTemsHistory };
