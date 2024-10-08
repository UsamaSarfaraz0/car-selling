"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import { PhotoCamera, Close } from "@mui/icons-material";
import axiosInstance from "../axiosinstance";

const Home = () => {
  const [carModel, setCarModel] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [maxPictures, setMaxPictures] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"];

  const resetState = () => {
    setCarModel("");
    setPrice("");
    setPhoneNumber("");
    setMaxPictures(1);
    setPictures([]);
  };

  const handleImageSelection = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + pictures.length > maxPictures) {
      setError(`You can only select up to ${maxPictures} pictures.`);
    } else {
      setPictures((prev) => [...prev, ...files]);
      setError("");
    }
  };

  const handleRemoveImage = (index) => {
    setPictures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (carModel.length < 3) {
      setError("Car model must be at least 3 letters.");
      return;
    }

    if (phoneNumber.length !== 11) {
      setError("Phone number must be exactly 11 digits.");
      return;
    }

    if (pictures.length > maxPictures) {
      setError(`You cannot upload more than ${maxPictures} pictures.`);
      return;
    }

    if (pictures.length === 0) {
      setError("At least one picture is required.");
      return;
    }

    const userID = localStorage.getItem("userId");

    const formData = new FormData();
    formData.append("carModel", carModel);
    formData.append("price", price);
    formData.append("phoneNumber", phoneNumber);
    formData.append("city", city);
    formData.append("createdByUser", userID);

    pictures.forEach((picture, index) => {
      formData.append(`picture`, picture);
    });

    try {
      setLoading(true);
      const response = await axiosInstance.post(
        "/api/car/sellingpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      resetState();

      alert("Car details submitted!");
      console.log("response", response);
    } catch (err) {
      console.log("Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "white",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" gutterBottom color="gray">
            Sell Your Car
          </Typography>

          <TextField
            label="Car Model"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
            error={carModel.length > 0 && carModel.length < 3}
            helperText={
              carModel.length > 0 && carModel.length < 3
                ? "Car model must be at least 3 letters."
                : ""
            }
          />

          <TextField
            label="Price"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <TextField
            label="Phone Number"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={phoneNumber.length > 0 && phoneNumber.length !== 11}
            helperText={
              phoneNumber.length > 0 && phoneNumber.length !== 11
                ? "Phone number must be exactly 11 digits."
                : ""
            }
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>City</InputLabel>
            <Select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              label="City"
            >
              {cities.map((cityName) => (
                <MenuItem key={cityName} value={cityName}>
                  {cityName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Maximum Number of Pictures</InputLabel>
            <Select
              value={maxPictures}
              onChange={(e) => setMaxPictures(Number(e.target.value))}
              required
              label="Maximum Number of Pictures"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box display="flex" alignItems="center" mt={2}>
            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCamera />}
            >
              Upload Pictures
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={handleImageSelection}
              />
            </Button>
          </Box>

          <Box display="flex" gap={2} flexWrap="wrap" my={2}>
            {pictures.map((picture, index) => (
              <Box key={index} position="relative" display="inline-block">
                <img
                  src={URL.createObjectURL(picture)}
                  alt={`Selected ${index}`}
                  style={{ width: 80, height: 80, objectFit: "cover" }}
                />
                <IconButton
                  size="small"
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    backgroundColor: "red",
                    color: "white",
                  }}
                  onClick={() => handleRemoveImage(index)}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>

          {error && <Typography color="error">{error}</Typography>}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 4 }}
          >
            Submit Post
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
