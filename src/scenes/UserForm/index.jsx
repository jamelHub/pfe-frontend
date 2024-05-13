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
import { useDispatch } from 'react-redux';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  nom: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .required('Name is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  matricule: yup
    .string()
    .matches(/^\d{4}-\d{4}-\d{4}$/, 'Invalid matricule format')
    .required('Matricule is required'),
  administrator: yup.boolean().required('Administrator status is required'),
  responsable: yup.string().when('administrator', {
    is: false,
    then: yup.string().required('Responsable is required'),
    otherwise: yup.string().notRequired(),
  }),
  departement: yup.string().required('Department is required'),
});

const UserForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      nom: '',
      matricule: '',
      password: '',
      administrator: '',
      responsable: '',
      departement: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handlePasswordLogin(values);
    },
  });
  const handlePasswordLogin = async (values) => {
    try {
      const { email, password } = values;
      const response = await fetch(`http://192.168.1.97:8080/api/session`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
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
      //   setFailed(true);
      //   setPassword('');
    }
  };
  return (
    <div className="w-full flex justify-center my-16">
      <form
        onSubmit={formik.handleSubmit}
        className="w-3/6 gap-3 flex flex-col ml-5 justify-center"
      >
        <h1 className="font-bold text-2xl text-center my-2">
          Create New User
        </h1>

        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="nom"
          name="nom"
          label="nom"
          value={formik.values.nom}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.nom && Boolean(formik.errors.nom)}
          helperText={formik.touched.nom && formik.errors.nom}
        />
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
        <TextField
          fullWidth
          id="departement"
          name="departement"
          label="departement"
          value={formik.values.departement}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.departement && Boolean(formik.errors.departement)
          }
          helperText={formik.touched.departement && formik.errors.departement}
        />
        <TextField
          fullWidth
          id="administrator"
          name="administrator"
          label="administrator"
          value={formik.values.administrator}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.administrator && Boolean(formik.errors.administrator)
          }
          helperText={
            formik.touched.administrator && formik.errors.administrator
          }
        />
        <TextField
          fullWidth
          id="responsable"
          name="responsable"
          label="responsable"
          value={formik.values.responsable}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.responsable && Boolean(formik.errors.responsable)
          }
          helperText={formik.touched.responsable && formik.errors.responsable}
        />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
