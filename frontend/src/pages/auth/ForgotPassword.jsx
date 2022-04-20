import { Formik, Form } from "formik";
import { useMemo } from "react";
import * as Yup from "yup";
import axios from "axios";
import { InputField } from "../../components/Field";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  loginFailure,
  loginPending,
  loginSuccess,
} from "../../redux/reducers/authSlice";
import Loading from "../../components/Loading";
import { API } from "../../api/config";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.authState);
  const initialValues = useMemo(
    () => ({
      email: "",
    }),
    []
  );

  const onSubmit = async (values, { resetForm }) => {
    dispatch(loginPending());
    try {
      const res = await axios.post(API.auth, values);
      localStorage.setItem("_t", res.data.token);
      dispatch(loginSuccess(res.data.user));
      navigate("/menu", { replace: true });
    } catch (error) {
      dispatch(
        loginFailure(
          error.response?.data?.message ??
            error.message ??
            "Internal server error."
        )
      );
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

  return (
    <section className="flex-grow flex justify-center items-center">
      <div className="p-4 w-full md:w-1/4">
        <div className="text-start mb-4 font-bold text-2xl">Log In</div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <InputField
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
            />

            {loading ? (
              <Loading />
            ) : (
              <>
                <button
                  type="submit"
                  className="mt-8 py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded w-full"
                >
                  Forgot password
                </button>
                <Link
                  to="/login"
                  className="mt-2 md:ml-8 text-blue-500 block text-center"
                >
                  Go back?
                </Link>
              </>
            )}
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
