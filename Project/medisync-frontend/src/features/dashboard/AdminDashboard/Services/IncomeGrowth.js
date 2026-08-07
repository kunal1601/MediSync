import API from "../../../../api/axios";
// Admin Income Growth
export const getIncomeGrowth = async (period) => {
  const response = await API.get(
    `/admin/dashboard/income-growth?period=${period}`
  );
   console.log("Axios Response:", response);
  return response.data;
}