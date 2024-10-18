import app from "./app";
import https from 'https'
import fs from 'fs'

import { AppDataSource, AppDataSourceHistory, AppDataSourceTemsHistory } from "./data-source";

const options = {
  key: fs.readFileSync('./app.ura.noc.redestlf.br.pem'),
  cert: fs.readFileSync('./app.ura.noc.redestlf.br.cer')
};

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

  // app.listen(3000, () => {
  //   console.log("Servidor executando");
  // });

  https.createServer(options, app).listen(3000, () => {
    console.log('Servidor HTTPS rodando na porta 3000');
  });
    
})();
