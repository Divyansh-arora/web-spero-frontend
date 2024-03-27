import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
  const navigate = useNavigate();
  const [latitude, setLatitude] = useState(null);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    address:'',
    mobile:'',
    zipCode:'',
  });
  useEffect(() => {
    // Fetch the user's geolocation when the component mounts
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude); // Set latitude from the position
      },
      (error) => {
        console.error('Error getting geolocation:', error);
      }
    );
  }, []);
  
  const validationSchema = Yup.object({
    name: Yup.string().min(2).max(25).required('Please enter your name'),
    email: Yup.string().email().required('Please enter your email'),
    password: Yup.string().min(2).required('Please enter your password'),
    address: Yup.string().min(1).required('Please enter your Address'),
    mobile: Yup.number().min(1).required('Please enter your Mobile Number'),
    zipCode: Yup.number().min(1).required('Please enter your ZipCode'),
  });
  const initialValues = {
    name: '',
    email: '',
    password: '',
    address: '',
    mobile: '',
    zipCode: '',
  };
  const { values, errors, handleSubmit, handleBlur, touched, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: async (values, action) => {
        console.log('THe values are ',values)
        await Axios.post(
          'https://web-spero-backend.onrender.com/addUser',
          {
            ...values,
            latitude: latitude, // Include latitude in the request body
          }
          
        )
          .then((res) => {
            navigate('/');
          })
          .catch((err) => {
            console.log("THe err", err)
            alert(err.response.data.message);
          });

        action.resetForm();
      },
    });

  return (
    <>
      <div className="container ">
        <div className="row justify-content-center mt-4">
          <div className="col-lg-4">
            <form onSubmit={handleSubmit} id="signup">
              <div className="form-group">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {values.name && touched.name ? <p>{errors.name}</p> : null}
              </div>
              <div className="form-group">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {values.email && touched.email ? <p>{errors.email}</p> : null}
              </div>
              <div className="form-group">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {values.password && touched.password ? (
                  <p>{errors.password}</p>
                ) : null}
              </div>
              {/* <div className="form-group">
                <label className="form-label">Confirm Password:</label>
                <input
                  type="password"
                  className="form-control"
                  name="cpassword"
                  value={values.cpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {values.cpassword && touched.cpassword ? (
                  <p>{errors.cpassword}</p>
                ) : null}
              </div> */}

              
              <div className="form-group">
                <label className="form-label">Address:</label>
                <input
                  type="name"
                  className="form-control"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* {values.cpassword && touched.cpassword ? (
                  <p>{errors.cpassword}</p>
                ) : null} */}
              </div>


              <div className="form-group">
                <label className="form-label">Mobile No:</label>
                <input
                  type="number"
                  className="form-control"
                  name="mobile"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* {values.cpassword && touched.cpassword ? (
                  <p>{errors.cpassword}</p>
                ) : null} */}
              </div>

              <div className="form-group">
                <label className="form-label">ZipCode:</label>
                <input
                  type="number"
                  className="form-control"
                  name="zipCode"
                  value={values.zipCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* {values.cpassword && touched.cpassword ? (
                  <p>{errors.cpassword}</p>
                ) : null} */}
              </div>

              <button className="btn btn-primary bg-black w-100 mt-3" type="Submit">
                SignUp
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;