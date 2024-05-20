import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";

import { getWithExpiry } from "../../util/localstorage";

import { useNavigate } from 'react-router-dom';


import Searchinput from "../../components/SearchInput";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),

});

const EditOf = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [of, setOf] = useState(null);

  const [departements, setDepartements] = useState([]);

  const [departementIds, setDepartementIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartements();
  }, []);

  const fetchDepartements = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/departements`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${getWithExpiry("TOKEN")}`,
        },
      });
      const data = await response.json();

      setDepartements(data);
      console.log(" departemensts" , departements)
    } catch (error) {
      console.error("Error fetching of:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/ofs/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${getWithExpiry("TOKEN")}`,
          },
        });
        const data = await response.json();

        setOf(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching of:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: of ? of.name : "",
   
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const updated = {
          ...values,
          departements: departementIds,
        };

        const response = await fetch(`http://localhost:8080/api/ofs/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getWithExpiry("TOKEN")}`,
          },
          body: JSON.stringify(updated),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        navigate('/ofs');

        console.log("Success:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  if (loading) {
    return <CircularProgress />;
  }

  const handleProducts = (data) => {
    let listDeparement = [];
    data.map((departement) => {
      if (departement?._id) {
        listDeparement.push(departement?._id);
      }
    });
    setDepartementIds(listDeparement);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="p-6 bg-white rounded-lg shadow-md"
    >

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
   


       {departements && (
        <Searchinput
          produits={departements}
          selectedProduit={of.departements}
          productsValues={handleProducts}
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

export default EditOf;
