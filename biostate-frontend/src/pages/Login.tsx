import React, { useState, useContext, FormEvent, FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { authenticateUser } from "../api/post";
import Button from "../components/Button";

const Login: FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loginUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response: any = await authenticateUser({
        usernameOrEmail,
        password,
      });
      console.log("calling the login function");
      loginUser(response.data.access_token);
      navigate("/home");
    } catch (error: any) {
      console.error("Login error", error);
      alert("Invalid credentials");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      role="main"
      aria-label="Login Page"
    >
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleLogin}
        aria-labelledby="loginTitle"
      >
        <h2 id="loginTitle" className="text-2xl mb-4 text-center">
          Login
        </h2>
        <div className="mb-4">
          <label htmlFor="usernameOrEmail" className="block mb-1">
            Username or Email
          </label>
          <input
            type="text"
            id="usernameOrEmail"
            className="w-full border border-gray-300 p-2 rounded"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
            aria-required="true"
            aria-describedby="usernameOrEmailHelp"
          />
          <p id="usernameOrEmailHelp" className="text-sm text-gray-500">
            Please enter your username or email address.
          </p>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <Button type="submit" ariaLabel="Login">
          Login
        </Button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
