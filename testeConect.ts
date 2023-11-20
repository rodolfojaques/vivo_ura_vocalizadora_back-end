import axios from "axios"
import { AppDataSource } from "./src/data-source"
import { TesteConect } from "./src/entities/testeConect.entity"
import * as cron from 'node-cron'

const testeRepository = AppDataSource.getRepository(TesteConect)

const testConected = async () => {
    async function realizarRequisicao() {
    try {
        const res = await axios.get('https://viacep.com.br/ws/01001000/json/');
        const teste = JSON.stringify(res.data);
        const save = testeRepository.create({ viaCep: teste });
        console.log(save);
        
        await testeRepository.save(save);
    } catch (err) {
        console.log(err);
    }
    }

    cron.schedule('*/3 * * * *', realizarRequisicao);    
}

export default testConected