import { Button, TextField } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { setWithExpiry } from '../../util/localstorage';
import { useNavigate } from 'react-router-dom';
import { sessionActions } from '../../store';
import { useDispatch } from 'react-redux';

const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .required('Name is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required'),
});


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handlePasswordLogin(values);
    },
  });

  const handlePasswordLogin = async (values) => {
    try {
      const { name, password } = values;
      const response = await fetch(`http://44.201.105.2/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });
      if (response.ok) {
        const user = await response.json();

        setWithExpiry('TOKEN', user.token.data, user.token.expiresIn);
        dispatch(sessionActions.updateUser(user));
        navigate('/');
      } else {
        throw Error(await response.text());
      }
    } catch (error) {

    }
  };





  return (
    <div className="flex h-full w-full  ">
      <div className="w-2/6 m-auto h-full flex flex-col justify-center ">
      <h1 className='text-center font-bold text-4xl mb-12' > Welcome</h1>
        <form
          onSubmit={formik.handleSubmit}
          className=" flex flex-col justify-between h-40 ml-5"
        >
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
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
        </form>
      </div>
    </div>
  );
};

export default Login;
