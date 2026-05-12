import React from "react";
import { Button, Box, TextField } from "@mui/material";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch } from "react-redux";
import { createOrder } from "State/Order/Action";
import { useNavigate } from "react-router-dom";

const DeliveryAddressForm = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();



  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zip"),
      mobile: data.get("phoneNumber"),
    }

    const orderData={address,navigate}
    dispatch(createOrder(orderData))
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* LEFT SIDE */}
        <Box
          sx={{
            width: "40%",
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            boxShadow: 2,
            height: "30.5rem",
            overflowY: "auto",
            p: 2,
          }}
        >
          <AddressCard />
          <Button
            fullWidth
            sx={{ mt: 2, bgcolor: "rgb(145 85 253)" }}
            variant="contained"
          >
            Deliver Here
          </Button>
        </Box>

        {/* RIGHT SIDE FORM — CSS GRID */}
        <Box
          sx={{
            width: "60%",
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            boxShadow: 2,
            p: 3,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 3,
              }}
            >
              {/* First & Last Name */}
              <TextField required name="firstName" label="First Name *" />
              <TextField required name="lastName" label="Last Name *" />

              {/* Address — FULL WIDTH */}
              <Box sx={{ gridColumn: "1 / -1" }}>
                <TextField
                  required
                  name="address"
                  label="Address *"
                  fullWidth
                  multiline
                  rows={4}
                />
              </Box>

              {/* City & State */}
              <TextField required name="city" label="City *" />
              <TextField required name="state" label="State / Province *" />

              {/* Zip & Phone */}
              <TextField required name="zip" label="Zip / Postal Code *" />
              <TextField required name="phoneNumber" label="Phone Number *" />

              {/* BUTTON — LEFT SIDE, HALF WIDTH */}
              <Box sx={{ gridColumn: "1 / 2" }}>
                <Button
                  type="submit"
                  sx={{
                    py: 1.5,
                    bgcolor: "rgb(145 85 253)",
                    width: "50%",
                  }}
                  variant="contained"
                >
                  Deliver Here
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default DeliveryAddressForm;
