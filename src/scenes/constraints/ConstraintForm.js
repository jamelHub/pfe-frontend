import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, MenuItem, Button } from '@mui/material';
import * as Yup from 'yup';
import { Memory, DeveloperBoard } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

import { FormControl, InputLabel, Select, Box } from '@mui/material';



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
  const [selectedIndex, setSelectedIndex] = useState(1);

  const [scope, setScope] = useState('');
  const [namespace, setNamespace] = useState('');
  const [api, setApi] = useState('');
  const [kind, setKind] = useState('');


const [disabledApi,setDisabledApi]=useState(true)
const [disabledKind,setDisabledKind]=useState(true)


  const [excludedNamespaces, setExcludedNamespaces] = useState('');

  const handleSubmit = (values) => {
    console.log(values);
  }

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleScopeChange = (event) => {
    setScope(event.target.value);
  };

  const handleApiChange = (event) => {
    setApi(event.target.value);
  };

  
  const handleKindChange = (event) => {
    setKind(event.target.value);
  };
  const handleNamespaceChange = (event) => {
    setNamespace(event.target.value);
  };

  const handleExcludedNamespacesChange = (event) => {
    setExcludedNamespaces(event.target.value);
  };



  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} >
      {({ values, errors, touched, handleChange }) => (
        <Form className='w-4/6 m-auto my-20'>
          <h1 className='text-3xl font-bold text-center my-8'> Create new Constraint</h1>
          <div className='flex  gap-5'>
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
          </div>

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

          <div className='flex w-full'>
            <div className=' w-2/6'>

              <List>
                <ListItem disablePadding>
                  <ListItemButton selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Namespace" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Role" />
                  </ListItemButton>
                </ListItem>
              </List>

            </div>
            {selectedIndex == 0 && <div className=' flex flex-col gap-4 w-full p-4'>

              <FormControl fullWidth>
                <InputLabel id="scope-label">Scope</InputLabel>
                <Select
                  labelId="scope-label"
                  id="scope"
                  value={scope}
                  label="Scope"
                  onChange={handleScopeChange}
                >
                  <MenuItem value="cluster">Cluster</MenuItem>
                  <MenuItem value="namespace">Namespace</MenuItem>
                </Select>
              </FormControl>


              <TextField
                id="namespace"
                label="Namespace"
                value={namespace}
                onChange={handleNamespaceChange}
                fullWidth
              />

              <TextField
                id="ExcludedNamespaces"
                label="Excluded Namespaces"
                value={excludedNamespaces}
                onChange={handleExcludedNamespacesChange}
                fullWidth
              />



            </div>
            }

            {selectedIndex == 1 && <div className='w-full'>
              <div className='w-full   flex  pl-4 '>
                <div className='flex border w-full border-gray-400'>
                  <div className='h-full  '>

                    <Button  variant="contained"  onClick={()=>setDisabledApi(false)} >add api</Button>

                  </div>

                  <TextField
                    id="Api"
                    label="Api"
                    value={api}
                    onChange={handleApiChange}
                    disabled={disabledApi}
                    fullWidth
                  />

<div className=''>

<Button    variant="contained"  onClick={()=>setDisabledKind(false)} >Add Kind</Button>

</div>

<TextField
id="Kind"
label="Kind"
value={kind}
onChange={handleKindChange}
disabled={disabledKind}
fullWidth
/>
                </div>
         
         
              </div>
            
              <div className='ml-4 mt-4'>
              <Button type="submit"  className='m-4' variant="contained" color="primary">
              Add role
            </Button>
                </div>
            
            </div>


            }
          </div>



          <div className='flex w-full  gap-4 my-4 justify-center'>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
            <Button variant="contained" color="error">
              Cancel
            </Button>
          </div>

        </Form>
      )}
    </Formik>
  );
};

export default ConstraintForm;
