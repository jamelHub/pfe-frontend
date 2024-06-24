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
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
});

const FormProduit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [produits, setProduit] = useState(null);

  const [ofs, setofs] = useState([]);

  const [productIds, setOfsIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduits();
  }, []);

  const fetchProduits = async () => {
    try {
      const response = await fetch(`http://pfe.emkatech.tn/api/ofs`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getWithExpiry('TOKEN')}`,
        },
      });
      const data = await response.json();

      setofs(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://pfe.emkatech.tn/api/produits/${id}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getWithExpiry('TOKEN')}`,
            },
          }
        );
        const data = await response.json();

        setProduit(data);
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
      description: '',
      name: '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const updated = {
          ...values,
          produits: productIds,
        };

        const response = await fetch(`http://pfe.emkatech.tn/api/produits`, {
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
        navigate('/produits');
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  if (loading) {
    return <CircularProgress />;
  }

  const handleOfs = (data) => {
    let listProduct = [];
    data.map((product) => {
      if (product?._id) {
        listProduct.push(product?._id);
      }
    });
    setOfsIds(listProduct);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="p-6 bg-white rounded-lg shadow-md"
    >
      <div className="mb-4">
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
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

      {ofs && (
        <Searchinput
          produits={ofs}
          selectedProduit={produits.ofs}
          productsValues={handleOfs}
          title="Ofs"
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

export default FormProduit;
