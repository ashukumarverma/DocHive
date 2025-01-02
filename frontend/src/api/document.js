import axiosInstance from "./axiosInstance";

export const fetchAllDocuments = async () => {
  try {
    const response = await axiosInstance.get("/documents");
    return response.data; // Return the documents
  } catch (error) {
    console.error(
      "Error fetching documents:",
      error.response?.data?.message || error.message
    );
    throw error; // Re-throw the error to handle it in the component
  }
};

export const getDocumentById = async (id) => {
  try {
    const response = await axiosInstance.get(`/documents/${id}`);
    return response.data; // Return the document
  } catch (error) {
    console.error(
      "Error fetching document:",
      error.response?.data?.message || error.message
    );
    throw error; // Re-throw the error to handle it in the component
  }
};

export const updateDocument = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/documents/${id}`, data);
    return response.data; // Return the updated document
  } catch (error) {
    console.error(
      "Error updating document:",
      error.response?.data?.message || error.message
    );
    throw error; // Re-throw the error to handle it in the component
  }
};

export const searchedDocuments = async (query) => {
  try {
    const response = await axiosInstance.get(`/search?query=${query}`);
    return response.data; // Return the documents
  } catch (error) {
    console.error(
      "Error fetching documents:",
      error.response?.data?.message || error.message
    );
    throw error; // Re-throw the error to handle it in the component
  }
};

export const createDocument = async (data) => {
  try {
    const response = await axiosInstance.post("/documents", data);
    return response.data; // Return the created document
  } catch (error) {
    console.error(
      "Error creating document:",
      error.response?.data?.message || error.message
    );
    throw error; // Re-throw the error to handle it in the component
  }
};

export const deleteDocument = async (id) => {
  try {
    const response = await axiosInstance.delete(`/documents/${id}`);
    return response.data; // Return the deleted document
  } catch (error) {
    console.error(
      "Error deleting document:",
      error.response?.data?.message || error.message
    );
    throw error; // Re-throw the error to handle it in the component
  }
};

export const shareDocument = async (id) => { 
  try {
    const response = await axiosInstance.post(`/documents/share/${id}`);
    return response.data; // Return the shared document link
  }catch (error) {
    console.error(
      "Error sharing document:",
      error.response?.data?.message || error.message
    );
    throw error; // Re-throw the error to handle it in the component
  }
};

export const getSharedDocument = async (id) => {
  try {
    const response = await axiosInstance.get(`/documents/shared/${id}`);
    return response.data; // Return the shared document
  } catch (error) {
    console.error(
      "Error fetching shared document:",
      error.response?.data?.message || error.message
    );
    throw error; // Re-throw the error to handle it in the component
  }
};

export const getAllSharedDocuments = async () => { 
  try {
    const response = await axiosInstance.get(`/documents/shared`);
    return response.data; // Return the shared documents
  } catch (error) {
    console.error(
      "Error fetching all shared documents:",
      error.response?.data?.message || error.message
    );
    throw error; // Re-throw the error to handle it in the component
  }
}