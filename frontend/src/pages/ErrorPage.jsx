import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-3 text-danger">404</h1>
      <p className="lead">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary mt-4">
        Go Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
