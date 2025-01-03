import { useEffect, useState } from "react";
import DocCard from "../components/DocCard";
import {
  fetchAllDocuments,
  searchedDocuments,
  deleteDocument,
  getAllSharedDocuments,
} from "../api/document";
import DocumentForm from "../components/DocumentForm";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [sharedDocuments, setSharedDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const docs = await searchedDocuments(searchQuery); // Call the API to fetch documents
      setDocuments(docs); // Update state with fetched documents
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch documents");
    }
  };

  const fetchData = async () => {
    try {
      const docs = await fetchAllDocuments(); // Call the API to fetch documents
      const sharedDocs = await getAllSharedDocuments();
      setDocuments(docs); // Update state with fetched documents
      setSharedDocuments(sharedDocs); // Update state with fetched all shared documents
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch documents");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 1000);
    }
  }, [documents.length, message]);

  const handleDelete = async (idToDelete) => {
    try {
      await deleteDocument(idToDelete);
      setMessage("Document deleted successfully!");
      fetchData();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  if (loading) return <p>Loading documents...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container position-relative mt-3 mb-5 min-vh-100">
      <div className="d-flex justify-content-between gap-4 align-items-center mb-4">
        <h3>Dashboard</h3>
        <div className="d-flex gap-3">
          <button
            onClick={() => {
              setShowForm(true);
            }}
            className="btn btn-outline-dark"
          >
            Create new Document
          </button>
          <input
            type="text"
            className="form-control form-control-lg w-50"
            value={searchQuery}
            placeholder="Search documents"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            required
          />
          <button onClick={handleSearch} className="btn btn-primary">
            search
          </button>
        </div>
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      <div className="w-90">
        <h4 className="bg-dark bg-opacity-10 rounded px-2 py-2">
          Your Documents
        </h4>
        {documents.length === 0 ? (
          <p>No documents found</p>
        ) : (
          <div className="d-flex flex-wrap gap-3 px-5 justify-content-center">
            {documents.map((doc) => {
              return (
                <div key={doc._id} className="">
                  <DocCard
                    id={doc._id}
                    title={doc.title}
                    content={doc.content}
                    createdAt={doc.createdAt}
                  />

                  <div className="d-flex gap-2 justify-content-between pt-1">
                    <button
                      className="card-link btn btn-outline-dark flex-fill"
                      onClick={() => navigate(`/document/${doc._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="card-link btn btn-outline-danger flex-fill"
                      onClick={() => {
                        handleDelete(doc._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {sharedDocuments.length > 0 && (
          <div className="mt-4">
            <h4 className="bg-dark bg-opacity-10 rounded px-2 py-2">
              Documents Shared with you
            </h4>
            <div className="d-flex flex-wrap gap-3 px-5 justify-content-center">
              {sharedDocuments.map((doc) => {
                return (
                  <div className="d-flex flex-column" key={doc._id}>
                    <DocCard
                      id={doc._id}
                      title={doc.title}
                      content={doc.content}
                      createdAt={doc.createdAt}
                    />
                    <button
                      className="card-link btn btn-outline-dark mt-2 flex-fill"
                      onClick={() => navigate(`/editor/shared/${doc._id}`)}
                    >
                      Edit
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {showForm && (
        <DocumentForm
          onClose={() => {
            setShowForm(false);
            handleSearch();
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
