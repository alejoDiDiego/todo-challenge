import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import axiosClient from "../../../axios";
import TextInput from "../../../components/forms/TextInput";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Email must be a valid email"),
  password: Yup.string().required("Password is required").min(8),
  passwordConfirmation: Yup.string()
    .required("Repeat Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const Form = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values: FormValues, { setErrors }: any) => {
    setIsSubmitting(true);
    axiosClient
      .post("/register", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        setIsSubmitting(false);
        // setUser(res.data.user);
        // setUserTokenFunc(res.data.token);
        // toast.success("Logged in successfully");
      })
      .catch((err) => {
        setIsSubmitting(false);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      initialValues={{
        email: "",
        password: "",
        passwordConfirmation: "",
        errors: {},
      }}
    >
      {({ errors, handleSubmit }) => (
        <form
          className="tw-mt-10 tw-flex tw-flex-col tw-gap-9"
          onSubmit={handleSubmit}
        >
          <TextInput name="email" label="Email" />
          <TextInput
            name="password"
            feedback={true}
            label="Password"
            type="password"
          />
          <TextInput
            name="passwordConfirmation"
            label="Confirm Password"
            type="password"
          />
          <div className="flex gap-3">
            <Button
              type="submit"
              className="sm:tw-w-fit tw-w-full"
              disabled={isSubmitting}
              label={isSubmitting ? "Submitting..." : "Register"}
            ></Button>
          </div>
          <div className="flex flex-col font-semibold text-gray-700">
            <a
              className="tw-underline tw-text-sm tw-text-blue-800 tw-cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Already registered? Log In
            </a>
          </div>
          {errors.errors ? (
            <div className="tw-text-red-500 tw-text-sm tw-flex tw-flex-col  tw-gap-1">
              {Object.values(errors.errors).map((error: any, index) => (
                <small key={index}>{error}</small>
              ))}
            </div>
          ) : null}
        </form>
      )}
    </Formik>
  );
};

export default Form;
