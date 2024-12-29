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
}

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