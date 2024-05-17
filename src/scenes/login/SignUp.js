import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.number().min(2, 'Age must be greater than 1').required('Age is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});

const initialValues = {
  name: '',
  age: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowClick = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: '',

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });


  const handleSignUp = async (values) => {
    try {
      const { name, age, email, password, confirmPassword } = values;
      const response = await fetch('http://35.173.177.99/data', {

        //mode: 'no-cors', 
        method: 'POST',

        body: JSON.stringify({ name, age, email, password, confirmPassword}),
      });
      if (response.ok) {
        const user = await response.json();

        navigate('/login');
      } else {
        throw Error(await response.text());
      }
    } catch (error) {

      alert('Sign up failed. Please check ', error);

    }
  };



  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) =>handleSignUp(values)}
      validationSchema={validationSchema}
    >
      {({ values, errors, touched, handleChange }) => (
        <Form style={{ maxWidth: '400px', margin: '0 auto', marginTop: '50px' }}>
          <h1 className='text-3xl font-bold text-center my-8'>Sign Up</h1>
          <Field
            as={TextField}
            fullWidth
            name="name"
            label="Name"
            variant="outlined"
            margin="normal"
            value={values.name}
            onChange={handleChange}
            error={touched.name && !!errors.name}
            helperText={touched.name && errors.name}
          />
          <Field
            as={TextField}
            fullWidth
            type="number"
            name="age"
            label="Age"
            variant="outlined"
            margin="normal"
            value={values.age}
            onChange={handleChange}
            error={touched.age && !!errors.age}
            helperText={touched.age && errors.age}
          />
          <Field
            as={TextField}
            fullWidth
            type="email"
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            value={values.email}
            onChange={handleChange}
            error={touched.email && !!errors.email}
            helperText={touched.email && errors.email}
          />
          <Field
            as={TextField}
            fullWidth
            type={showPassword ? 'text' : 'password'}
            name="password"
            label="Password"
            variant="outlined"
            margin="normal"
            value={values.password}
            onChange={handleChange}
            error={touched.password && !!errors.password}
            helperText={touched.password && errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowClick} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Field
            as={TextField}
            fullWidth
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            value={values.confirmPassword}
            onChange={handleChange}
            error={touched.confirmPassword && !!errors.confirmPassword}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
