import React from "react";
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from "react-router-dom";
const OrderCard = () => {
  const navigate=useNavigate();
  return (
    <div 
    onClick={()=> navigate(`/account/order/${5}`)}
      className="p-5 shadow-md shadow-black hover:shadow-2xl border"
      style={{
        width: "100%",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "16px",
    
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      {/* PRODUCT */}
      <div className="flex cursor-pointer" style={{ flex: 3, display: "flex", gap: "16px" }}>
        <img
          src="https://rukminim1.flixcart.com/image/612/612/kpodocw0/t-shirt/x/o/4/xl-wr-64-wrodss-original-imag3upwgq9n9fbv.jpeg?q=70"
          alt=""
          style={{
            width: "5rem",
            height: "5rem",
            objectFit: "cover",
          }}
        />

        <div>
          <p>Men Solid Cotton Blend Straight Kurta</p>
          <p style={{ fontSize: "12px", opacity: 0.6 }}>Size: M</p>
          <p style={{ fontSize: "12px", opacity: 0.6 }}>Color: Black</p>
        </div>
      </div>

      {/* PRICE */}
      <div style={{ flex: 1, fontWeight: 600 }}>₹199</div>

      
      {/* STATUS */}
<div className="flex cursor-pointer" style={{ flex: 2, fontSize: "14px" }}>
  {true && (
    <div>
      <p style={{ display: "flex", alignItems: "center" }}>
        <AdjustIcon
          sx={{
            width: "15px",
            height: "15px",
            color: "green",   // ✅ ONLY ICON IS GREEN
            mr: 1,
          }}
        />
        <span>Delivered On March 03</span>
      </p>

      <p className="text-xs">
        Your Item Has Been Delivered
      </p>
    </div>
  )}

  {false && (
    <p>Expected Delivery On March 03</p>
  )}
</div>
    </div>
  );
};

export default OrderCard;