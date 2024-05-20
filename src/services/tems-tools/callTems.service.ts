import createAlarmesHistoryTemsService from "../alarmesHistoryTems/createAlarmesHistoryTems.service";

const callTemsService = async (data:any) => {
    try {
        console.log("callTemsService",data)
        const alarme = await createAlarmesHistoryTemsService(data.alarme)
        
        return alarme
            
    } catch (error) {
        console.log("callTemsService_error: ",error)
    }
}

export default callTemsService