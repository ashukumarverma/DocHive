import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Variants for form and image transitions
  const formVariants = {
    hidden: { opacity: 0, x: 100 }, // Form starts off-screen to the right
    visible: { opacity: 1, x: 0 }, // Form slides into view
    exit: { opacity: 0, x: -100 }, // Form slides out to the left
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -100 }, // Image starts off-screen to the left
    visible: { opacity: 1, x: 0 }, // Image slides into view
    exit: { opacity: 0, x: 100 }, // Image slides out to the right
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );
      localStorage.setItem("token", data.token);
      navigate("/"); // Redirect to login if registration is successful
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Set error message if registration fails
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
      console.log(error);
    }
  };

  return (
    <section className="vh-100 pt-3">
      <div className="container-fluid h-custom">
        <div className="row d-flex flex-wrap justify-content-center align-items-center h-100">
          {/* Form with animation */}
          <motion.div
            className="col-md-8 col-lg-6 col-xl-4 offset-xl-1"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleRegister}>
              {/* Name input */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="name"
                  value={name}
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              {/* Email input */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  value={email}
                  placeholder="Enter a valid email address"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {/* Password input */}
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <motion.button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Register
                </motion.button>
                {error && <p className="text-danger mt-3">{error}</p>}{/* Display error message */}
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account?{" "}
                  <a href="/login" className="link-primary">
                    Login
                  </a>
                </p>
              </div>
            </form>
          </motion.div>

          {/* Image with animation */}
          <motion.div
            className="col-md-9 col-lg-6 col-xl-5"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Register;
