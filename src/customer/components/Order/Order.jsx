import React from "react";
import OrderCard from "./OrderCard";

const orderStatus = [
  { label: "On The Way", value: "on_the_way" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", value: "return" },
];

const Order = () => {
  return (
    <div className="px:5 lg:px-20" style={{ display: "flex", gap: "24px", width: "100%" }}>
      {/* FILTER */}
      <div style={{ width: "260px", flexShrink: 0 }}>
        <div className="h-auto shadow-lg bg-white p-5 sticky top-5">
          <h1 className="font-bold text-lg">Filter</h1>

          <div className="space-y-4 mt-10">
            <h1 className="font-semibold">ORDER STATUS</h1>
            {orderStatus.map((option) => (
              <div className="flex items-center" key={option.value}>
                <input type="checkbox" />
                <label className="ml-3 text-sm text-gray-600">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ORDER LIST (FULL REMAINING WIDTH) */}
      <div className="space-y-5" style={{paddingLeft: "24px",paddingRight: "40px", flex: 1 }}>
        {[1,1,1,1,1,1].map((item)=> <OrderCard/>)}
        
      </div>
    </div>
  );
};

export default Order;