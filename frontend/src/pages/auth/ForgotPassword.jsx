import { Formik, Form } from "formik";
import { useMemo, useState } from "react";
import axios from "axios";
import { InputField } from "../../components/Field";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Loading from "../../components/Loading";
import { API } from "../../api/config";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const initialValues = useMemo(
    () => ({
      email: "",
    }),
    []
  );

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      await axios.post(API.AUTH.forgotPassword, values);
      toast.success('Please check your mail.',{position:toast.POSITION.TOP_CENTER});
      setLoading(false);
      navigate("/login", { replace: true });
    } catch (error) {
      setLoading(false);
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
        <div className="text-start mb-4 font-bold text-2xl">Enter registered email</div>
       
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <InputField
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
            />
             <div className="text-start mb-4 text-gray-400">We'll sent a link to reset password, if email is registered.</div>

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
                  className="mt-2 text-blue-500 block text-center"
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
