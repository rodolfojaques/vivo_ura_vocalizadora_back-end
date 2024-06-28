import app from "./app";

import { AppDataSource, AppDataSourceHistory, AppDataSourceTemsHistory } from "./data-source";
import catchAlarmKafka from "./services/tems-tools/consumerKafkaTems.service";

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  await AppDataSourceHistory.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  await AppDataSourceTemsHistory.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  app.listen(3000, () => {
    console.log("Servidor executando");
  });

  /**
   * DESCOMENTAR PARA ativar consumo de alarmes TEMS
   */
  // if(AppDataSourceTemsHistory.isInitialized) await catchAlarmKafka()
    
})();
