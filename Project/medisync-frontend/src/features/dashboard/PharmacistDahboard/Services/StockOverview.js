import API from "../../../../api/axios"; // adjust the path if API.js is in another folder

export const getStockOverview = async (filter) => {
    const response = await API.get("/stock-overview", {
        params: {
            filter
        }
    });

    return response.data;
};