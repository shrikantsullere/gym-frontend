import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Define default credentials for each role
  const roleCredentials = {

   superadmin: {
      email: "superadmin@fit.com",
      password: "superadmin123",
      redirect: "/superadmin/dashboard",
    },

    admin: {
      email: "admin@fit.com",
      password: "admin123",
      redirect: "/admin/dashboard",
    },
    generaltrainer: {
      email: "trainer@fit.com",
      password: "trainer123",
      redirect: "/generaltrainer/dashboard",
    },
    personaltrainer: {
      email: "ptrainer@fit.com",
      password: "ptrainer123",
      redirect: "/personaltrainer/dashboard",
    },
    member: {
      email: "member@fit.com",
      password: "member123",
      redirect: "/member/dashboard",
    },
    housekeeping: {
      email: "house@fit.com",
      password: "house123",
      redirect: "/housekeeping/dashboard",
    },
    receptionist: {
      email: "reception@fit.com",
      password: "reception123",
      redirect: "/receptionist/dashboard",
    },

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check which role matches
    const matchedRole = Object.values(roleCredentials).find(
      (role) => role.email === email && role.password === password
    );
    if (matchedRole) {
      // Save role and email in localStorage or context if needed
      localStorage.setItem("userRole", Object.keys(roleCredentials).find(
        key => roleCredentials[key].email === email
      ));
      localStorage.setItem("userEmail", email);
      // Redirect based on role
      navigate(matchedRole.redirect);
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
      <div className="card shadow w-100" style={{ maxWidth: "950px", borderRadius: "1.5rem" }}>
        <div className="row g-0">
          {/* Image Column */}
          <div className="col-md-6 d-none d-md-block">
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/muscular-man-doing-pushup-exercise-with-dumbbell-royalty-free-image-1728661212.jpg?crop=0.668xw:1.00xh;0.00680xw,0&resize=640:*"
              alt="login"
              className="img-fluid rounded-start"
              style={{ height: "100%", objectFit: "cover" }}
            />
          </div>
          {/* Form Column */}
          <div className="col-md-6 d-flex align-items-center p-5">
            <div className="w-100">
              <h2 className="fw-bold mb-3 text-center">Welcome Back!</h2>
              <p className="text-muted text-center mb-4">Please login to your account</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 position-relative">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ paddingRight: "40px" }}
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y pe-3"
                      style={{ cursor: "pointer", zIndex: 10 }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <i className="bi bi-eye-slash-fill"></i>
                      ) : (
                        <i className="bi bi-eye-fill"></i>
                      )}
                    </span>
                  </div>
                </div>
                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="remember" />
                    <label className="form-check-label" htmlFor="remember">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-decoration-none small">
                    Forgot Password?
                  </a>
                </div>
                <button type="submit" className="btn btn-warning w-100 py-2">
                  Login
                </button>
              </form>
              {/* Test Credentials Info (Optional - for demo only) */}
              <div className="mt-4 p-3 bg-light rounded small">
                <strong>Test Credentials:</strong>
                <ul className="mb-0">
                  {Object.entries(roleCredentials).map(([role, cred]) => (
                    <li key={role}>
                      <strong>{role}:</strong> {cred.email} / {cred.password}
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;