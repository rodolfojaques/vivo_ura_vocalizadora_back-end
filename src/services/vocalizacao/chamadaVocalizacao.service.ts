import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const chamadaVocalizacaoService = async (data:any) => {
    const output = {
        contacts:[
            {
                name: data.plantonista.nome,
                code: uuidv4(),
                phones:[
                    data.plantonista.tel_cel
                ],
                CLASSIFICACAO:data.alarme.CLASSIFICACAO,
                TIPO_ALARME: data.alarme.TIPO_ALARME,
                SITE: data.alarme.SITE,
                LOCALIDADE: data.alarme.LOCALIDADE,
                ESTADO: data.alarme.ESTADO,
                TA: data.alarme.TA,
                TIPO_TA: data.alarme.TIPO_TA,
                TIPO_REDE: data.alarme.TIPO_REDE,
                DATA_APRESENTACAO: data.alarme.DATA_APRESENTACAO,
                status: true
            }
        ]
    }

    const chamadas = async () => {
        axios.post("",output,{
            headers:{
                "Content-Type": "application/json"
            }
        })
        
        console.log("axios mandou o post");
        console.log();
        const monitorando = output.contacts[0].code

        setTimeout(() => {
            console.log("acabou o tempo");            
            console.log();            
            console.log("plantonista não atendeu", " code: ", monitorando);
            console.log();
            console.log("proximo contado");
            
            setTimeout(() => {
                console.log("acabou o tempo");            
                console.log();            
                console.log("Gerente1 não atendeu", " code: ", monitorando);
                console.log();
                console.log("proximo contado");
                
                setTimeout(() => {
                    console.log("não atendido");
                    
                }, 30000);
            }, 30000);
        }, 30000);
        
    }
    chamadas()

    console.log(output);
    
}

export default chamadaVocalizacaoService