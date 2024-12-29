import { useEffect, useState } from "react";
import DocCard from "../components/DocCard";
import { fetchAllDocuments, searchedDocuments } from "../api/document";
import DocumentForm from "../components/DocumentForm";

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null); // For editing

  const handleSearch = async () => {
    if (searchQuery === null) return fetchAllDocuments();
    try {
      const docs = await searchedDocuments(searchQuery); // Call the API to fetch documents
      setDocuments(docs); // Update state with fetched documents
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch documents");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docs = await fetchAllDocuments(); // Call the API to fetch documents
        setDocuments(docs); // Update state with fetched documents
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch documents");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, []);

  // const openForm = (document = null) => {
  //   setCurrentDocument(document); // If editing, pass the document
  //   setShowForm(true);
  // };

  if (loading) return <p>Loading documents...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container position-relative mt-3 mb-5">
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
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
          <button onClick={handleSearch} className="btn btn-primary">
            search
          </button>
        </div>
      </div>

      <div className="w-90">
        {documents.length === 0 ? (
          <p>No documents found</p>
        ) : (
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            {documents.map((doc) => (
              <div key={doc._id}>
                <DocCard
                  title={doc.title}
                  content={doc.content}
                  createdAt={doc.createdAt}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {showForm && (
        <DocumentForm
          onClose={() => {
            setShowForm(false);
            handleSearch();
          }}
          document={currentDocument}
        />
      )}
    </div>
  );
};

export default Dashboard;
