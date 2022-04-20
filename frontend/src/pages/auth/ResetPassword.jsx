import { Formik, Form } from "formik";
import { useMemo, useState } from "react";
import axios from "axios";
import { InputField } from "../../components/Field";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Loading from "../../components/Loading";
import { API } from "../../api/config";

const ResetPasswordPage = () => {
  const {token} = useParams();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const initialValues = useMemo(
    () => ({
      password: "",
      confirmPassword: "",
    }),
    []
  );

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      await axios.put(`${API.AUTH.resetPassword}/${token}`, values);
      toast.success('Password changed successfully.',{position:toast.POSITION.TOP_CENTER});
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
        <div className="text-start mb-4 font-bold text-2xl">Set new password</div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>

            <InputField
              name="password"
              type="password"
              label="New password"
              placeholder="Enter new password"
            />

            <InputField
              name="confirmPassword"
              type="password"
              label="Confirm password"
              placeholder="Re-enter password"
            />

            {loading ? (
              <Loading />
            ) : (
              <>
                <button
                  type="submit"
                  className="mt-8 py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded w-full"
                >
                  Change password
                </button>
              </>
            )}
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
