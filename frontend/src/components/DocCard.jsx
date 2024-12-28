import PropTypes from 'prop-types';

const DocCard = ({ title, content, createdAt }) => {
  return (
    <div className="card" style={{ width: "20rem" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          {content}
        </h6>
        <p className="card-text">
          created at : {createdAt}
        </p>
        <a href="#" className="card-link btn btn-outline-dark">
          Open
        </a>
      </div>
    </div>
  );
};

DocCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  createdAt: PropTypes.string
};

export default DocCard;
