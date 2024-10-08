"use client";

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axiosInstance from "../../../axiosinstance";
import { setCookie } from "nookies";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email || !password) {
      setError("Email and Password are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        const response = await axiosInstance.post("/api/login", {
          email,
          password,
        });

        const { token, user } = response.data;
        console.log("response", response);

        if (token) {
          setLoading(false);
          setCookie(null, "token", token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            httpOnly: false,
          });
          router.push("/");
        } else {
          setError(data.message || "Invalid email or password.");
        }
      } catch (err) {
        setLoading(false);
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Container component="main" maxWidth="xs">
        <Box
          className="p-8 bg-white shadow-md rounded-lg"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            color="black"
            className="mb-4"
          >
            Sign In
          </Typography>

          <form noValidate onSubmit={handleSignIn}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              className="mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              className="mb-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography color="error" className="my-4">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="mb-4"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
