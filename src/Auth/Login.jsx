// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../src/Api/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const roleRedirectMap = {
    SUPERADMIN: "/superadmin/dashboard",
    ADMIN: "/admin/admin-dashboard",
    GENERALTRAINER: "/generaltrainer/dashboard",
    PERSONALTRAINER: "/personaltrainer/dashboard",
    MEMBER: "/member/dashboard",
    HOUSEKEEPING: "/housekeeping/dashboard",
    RECEPTIONIST: "/receptionist/dashboard",
  };

  // Dummy user data for non-superadmin roles (DEV ONLY)
  const dummyUsers = {
    ADMIN: { id: 101, email: "admin@fit.com", role: "ADMIN" },
    GENERALTRAINER: { id: 102, email: "trainer@fit.com", role: "GENERALTRAINER" },
    PERSONALTRAINER: { id: 103, email: "ptrainer@fit.com", role: "PERSONALTRAINER" },
    MEMBER: { id: 104, email: "member@fit.com", role: "MEMBER" },
    HOUSEKEEPING: { id: 105, email: "house@fit.com", role: "HOUSEKEEPING" },
    RECEPTIONIST: { id: 106, email: "reception@fit.com", role: "RECEPTIONIST" },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Special case: ONLY superadmin uses real API
    if (email === "superadmin@example.com" && password === "superadmin123") {
      try {
        const response = await axiosInstance.post("/auth/login", { email, password });
        const { token, user } = response.data;

        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userId", user.id);

        navigate(roleRedirectMap[user.role] || "/");
      } catch (error) {
        alert("Superadmin login failed: " + (error.response?.data?.message || "Check network or credentials"));
      } finally {
        setLoading(false);
      }
      return;
    }

    // 🔁 For ALL other roles: simulate login (NO API CALL)
    const matchedRole = Object.values(dummyUsers).find(
      (user) => user.email === email && password === "123456"
    );

    if (matchedRole) {
      // Use a fake but consistent token for dev
      const fakeToken = `dev_fake_token_${matchedRole.role.toLowerCase()}_${Date.now()}`;

      localStorage.setItem("authToken", fakeToken);
      localStorage.setItem("userRole", matchedRole.role);
      localStorage.setItem("userEmail", matchedRole.email);
      localStorage.setItem("userId", matchedRole.id);

      navigate(roleRedirectMap[matchedRole.role] || "/");
    } else {
      alert("Invalid credentials.\n\nFor dev testing:\n- Superadmin: superadmin@example.com / superadmin123\n- Others: use email from buttons + password '123456'");
    }

    setLoading(false);
  };

  // Auto-fill for any role
  const autoFill = (role) => {
    if (role === "SUPERADMIN") {
      setEmail("superadmin@example.com");
      setPassword("superadmin123");
    } else {
      const user = dummyUsers[role];
      if (user) {
        setEmail(user.email);
        setPassword("123456"); // universal dev password
      }
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
      <div className="card shadow w-100" style={{ maxWidth: "950px", borderRadius: "1.5rem" }}>
        <div className="row g-0">
          <div className="col-md-6 d-none d-md-block">
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/muscular-man-doing-pushup-exercise-with-dumbbell-royalty-free-image-1728661212.jpg?crop=0.668xw:1.00xh;0.00680xw,0&resize=640:*"
              alt="login"
              className="img-fluid rounded-start"
              style={{ height: "100%", objectFit: "cover" }}
            />
          </div>

          <div className="col-md-6 d-flex align-items-center p-5">
            <div className="w-100">
              <h2 className="fw-bold mb-3 text-center">Welcome Back!</h2>
              <p className="text-muted text-center mb-4">Please login to your account</p>

              {/* Quick-fill buttons for ALL roles */}
              <div className="mb-4">
                <p className="mb-2"><strong>Quick Login (Dev Mode):</strong></p>
                <div className="d-flex flex-wrap gap-2">
                  {Object.keys(roleRedirectMap).map((role) => (
                    <button
                      key={role}
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => autoFill(role)}
                    >
                      {role.replace(/([A-Z])/g, " $1").trim()}
                    </button>
                  ))}
                </div>
             
              </div>

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
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y pe-3"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer", zIndex: 10 }}
                    >
                      {showPassword ? (
                        <i className="bi bi-eye-slash-fill"></i>
                      ) : (
                        <i className="bi bi-eye-fill"></i>
                      )}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-warning w-100 py-2"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;