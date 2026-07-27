import API from "../../../../api/axios"; 
export const getDashboardStatistics=async()=>{
    const response=await API.get('/pharmacist/dashboard/statistics');
    return response.data;
}