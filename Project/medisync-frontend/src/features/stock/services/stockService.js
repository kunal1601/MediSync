import API from "../../../api/axios";

export const addStock = async (stockData) => {
    const response = await API.post("/stocks", stockData);
    return response.data;
};