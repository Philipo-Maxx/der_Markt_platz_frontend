import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { ClipLoader } from "react-spinners";
const OtpForm = ({ otp, setOtp, handleOtpSubmit, buttonText }) => {
  const handleChange = (otpValue) => {
    setOtp(otpValue);
  };
  //   const handleOtpSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(otp);
  //   };
  return (
    <div>
      <p className="mb-3">Enter the otp sent to your email address</p>
      <form
        className="flex flex-col justify-center gap-3"
        onSubmit={handleOtpSubmit}
      >
        <OTPInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          shouldAutoFocus
          inputType="number"
          renderInput={(props) => <input {...props} />}
          containerStyle={{
            display: "flex",
            gap: "1rem",
          }}
          inputStyle={{
            height: "3.0rem",
            width: "3.0rem",
            fontSize: "2rem",
            borderRadius: "5px",
            border: "1px solid #61459E",
          }}
        />
        <button
          className="rounded-lg py-2 h-[40px] bg-[#967AD1] hover:bg-[#61459E] text-white transition duration-[500] ease-in"
          //disabled={loading}
        >
          {/* {loading ? <ClipLoader color="#61459e" /> : "Verify"} */}
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default OtpForm;
