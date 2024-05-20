import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Formik } from 'formik';
import { Box, Button, TextField } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { setWithExpiry } from '../../util/localstorage';
import { useNavigate } from 'react-router-dom';
import { sessionActions } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const validationSchema = yup.object({
  matricule: yup
    .string('Enter your matricule')
    .required('matricule is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [failed,setFailed]= useState('')

  const formik = useFormik({
    initialValues: {
      matricule: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handlePasswordLogin(values);
    },
  });

  const handlePasswordLogin = async (values) => {
    try {
      const { matricule, password } = values;
      const response = await fetch(`http://localhost:8080/api/session`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matricule, password }),
      });
      if (response.ok) {
        const user = await response.json();

        setWithExpiry('TOKEN', user.token.data, user.token.expiresIn);
        dispatch(sessionActions.updateUser(user));
        navigate('/');
      } else {
        throw Error(await response.json());
      }
    } catch (error) {
        setFailed("Login Failed");

    }
  };

  return (
    <div className="flex h-full w-full  ">
      <div className="w-3/6"> Image </div>
      <div className="w-3/6 m-auto h-full flex flex-col justify-center bg-inherit ">
        <form
          onSubmit={formik.handleSubmit}
          className="w-4/6 gap-3 flex flex-col ml-5"
        >
          <TextField
            fullWidth
            id="matricule"
            name="matricule"
            label="matricule"
            value={formik.values.matricule}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.matricule && Boolean(formik.errors.matricule)}
            helperText={formik.touched.matricule && formik.errors.matricule}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>

          {failed && <p className='text-red-500	'> {failed}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
