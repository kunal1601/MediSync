import API from "../../../../api/axios";
// Admin Profit Loss
export const getProfitLoss = async () => {
  const response = await API.get(
    `/admin/dashboard/profit-loss`
  );

  return response.data;
}