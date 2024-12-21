const DocCard = () => {
  return (
    <div className="card" style={{ width: "20rem" }}>
      <div className="card-body">
        <h5 className="card-title">Document Title</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          Document subtitle
        </h6>
        <p className="card-text">
          created on : Date
        </p>
        <a href="#" className="card-link btn btn-outline-dark">
          Open
        </a>
      </div>
    </div>
  );
};

export default DocCard;
