import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Button,
  CircularProgress,
} from '@mui/material';

import { getWithExpiry } from '../../util/localstorage';
import { useNavigate } from 'react-router-dom';

import Searchinput from '../../components/SearchInput';

const validationSchema = Yup.object({
  matricule: Yup.string().required('Matricule is required'),
  name: Yup.string().required('Name is required'),
  password: Yup.string().required('password is required'),

  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  departement: Yup.string().required('Departement is required'),
  responsable: Yup.string().required('responsable is required'),
});

const EditUser = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [produits, setProduits] = useState([]);

  const [productIds, setProductsIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduits();
  }, []);

  const fetchProduits = async () => {
    try {
      const response = await fetch(`http://pfe.emkatech.tn/api/produits`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getWithExpiry('TOKEN')}`,
        },
      });
      const data = await response.json();

      setProduits(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://pfe.emkatech.tn/api/users/${id}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getWithExpiry('TOKEN')}`,
          },
        });
        const data = await response.json();

        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      matricule: '',
      email: '',
      name: '',
      password: '',
      responsable: false,
      administrator: false,
      departement: '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const updated = {
          ...values,
          produits: productIds,
        };

        const response = await fetch(`http://pfe.emkatech.tn/api/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getWithExpiry('TOKEN')}`,
          },
          body: JSON.stringify(updated),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        navigate('/users');
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  if (loading) {
    return <CircularProgress />;
  }

  const handleProducts = (data) => {
    let listProduct = [];
    data.map((product) => {
      if (product?._id) {
        listProduct.push(product?._id);
      }
    });
    setProductsIds(listProduct);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="p-6 bg-white rounded-lg shadow-md"
    >
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
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
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
          error={
            formik.touched.departement && Boolean(formik.errors.departement)
          }
          helperText={formik.touched.departement && formik.errors.departement}
        >
          <MenuItem value="CMS">CMS</MenuItem>
          <MenuItem value="TRAD">TRAD</MenuItem>
          <MenuItem value="CABLAGE">CABLAGE</MenuItem>
        </TextField>
      </div>

      {produits && (
        <Searchinput
          produits={produits}
          selectedProduit={user.produits}
          productsValues={handleProducts}
          title="Produits"
        />
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="my-8 py-8"
      >
        Submit
      </Button>
    </form>
  );
};

export default EditUser;
