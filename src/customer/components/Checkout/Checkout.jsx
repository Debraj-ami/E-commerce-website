import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import DeliveryAddressForm from "./DeliveryAddressForm";
import OrderSummary from "./OrderSummary";

const steps = ["Login", "Delivery Address", "Order Summary", "Payment"];

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const querySearch = new URLSearchParams(location.search);
  const step = (Number(querySearch.get("step")) || 1) - 1;

  const handleNext = () => {
    navigate(`/checkout?step=${step + 2}`);
  };

  const handleBack = () => {
    navigate(`/checkout?step=${step}`);
  };

  return (
    <div className="px-10 lg:px-20">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={step}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {step === steps.length ? (
            
          <Typography sx={{ mt: 2 }}>
            All steps completed – you&apos;re finished
          </Typography>
        ) : (
          <>
            <Typography sx={{ mt: 2 }}>
              Step {step + 1}
            </Typography>

            <Box sx={{ display: "flex", pt: 2 }}>
              <Button
                color="inherit"
                disabled={step === 0}
                onClick={handleBack}
              >
                Back
              </Button>

              {/* <Box sx={{ flex: "1 1 auto" }} /> */}

              {/* <Button onClick={handleNext}>
                {step === steps.length - 1 ? "Finish" : "Next"}
              </Button> */}
            </Box>
            <div className="mt-10">
                {step==2?<OrderSummary/>:<DeliveryAddressForm/>}
            </div>
          </>
        )}
      </Box>
      
    </div>
  );
}