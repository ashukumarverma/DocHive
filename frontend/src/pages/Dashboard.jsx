import DocCard from "../components/DocCard";

const Dashboard = () => {
  return (
    <div className="container mt-5 position-relative">
      <h3>Dashboard</h3>
      <div className="d-flex flex-wrap gap-3">
        <DocCard />
        <DocCard />
        <DocCard />
      </div>
      <button className="btn btn-outline-dark mt-3 ">
        Create new Document
      </button>
    </div>
  );
};

export default Dashboard;
