import { Alert, AlertTitle, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getOrderById } from "State/Order/Action";
import { updatePayment } from "State/Payment/Action";

import OrderTracker from "../Order/OrderTracker";
import AddressCard from "../AddressCard/AddressCard";

const PaymentSuccess = () => {

  const [paymentId, setPaymentId] = useState();
  const [paymentStatus, setPaymentStatus] = useState();
  const [paymentUpdated, setPaymentUpdated] = useState(false);

  const { orderId } = useParams();

  const dispatch = useDispatch();

  const { order } = useSelector((store) => store);

  console.log("order ",order.order)

  // GET URL PARAMS
  useEffect(() => {

    const urlParam = new URLSearchParams(window.location.search);

   setPaymentId(urlParam.get("razorpay_payment_id"));

    setPaymentStatus(
      urlParam.get("razorpay_payment_link_status")
    );

  }, []);

  // UPDATE PAYMENT + FETCH ORDER
useEffect(() => {

  if (orderId && paymentId && !paymentUpdated) {

    const data = {
      orderId,
      paymentId,
    };

    dispatch(updatePayment(data));

    dispatch(getOrderById(orderId));

    setPaymentUpdated(true);

  }

}, [orderId, paymentId, paymentUpdated, dispatch]);

  return (

    <div className="px-2 lg:px-36">

      {/* SUCCESS ALERT */}
      <div className="flex flex-col justify-center items-center">

        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 6, width: "fit-content" }}
        >

          <AlertTitle>
            Payment Success
          </AlertTitle>

          Congratulations Your Order Has Been Placed

        </Alert>

      </div>

      {/* ORDER TRACKER */}
      <OrderTracker activeStep={1} />

      {/* ORDER ITEMS */}
      <Grid
        container
        spacing={3}
        className="py-5 pt-20"
      >

        {order?.order?.orderItems?.map((item, index) => (

          <Grid
            container
            item
            xs={12}
            key={index}
            className="shadow-xl rounded-md p-5"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >

            {/* PRODUCT */}
            <Grid item xs={12} lg={6}>

              <div className="flex items-center">

                <img
  className="w-[5rem] h-[5rem] object-cover object-top rounded-md"
  src={
    item?.product?.imageUrl ||
    "https://via.placeholder.com/150"
  }
  alt={item?.product?.title}
/>

                <div className="ml-5 space-y-2">

                  <p className="font-semibold">
                    {item?.product?.title}
                  </p>

                  <div className="opacity-50 text-xs font-semibold space-x-5">

                    <span>
                      Color: {item?.color}
                    </span>

                    <span>
                      Size: {item?.size}
                    </span>

                  </div>

                  <p>
                    Seller : {item?.product?.brand}
                  </p>

                  <p className="font-semibold">
                    ₹ {item?.price}
                  </p>

                </div>

              </div>

            </Grid>

            {/* ADDRESS */}
            <Grid item xs={12} lg={4}>

              <AddressCard
                address={order?.order?.shippingAddress}
              />

            </Grid>

          </Grid>

        ))}

      </Grid>

    </div>
  );
};

export default PaymentSuccess;