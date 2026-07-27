import API from "../../../../api/axios";

export const getTopSellingMedicines=async()=>{
    const response=await API.get("/pharmacist/dashboard/top-selling-medicines");
    return response.data;
}