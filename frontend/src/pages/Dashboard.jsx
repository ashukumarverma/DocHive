import { useEffect, useState } from "react";
import DocCard from "../components/DocCard";
import { fetchAllDocuments } from "../api/document";

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <p>Loading documents...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-5 position-relative">
      <h3>Dashboard</h3>

      <div className="d-flex flex-wrap gap-3">
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
      <button className="btn btn-outline-dark mt-3 ">
        Create new Document
      </button>
    </div>
  );
};

export default Dashboard;
