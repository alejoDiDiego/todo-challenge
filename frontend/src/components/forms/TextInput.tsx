import { useField } from "formik";

import { InputText } from "primereact/inputtext";

import { Password } from "primereact/password";

interface Props {
  name: string;
  label?: string;
  type?: string;
  feedback?: boolean;
}

const TextInput = (props: Props) => {
  const [field, meta] = useField(props.name);
  return (
    <div className="tw-flex tw-flex-col tw-gap-1 tw-w-full">
      <span className="p-float-label tw-w-full">
        {props.type != null && props.type == "password" ? (
          <Password
            className={`tw-w-full ${
              meta.touched && meta.error ? "p-invalid" : ""
            }`}
            id={props.name}
            inputClassName="tw-w-full"
            {...field}
            {...props}
            toggleMask
            feedback={
              props.feedback != null && props.feedback == true ? true : false
            }
          />
        ) : (
          <InputText
            className={`tw-w-full ${
              meta.touched && meta.error ? "p-invalid" : ""
            }`}
            id={props.name}
            {...field}
            {...props}
          />
        )}
        <label
          className={`${meta.touched && meta.error ? "tw-text-red-500" : ""}`}
          htmlFor={props.name}
        >
          {props.label}
        </label>
      </span>
      {meta.touched && meta.error ? (
        <small className="tw-text-red-500 ">{meta.error}</small>
      ) : null}
    </div>
  );
};

export default TextInput;
