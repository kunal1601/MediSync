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
export const addInventoryLoss = async (loss) => {
    console.log(localStorage.getItem("token"));
    const response = await API.post(
        "/stocks/invLoss",
        loss
    );

    return response.data;
};