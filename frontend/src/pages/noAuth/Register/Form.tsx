import { useRef, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import axiosClient from "../../../axios";
import TextInput from "../../../components/forms/TextInput";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../stores/userStore";

import { Toast } from "primereact/toast";

interface FormValues {
  email: string;
  name: string;
  password: string;
  re_password: string;
}

// const validationSchema = Yup.object({
//   email: Yup.string(),
//   name: Yup.string(),
//   re_password: Yup.string(),
// });
const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Email must be a valid email"),
  name: Yup.string().required("Name is required").min(1),
  password: Yup.string().required("Password is required").min(8),
  re_password: Yup.string()
    .required("Repeat Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const Form = () => {
  const navigate = useNavigate();
  const { setUserAccessToken, setUserRefreshToken } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useRef<Toast>(null);

  const handleSubmit = (values: FormValues, { setErrors }: any) => {
    setIsSubmitting(true);
    axiosClient
      .post("/auth/users/", {
        email: values.email,
        name: values.name,
        password: values.password,
        re_password: values.re_password,
      })
      .then((res) => {
        console.log(res);
        axiosClient
          .post("/auth/jwt/create", {
            email: values.email,
            password: values.password,
          })
          .then((res) => {
            setIsSubmitting(false);
            setUserAccessToken(res.data["access"]);
            setUserRefreshToken(res.data["refresh"]);
          })
          .catch((err) => {
            setIsSubmitting(false);
            setErrors(err.response.data);
            toast.current?.show({
              severity: "error",
              summary: "Error",
              detail: "Error Loging In",
            });
          });
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.log(err.response.data);
        setErrors(err.response.data);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error Registering",
        });
      });
  };

  return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      initialValues={{
        email: "",
        name: "",
        password: "",
        re_password: "",
        detail: {},
      }}
    >
      {({ errors, handleSubmit }) => (
        <form
          className="tw-mt-10 tw-flex tw-flex-col tw-gap-9"
          onSubmit={handleSubmit}
        >
          <Toast ref={toast} />
          <TextInput name="email" label="Email" />
          <TextInput name="name" label="Name" />
          <TextInput
            name="password"
            feedback={true}
            label="Password"
            type="password"
          />
          <TextInput
            name="re_password"
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
          {errors.detail ? (
            <div className="tw-text-red-500 tw-text-sm tw-flex tw-flex-col  tw-gap-1">
              <small>{errors.detail as any}</small>
            </div>
          ) : null}
        </form>
      )}
    </Formik>
  );
};

export default Form;
