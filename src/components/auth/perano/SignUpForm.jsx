import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
//import { useSignUp } from "../../hooks/useSignUp";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";

const SignUpForm = () => {
  //const { loading, signUp } = useSignUp();
  const [showPassword, setShowPassword] = useState({ show: false });
  const [showConfirmPassword, setShowConfirmPassword] = useState({
    show: false,
  });
  const handleOnClickForPassword = () => {
    setShowPassword({ show: !showPassword.show });
  };

  const handleOnClickForConfirmPassword = () => {
    setShowConfirmPassword({ show: !showConfirmPassword.show });
  };

  const signUpSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Too short")
      .max(50, "Too long")
      .required("Fullname is required"),
    email: Yup.string().email().required("Email is required"),
    gender: Yup.string().required("gender is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,}$/,
        "Password must be at least 8 characters and include at least a letter and number"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });
  const signUpSubmitHandler = (values) => {
    console.log(values);
    signUp(values);
  };
  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
      }}
      onSubmit={signUpSubmitHandler}
      //passing the schema to the validationSchema prop
      validationSchema={signUpSchema}
      //validate the form on change
      validateOnChange={true}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-5 w-[70%]">
          <h1>Sign up to continue</h1>
          <div className="flex flex-col space-y-1 ">
            <label htmlFor="fullName">Fullname</label>

            <Field
              type="text"
              id="fullName"
              name="fullName"
              className={`border rounded ${
                errors.fullName && touched.fullName ? "border-red-500" : ""
              } ${
                touched.fullName && !errors.fullName ? "border-[#61459e]" : ""
              }`}
            />
            <ErrorMessage
              name="fullName"
              component="p"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              className={`border rounded ${
                errors.email && touched.email ? "border-red-500" : ""
              } ${touched.email && !errors.email ? "border-[#61459e]" : ""}`}
            />
            <ErrorMessage name="email" component="p" className="text-red-500" />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password">Password</label>
            <div className="flex w-full relative">
              <Field
                type={`${showPassword.show ? "text" : "password"}`}
                id="password"
                name="password"
                className={`w-full border rounded ${
                  errors.password && touched.password ? "border-red-500" : ""
                } ${
                  touched.password && !errors.password ? "border-[#61459e]" : ""
                }`}
              />
              {showPassword.show ? (
                <FaEyeSlash
                  className="absolute z-10 left-[500px] top-[4px] text-xl"
                  onClick={handleOnClickForPassword}
                />
              ) : (
                <FaEye
                  className="absolute z-10 left-[500px] top-[4px] text-xl"
                  onClick={handleOnClickForPassword}
                />
              )}
            </div>

            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="confirm-password">Confirm password</label>
            <div className="flex w-full relative">
              <Field
                type={`${showConfirmPassword.show ? "text" : "password"}`}
                id="confirmPassword"
                name="confirmPassword"
                className={`w-full border rounded ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "border-red-500"
                    : ""
                }${
                  touched.confirmPassword && !errors.confirmPassword
                    ? "border-[#61459e]"
                    : ""
                }`}
              />
              {showConfirmPassword.show ? (
                <FaEyeSlash
                  className="absolute z-10 left-[500px] top-[4px] text-xl"
                  onClick={handleOnClickForConfirmPassword}
                />
              ) : (
                <FaEye
                  className="absolute z-10 left-[500px] top-[4px] text-xl"
                  onClick={handleOnClickForConfirmPassword}
                />
              )}
            </div>
            <ErrorMessage
              name="confirmPassword"
              component="p"
              className="text-red-500"
            />
          </div>
          <label>Gender</label>
          <div className="flex gap-4">
            <label>
              <Field type="radio" name="gender" value="male" />
              Male
            </label>
            <label>
              <Field type="radio" name="gender" value="female" />
              Female
            </label>
          </div>
          <button
            type="submit"
            className={` border-none rounded-sm text-white py-2 h-[50px] ${
              loading ? "bg-slate-300" : "bg-[#61459e]"
            }`}
            disabled={loading}
          >
            <span>{loading ? <ClipLoader color="#61459e" /> : "Sign up"}</span>
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
