import { Formik, Form } from "formik";
import { useEffect, useMemo } from "react";
import * as Yup from "yup";
import { InputField } from "../../components/Field";
import image from "../../assets/images/kingdom-the-cook-is-drinking.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  loginFailure,
  loginPending,
  loginSuccess,
} from "../../redux/reducers/authSlice";
import Loading from "../../components/Loading";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authState);

  const initialValues = useMemo(
    () => ({
      name: "",
      email: "",
      contact: "",
      password: "",
    }),
    []
  );

  const getCreateNewCustomer = async (values, resetForm) => {
    dispatch(loginPending());
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/ums/register`,
        values
      );
      dispatch(loginSuccess(res.data.user));
      localStorage.setItem("_t", res.data.token);
      navigate("/");
    } catch (error) {
      dispatch(loginFailure());
      toast.error(
        error.response?.data?.message ??
          error.message ??
          "Internal server error.",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      resetForm();
    }
  };

  const onSubmit = async (values, { resetForm }) => {
    await getCreateNewCustomer(values, resetForm);
  };

  return (
    <main className="flex-grow flex justify-center items-center">
      <div className="w-full md:w-1/3 p-4">
        <div className="text-start mb-4 font-bold text-2xl">
          Register with us
        </div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <InputField
              name="name"
              type="text"
              label="Full Name"
              placeholder="Enter name"
            />

            <InputField
              name="email"
              type="email"
              label="Enter your email"
              placeholder="Enter your email"
            />

            <InputField
              name="contact"
              type="text"
              label="Mobile Number"
              placeholder="Enter your mobile number"
            />

            <InputField
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
            {loading ? (
              <Loading />
            ) : (
              <>
                <button
                  type="submit"
                  className="mt-2 py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded w-full"
                >
                  Register
                </button>
              </>
            )}
          </Form>
        </Formik>
      </div>
    </main>
  );
};

export default RegisterPage;
