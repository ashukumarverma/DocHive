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
