import API from "../../../../api/axios";
export const getLoggedInPharmacist = async () => {
    const response = await API.get(
        "/pharmacist/dashboard/me",
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

    return response.data;
};