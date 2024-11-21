import React, { useState } from "react";
import OtpForm from "@/components/auth/otpForm";
import { useDispatch } from "react-redux";
import { verifyUser } from "@/store/auth-slice";

import { useToast } from "@/hooks/use-toast";
const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { toast } = useToast();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(typeof otp);
    dispatch(verifyUser(otp.toString()))
      .then((data) => {
        console.log(data);
        if (data.payload.success) {
          //do something
        }
      })
      .catch((error) => {
        toast({
          title: `${error.message} `,
        });
      });
  };
  return (
    <div className=" w-5/12 text-center ">
      <div className="w-full flex text-center">
        <h1 className="font-[600] text-[30px] w-full">
          Verify Your OTP Thanks!
        </h1>
      </div>
      <div className="h-full flex items-center justify-center">
        <OtpForm
          otp={otp}
          setOtp={setOtp}
          handleOtpSubmit={handleSubmit}
          buttonText={"Verify OTP"}
        />
      </div>
    </div>
  );
};

export default VerifyEmail;
