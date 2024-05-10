import callTemsService from "./callTems.service"
import matchGroupAlarmeService from "./matchGroupAlarm.service"

const vocalizacaoTemsService = async (data:any) => {
    const groupsSelected = await matchGroupAlarmeService(data) // ajustar codigo desse service para selecionar grupo de atuação e plantonista
    
    if(groupsSelected.length === 0){
        //implementar vocalizacaoHistoryTems sem plantonistas disponiveis
        return null
    }

    if(!!groupsSelected){
        //implementar vocalizacaoHistoryTems com plantonistas disponiveis
        await callTemsService({}) // substituir {} pelo objeto correto
        return null
    }
}

export default vocalizacaoTemsService