import API from "../../../api/axios";

export const addStock = async (stockData) => {
    const response = await API.post("/stocks", stockData);
    return response.data;
};

export const getAllStocks = async (page = 0, size = 20) => {
    const response = await API.get("/stocks", {
        params: {
            page,
            size
        }
    });

    return response.data;
};