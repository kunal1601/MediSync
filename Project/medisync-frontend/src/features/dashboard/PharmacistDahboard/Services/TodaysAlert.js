import API from "../../../../api/axios";

export const getTodaysAlerts=async()=>{
    const response=await API.get("/pharmacist/dashboard/alerts");
    return response.data;
}