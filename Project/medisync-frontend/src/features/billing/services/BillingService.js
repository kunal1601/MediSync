import API from "../../../api/axios"; 

export const getMedicinesForBilling = async () => {
    const response = await API.get("/billing/medicines");
    return response.data;
};  

export const createInvoice = async (data) => {
    const response = await API.post("/billing/invoice", data);
    return response.data;
};

export const getInvoiceHistory = async () => {
    const response = await API.get("/billing/invoices");
    return response.data;
};
export const getInvoiceDetails = async (invoiceNumber) => {
  const response = await API.get(`/billing/invoice/${invoiceNumber}`);
  return response.data;
};