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

const Home = () => {
  const [carModel, setCarModel] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [maxPictures, setMaxPictures] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState("");

  // Cities array
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pictures.length > maxPictures) {
      setError(`You cannot upload more than ${maxPictures} pictures.`);
      return;
    }

    const carDetails = {
      carModel,
      price,
      phoneNumber,
      city,
      pictures,
    };

    console.log("Car details submitted: ", carDetails);
    alert("Car details submitted!");
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
              {[1, 2, 3, 4, 5].map((num) => (
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
