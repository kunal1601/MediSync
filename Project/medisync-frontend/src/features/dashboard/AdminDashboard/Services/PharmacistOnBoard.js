import API from "../../../../api/axios";
// Admin Income Growth
export const getPharmacistOnBoard = async (id) => {
  const response = await API.get(
    `/admin/dashboard/pharmacist/${id}`
  );
  return response.data;
}

export const getAllPharmacists = async () => {
    const response = await API.get("/admin/dashboard/pharmacists");
    return response.data;
};

