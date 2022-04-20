import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../api/config';
import { InputField } from '../components/Field';
import Loading from '../components/Loading';

const BookTable = () => {
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const initialValues = useMemo(
    () => ({
      seats: "",
      contact: "",
      date: "",
      time: "",
      duration: 0.5,
    }),
    []
  );

  const onSubmit = async (values, { resetForm }) => {
      setLoading(true);
      try {
          await axios.post(API.BOOKING.createBooking, values);
          toast.success("🙏 We'll contact you soon. 🙏",{position:toast.POSITION.TOP_CENTER});
          navigate("/menu", { replace: true });
          setLoading(false);
        } catch (error) {
            toast.error(
                error.response?.data?.message ??
                error.message ??
                "Internal server error.",
                {
                    position: toast.POSITION.TOP_CENTER,
                }
                );
                setLoading(false);
      resetForm();
    }
  };

  return (
    <section className="flex-grow flex justify-center items-center">
    <div className="p-4 w-full md:w-1/4">
      <div className="text-start mb-4 font-bold text-2xl">Book a table</div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>

          <InputField
            name="seats"
            type="number"
            label="Number of seats"
            placeholder="Enter no of seats needed."
          />

          <InputField
            name="contact"
            type="number"
            label="Mobile number"
            placeholder="Enter your contact number."
          />
          
          <InputField
            name="date"
            type="date"
            label="Date"
          />

          <InputField
            name="time"
            type="time"
            label="Arrival time"
          />
         
         <div className="form-group my-2">
          <label className="text-lg" htmlFor='duration'>
              Duration 
          </label>

          <Field as="select" name="duration" className='my-2 px-3 py-2 w-full border  rounded shadow-sm focus:outline-none focus:border-2 focus:border-blue-500'>
              <option value={0.5}>1/2 hr</option>
              <option value={1}>1 hr</option>
              <option value={2}>3 hr</option>
              <option value={3}>5 hr</option>
          </Field>

          </div>

          {loading ? (
            <Loading />
          ) : (
            <>
              <button
                type="submit"
                className="mt-8 py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded w-full"
              >
                Book now
              </button>
            </>
          )}
        </Form>
      </Formik>
    </div>
  </section>
  )
}

export default BookTable