import React, { useState, FormEvent, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/post";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({
        username,
        email,
        password,
      });
      navigate("/");
    } catch (error: any) {
      console.error("Registration error", error);
      alert("Registration failed");
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
      aria-label="Registration Page"
    >
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleRegister}
        aria-labelledby="registerTitle"
      >
        <h2 id="registerTitle" className="text-2xl mb-4 text-center">
          Register
        </h2>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full border border-gray-300 p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-required="true"
            aria-describedby="usernameHelp"
          />
          <p id="usernameHelp" className="text-sm text-gray-500">
            Your username must be unique and contain only letters or numbers.
          </p>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
            aria-describedby="emailHelp"
          />
          <p id="emailHelp" className="text-sm text-gray-500">
            Enter a valid email address, such as user@example.com.
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
            aria-describedby="passwordHelp"
          />
          <p id="passwordHelp" className="text-sm text-gray-500">
            Your password must be at least 8 characters long.
          </p>
        </div>
        <Button type="submit" variant="success" ariaLabel="Register">
          Register
        </Button>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
