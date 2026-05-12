import React, { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { Button } from "@mui/material";
import CartItem from "../Cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getOrderById } from "State/Order/Action";
import { createPayment } from "State/Payment/Action";

const OrderSummary = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const { order } = useSelector((store) => store);

  // extracting order_id from URL
  const searchParams = new URLSearchParams(location.search);

  const orderId = searchParams.get("order_id");

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId]);

  const handleCheckout=()=>{
    dispatch(createPayment(orderId))
  }

  return (
    <div>
      {/* ADDRESS SECTION */}
      <div className="p-5 shadow-lg rounded-s-md border">
        <AddressCard address={order?.order?.shippingAddress} />
      </div>

      <div>
        <div className="lg:grid grid-cols-3 lg:px-16 relative">
          {/* LEFT SIDE */}
          <div className="col-span-2 space-y-5">
            {order?.order?.orderItems?.map((item) => (
              <CartItem
  key={item.id}
  item={item}
  hideButton={true}
/>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
            <div className="border p-5 rounded-md shadow-md">
              <p className="uppercase font-bold opacity-60 pb-4">
                Price Details
              </p>

              <hr />

              <div className="space-y-3 font-semibold mb-10">
                <div className="flex justify-between pt-3 text-black">
                  <span>Price</span>
                  <span>₹{order?.order?.totalPrice}</span>
                </div>

                <div className="flex justify-between pt-3 text-green-600">
                  <span>Discounts</span>
                  <span>-₹{order?.order?.discount}</span>
                </div>

                <div className="flex justify-between pt-3">
                  <span>Delivery Charge</span>
                  <span className="text-green-600">Free</span>
                </div>

                <div className="flex justify-between pt-3">
                  <span>Total Amount</span>
                  <span className="text-green-600 font-bold">
                    ₹{order?.order?.totalDiscountedPrice}
                  </span>
                </div>

                
              </div>

              <Button
                variant="contained"
                className="w-full mt-5"
                sx={{
                  p: "2.5rem",
                  py: "0.7rem",
                  bgcolor: "#9155fd",
                }}
                onClick={handleCheckout}
              >
                CHECKOUT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
