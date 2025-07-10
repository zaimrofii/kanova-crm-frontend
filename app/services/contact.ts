// 📁 services/contact.ts
import axios from "axios";
import { Contact } from "../types";

const BASE_URL = "http://localhost:8000/api/contacts";

export const fetchContacts = async (): Promise<Contact[]> => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const fetchContactById = async (id: string): Promise<Contact> => {
  const res = await axios.get(`${BASE_URL}/${id}/`);
  return res.data;
};

export const searchContacts = async (query: string): Promise<Contact[]> => {
  const res = await axios.get(`${BASE_URL}/?search=${query}`);
  return res.data;
};

export const fetchCustomers = async (): Promise<Contact[]> => {
  const res = await axios.get(`${BASE_URL}/?search=Customer`);
  return res.data;
};

export const fetchByDate = async (range: string): Promise<Contact[]> => {
  const res = await axios.get(`${BASE_URL}/?range=${range}`);
  return res.data;
};

export const deleteContact = async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}/`);
};

export const updateContact = async (id: string, data: Partial<Contact>) => {
  await axios.put(`${BASE_URL}/${id}/`, data);
};

export const createContact = async (data: Partial<Contact>) => {
  const res = await axios.post(BASE_URL + "/", data);
  return res.data;
};
