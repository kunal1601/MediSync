import API from "../../../../api/axios";

export const getDailySales = async (date) => {
    const response = await API.get(
        `/pharmacist/dashboard/daily-sales?date=${date}`
    );
    return response.data;
};