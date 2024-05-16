import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Checkbox, FormControlLabel, MenuItem, Button } from '@mui/material';
import { getWithExpiry } from '../../util/localstorage';


const validationSchema = Yup.object({
  matricule: Yup.string().required('Matricule is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required'),
  name: Yup.string().required('Name is required'),
  departement: Yup.string().required('Departement is required'),
});

const UserForm = () => {
  const formik = useFormik({
    initialValues: {
      matricule: '',
      email: '',
      password: '',
      name: '',
      responsable: false,
      administrator:false,
      departement: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:8080/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getWithExpiry('TOKEN')}`,

          },
          body: JSON.stringify(values),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Success:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <TextField
          label="Matricule"
          variant="outlined"
          fullWidth
          id="matricule"
          name="matricule"
          value={formik.values.matricule}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.matricule && Boolean(formik.errors.matricule)}
          helperText={formik.touched.matricule && formik.errors.matricule}
        />
      </div>
      <div className="mb-4">
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </div>
      <div className="mb-4">
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </div>
      <div className="mb-4">
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </div>
      <div className="mb-4">
        <FormControlLabel
          control={
            <Checkbox
              id="responsable"
              name="responsable"
              checked={formik.values.responsable}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          }
          label="Responsable"
        />
      </div>
      <div className="mb-4">
        <FormControlLabel
          control={
            <Checkbox
              id="administrator"
              name="administrator"
              checked={formik.values.administrator}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          }
          label="Administrator"
        />
      </div>
      <div className="mb-4">
        <TextField
          select
          label="Departement"
          variant="outlined"
          fullWidth
          id="departement"
          name="departement"
          value={formik.values.departement}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.departement && Boolean(formik.errors.departement)}
          helperText={formik.touched.departement && formik.errors.departement}
        >
          <MenuItem value="CMS">CMS</MenuItem>
          <MenuItem value="TRAD">TRAD</MenuItem>
          <MenuItem value="CABLAGE">CABLAGE</MenuItem>
        </TextField>
      </div>
      <Button type="submit" variant="contained" color="primary" className="mt-4">
        Submit
      </Button>
    </form>
  );
};

export default UserForm;
