import type { DataProvider } from "@refinedev/core";
import { axiosInstance } from "./axiosInstance";

const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

const mapId = (item: any) => ({
  ...item,
  id: item._id ?? item.id,
});

function toFormData(values: Record<string, any>): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined || value === null) continue;
    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((v) =>
        formData.append(key, v instanceof File ? v : String(v))
      );
    } else if (typeof value === "boolean") {
      formData.append(key, value ? "true" : "false");
    } else {
      formData.append(key, String(value));
    }
  }
  return formData;
}

export const dataProvider: DataProvider = {
  getList: async ({ resource }) => {
    const { data } = await axiosInstance.get(`${API_URL}/${resource}`);
    const list = Array.isArray(data) ? data : data.data ?? [];
    return {
      data: list.map(mapId),
      total: list.length,
    };
  },

  getOne: async ({ resource, id }) => {
    const { data } = await axiosInstance.get(`${API_URL}/${resource}/${id}`);
    const item = data.data ?? data;
    return { data: mapId(item) };
  },

  create: async ({ resource, variables }) => {
    const formData = toFormData(variables as Record<string, any>);
    const { data } = await axiosInstance.post(
      `${API_URL}/${resource}`,
      formData
    );
    const item = data.data ?? data;
    return { data: mapId(item) };
  },

  update: async ({ resource, id, variables }) => {
    const formData = toFormData(variables as Record<string, any>);
    const { data } = await axiosInstance.put(
      `${API_URL}/${resource}/${id}`,
      formData
    );
    const item = data.data ?? data;
    return { data: mapId(item) };
  },

  deleteOne: async ({ resource, id }) => {
    const { data } = await axiosInstance.delete(
      `${API_URL}/${resource}/${id}`
    );
    return { data: data.data ?? data };
  },

  getApiUrl: () => API_URL,
};
