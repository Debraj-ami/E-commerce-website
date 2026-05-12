import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Grid, Box } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import StarIcon from "@mui/icons-material/Star";

const OrderDetails = () => {
  return (
    <div className="px-5 lg:px-20">
      <div>
        <h1 className="font-semibold text-xl py-7">Delivery Address</h1>
        <AddressCard />
      </div>

      <div className="py-20">
        <OrderTracker activeStep={3} />
      </div>

      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <Grid
            key={index}
            item
            xs={12}
            className="shadow-xl rounded-md p-5 border"
          >
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item xs={6}>
                <div className="flex items-center space-x-4">
                  <img
                    className="w-[5rem] h-[5rem] object-cover object-top"
                    src="https://rukminim1.flixcart.com/image/612/612/kpodocw0/t-shirt/x/o/4/xl-wr-64-wrodss-original-imag3upwgq9n9fbv.jpeg?q=70"
                    alt=""
                  />
                  <div className="space-y-2 ml-5">
                    <p className="font-semibold">
                      Men Solid Cotton Blend Straight Kurta
                    </p>
                    <p className="space-x-5 opacity-50 text-l font-semibold">
                      <span>Color: Black</span>
                      <span>Size: M</span>
                    </p>
                    <p>Seller: linaria</p>
                    <p>₹1099</p>
                  </div>
                </div>
              </Grid>

              <Grid item>
                <Box
                  sx={{
                    color: deepPurple[500],
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <StarIcon sx={{ fontSize: "2rem", mr: 1 }} />
                  <span>Rate and Review Product</span>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrderDetails;