import API from "../../../api/axios";

export const addStock = async (stockData) => {
    const response = await API.post("/stocks", stockData);
    return response.data;
};

export const getAllStocks = async () => {
    const response = await API.get("/stocks");
    return response.data;
};