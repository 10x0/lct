import { ErrorMessage, Field } from "formik";

import { TextError } from "./TextError";

function InputField({ label = "", ...props }) {
  return (
    <div className="form-group my-2">
      <label className="text-lg" htmlFor={props.name}>
        {label}
      </label>
      <Field
        required
        className={`my-2 px-3 py-2 w-full border  rounded shadow-sm focus:outline-none focus:border-2 focus:border-blue-500 `}
        id={props.name}
        name={props.name}
        {...props}
      />
      <ErrorMessage name={props.name} component={TextError} />
    </div>
  );
}

export { InputField, TextError };
