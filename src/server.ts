import testConected from "../testeConect";
import app from "./app";
import { AppDataSource, AppDataSourceHistory } from "./data-source";
import catchAlarmKafka from "./utils/consumerKafka";

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  await AppDataSourceHistory.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  app.listen(3000, () => {
    console.log("Servidor executando");
  });

  // catchAlarmKafka() // ATIVA CONSUMER
})();
