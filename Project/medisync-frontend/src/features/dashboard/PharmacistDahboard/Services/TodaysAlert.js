import API from "../../../../api/axios";

export const getTodaysAlerts=async()=>{
    const response=await API.get("/alerts/system");
    return response.data;
}