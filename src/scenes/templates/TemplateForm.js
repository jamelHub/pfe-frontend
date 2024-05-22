import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, MenuItem, Button } from '@mui/material';
import * as Yup from 'yup';
import { Memory, DeveloperBoard } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import { getWithExpiry } from '../../util/localstorage';

import axios from 'axios';

const templates = [
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

const TemplateForm = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };


  useEffect(() => {
    // URL and data
    const url = 'https://54.91.176.31:6443/apis/templates.gatekeeper.sh/v1beta1/constrainttemplates/';
    const data = {
        apiVersion: "templates.gatekeeper.sh/v1beta1",
        kind: "ConstraintTemplate",
        metadata: {
            name: "k8sdenyname10"
        },
        spec: {
            crd: {
                spec: {
                    names: {
                        kind: "k8sdenyname10"
                    },
                    validation: {
                        openAPIV3Schema: {
                            properties: {
                                invalidName: {
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            },
            targets: [
                {
                    rego: `package k8sdenyname10s
violation[{"msg": msg}] {
input.review.object.metadata.name == input.parameters.invalidName
msg := sprintf("The name %v is not allowed", [input.parameters.invalidName])
}
`,
                    target: "admission.k8s.gatekeeper.sh"
                }
            ]
        }
    };

    // Make the POST request using Fetch API with no-cors mode
    fetch(url, {
        method: 'POST',
        mode: 'no-cors', // Use no-cors mode
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getWithExpiry("kubeToken")}`,

        },
        body: JSON.stringify(data)
    })
    .then(response => {
        // With no-cors mode, you won't be able to access the response
        console.log('Request sent. Response handling is limited in no-cors mode.');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}, []); 

/*  useEffect(() => {
    createTemplate();
  }, []);


  const createTemplate = async () => {
    try {

 
      const response = await axios.post(
        'https://54.91.176.31:6443/apis/templates.gatekeeper.sh/v1beta1/constrainttemplates/',
        JSON.stringify({
          "apiVersion": "templates.gatekeeper.sh/v1beta1",
          "kind": "ConstraintTemplate",
          "metadata": {
              "name": "k8sdenyname9"
          },
          "spec": {
              "crd": {
                  "spec": {
                      "names": {
                          "kind": "k8sdenyname9"
                      },
                      "validation": {
                          "openAPIV3Schema": {
                              "properties": {
                                  "invalidName": {
                                      "type": "string"
                                  }
                              }
                          }
                      }
                  }
              },
              "targets": [
                  {
                      "rego": "package k8sdenyname9s\nviolation[{\"msg\": msg}] {\n  input.review.object.metadata.name == input.parameters.invalidName\n  msg := sprintf(\"The name %v is not allowed\", [input.parameters.invalidName])\n}\n",
                      "target": "admission.k8s.gatekeeper.sh"
                  }
              ]
          }
      }),
        {
          httpsAgent: new axios.create({
            rejectUnauthorized: false // Disable SSL certificate validation
        }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getWithExpiry("kubeToken")}`,
          },
        }
      );
  
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
*/
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema  } >
      {({ values, errors, touched, handleChange }) => (
        <Form className='w-3/6 m-auto my-20'>
            <h1 className='text-3xl font-bold text-center my-8'> Create new Template</h1>
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
            {templates.map((option) => (
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

export default TemplateForm;
