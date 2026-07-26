import API from "../../../../api/axios";

export const getTopSellingMedicines=async()=>{
    const response=await API.get("/top-selling-medicine");
    return response.data;
}