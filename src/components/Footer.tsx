import React, { Component } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

class Footer extends Component {
  render() {
    return (
      <Box
        component="footer"
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "40px 20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          textAlign: "left",
        }}
      >
        {/* Exclusive Section */}
        <Box sx={{ flex: "1 1 250px", marginBottom: "20px" }}>
          <Typography variant="h6" fontWeight="bold">
            Exclusive
          </Typography>
          <Typography variant="body2" sx={{ marginTop: "10px" }}>
            Get 10% off your first order
          </Typography>
          <Box sx={{ display: "flex", marginTop: "10px" }}>
            <TextField
              placeholder="Enter your email"
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root": { padding: "5px 10px" },
              }}
            />
            <Button
              variant="contained"
              sx={{ marginLeft: "10px", backgroundColor: "#ff9a40" }}
            >
              ➤
            </Button>
          </Box>
        </Box>

        {/* Support Section */}
        <Box sx={{ flex: "1 1 200px", marginBottom: "20px" }}>
          <Typography variant="h6" fontWeight="bold">
            Support
          </Typography>
          <Typography variant="body2">111 Bijoy Sarani, Dhaka</Typography>
          <Typography variant="body2">DH 1515, Bangladesh</Typography>
          <Typography variant="body2">exclusive@gmail.com</Typography>
          <Typography variant="body2">+88015-88888-9999</Typography>
        </Box>

        {/* Account Section */}
        <Box sx={{ flex: "1 1 150px", marginBottom: "20px" }}>
          <Typography variant="h6" fontWeight="bold">
            Account
          </Typography>
          <Typography variant="body2">My Account</Typography>
          <Typography variant="body2">Login / Register</Typography>
          <Typography variant="body2">Cart</Typography>
          <Typography variant="body2">Wishlist</Typography>
          <Typography variant="body2">Shop</Typography>
        </Box>

        {/* Quick Link Section */}
        <Box sx={{ flex: "1 1 150px", marginBottom: "20px" }}>
          <Typography variant="h6" fontWeight="bold">
            Quick Link
          </Typography>
          <Typography variant="body2">Privacy Policy</Typography>
          <Typography variant="body2">Terms Of Use</Typography>
          <Typography variant="body2">FAQ</Typography>
          <Typography variant="body2">Contact</Typography>
        </Box>

        {/* Download App Section */}
        <Box sx={{ flex: "1 1 200px", marginBottom: "20px" }}>
          <Typography variant="h6" fontWeight="bold">
            Download App
          </Typography>
          <Typography variant="body2">Save $3 with App New User Only</Typography>
          <Box sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <img src="qr-code.png" alt="QR Code" width="60px" />
            <Box>
              <img src="google-play.png" alt="Google Play" width="100px" />
              <img src="app-store.png" alt="App Store" width="100px" />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Footer;
