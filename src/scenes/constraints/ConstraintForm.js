import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, MenuItem, Button } from '@mui/material';
import * as Yup from 'yup';
import { Memory, DeveloperBoard } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';

const namespaces = [
  { value: 'gatekeeper-system', label: 'Gatekeeper System' },
  { value: 'ingress-nginx', label: 'Ingress Nginx' },
  { value: 'kubernetes', label: 'Kubernetes' }
];

const initialValues = {
  namespace: '',
  memory: '',
  cpu: ''
};

const validationSchema = Yup.object().shape({
  namespace: Yup.string().required('Namespace is required'),
  memory: Yup.number().min(1, 'Memory must be greater than 1').required('Memory is required'),
  cpu: Yup.number().min(1, 'CPU must be greater than 1').required('CPU is required')
});

const ConstraintForm = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema  } >
      {({ values, errors, touched, handleChange }) => (
        <Form className='w-3/6 m-auto my-20'>
            <h1 className='text-3xl font-bold text-center my-8'> Create new Constraint</h1>
          <Field
            as={TextField}
            select
            name="namespace"
            label="Namespace"
            variant="outlined"
            margin="normal"
            fullWidth
            value={values.namespace}
            error={touched.namespace && !!errors.namespace}
            helperText={touched.namespace && errors.namespace}
            onChange={handleChange}
            required
          >
            {namespaces.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Field>
          <Field
            as={TextField}
            type="number"
            name="memory"
            label="Memory"
            variant="outlined"
            margin="normal"
            fullWidth
            InputProps={{
               endAdornment: <InputAdornment position="end"><Memory /></InputAdornment>,
            }}
            error={touched.memory && !!errors.memory}
            helperText={touched.memory && errors.memory}
            onChange={handleChange}
            required
          />
          <Field
            as={TextField}
            type="number"
            name="cpu"
            label="CPU"
            variant="outlined"
            margin="normal"
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end"><DeveloperBoard /></InputAdornment>,
            }}
            error={touched.cpu && !!errors.cpu}
            helperText={touched.cpu && errors.cpu}
            onChange={handleChange}
            required
          />
          <div className='flex w-full  gap-4 my-4 justify-center'>
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
          <Button  variant="contained" color="error">
            Cancel
          </Button>
          </div>
        
        </Form>
      )}
    </Formik>
  );
};

export default ConstraintForm;
