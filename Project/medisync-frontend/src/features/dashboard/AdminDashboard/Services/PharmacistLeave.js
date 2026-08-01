import API from "../../../../api/axios";

export const getLeavesByDate = async (date) => {
    const response = await API.get(
        `/admin/dashboard/calendar/leaves?date=${date}`
    );
    return response.data;
};

export const getLeaveDates = async (year, month) => {
    const response = await API.get(
        `/admin/dashboard/calendar/leave-dates?year=${year}&month=${month}`
    );
    return response.data;
};
