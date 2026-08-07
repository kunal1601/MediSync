import API from "../../../../api/axios";
// Admin Income Growth
export const getStockOverview = async (filter) => {
    const response = await API.get(
        `/admin/dashboard/stock-overview?filter=${filter}`
    );

    return response.data;
};