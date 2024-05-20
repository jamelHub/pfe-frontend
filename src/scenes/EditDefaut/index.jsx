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
    code: Yup.string().required("Code is required"),
    designation: Yup.string().required("Designation is required"),
  
    qtDefauts: Yup.string().required("Qtdefauts is required"),
    totDefauts: Yup.string().required("totDefauts is required"),
  });

const EditDefaut = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [defaut, setDefaut] = useState(null);

  const [departements, setProduits] = useState([]);

  const [defautsIds, setDefautsIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduits();
  }, []);

  const fetchProduits = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/departements`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${getWithExpiry("TOKEN")}`,
        },
      });
      const data = await response.json();

      setProduits(data);
    } catch (error) {
      console.error("Error fetching defaut:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/defauts/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${getWithExpiry("TOKEN")}`,
          },
        });
        const data = await response.json();

        setDefaut(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching defaut:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const formik = useFormik({
    initialValues: {

    code: defaut ? defaut.code : "",
      designation: defaut ? defaut.designation : "",
      qtDefauts: defaut ? defaut.qtDefauts : "",
      totDefauts: defaut ? defaut.totDefauts : ""


   
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const updated = {
          ...values,
          departement: defautsIds,
        };

        console.log(" updated data ", updated);
        const response = await fetch(`http://localhost:8080/api/defauts/${id}`, {
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
        navigate('/defauts');

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
    console.log("datata", data)
        setDefautsIds(data[0]?._id);
      };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="p-6 bg-white rounded-lg shadow-md"
    >
   
   <div className="mb-4">
        <TextField
          label="Code"
          variant="outlined"
          fullWidth
          id="code"
          name="code"
          value={formik.values.code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.code && Boolean(formik.errors.code)}
          helperText={formik.touched.code && formik.errors.code}
        />
      </div>
      <div className="mb-4">
        <TextField
          label="designation"
          type="text"
          variant="outlined"
          fullWidth
          id="designation"
          name="designation"
          value={formik.values.designation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.designation && Boolean(formik.errors.designation)}
          helperText={formik.touched.designation && formik.errors.designation}
        />
      </div>

      <div className="mb-4">
        <TextField
          label="totDefauts"
          variant="outlined"
          fullWidth
          id="totDefauts"
          name="totDefauts"
          value={formik.values.totDefauts}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.totDefauts && Boolean(formik.errors.totDefauts)}
          helperText={formik.touched.totDefauts && formik.errors.totDefauts}
        />
      </div>

      <div className="mb-4">
        <TextField
          label="qtDefauts"
          variant="outlined"
          fullWidth
          id="qtDefauts"
          name="qtDefauts"
          value={formik.values.qtDefauts}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.qtDefauts && Boolean(formik.errors.qtDefauts)}
          helperText={formik.touched.qtDefauts && formik.errors.qtDefauts}
        />
      </div>
   

       {departements && (
        <Searchinput
          produits={departements}
          selectedProduit={defaut.departement}
          productsValues={handleProducts}
          title="Departements"

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

export default EditDefaut;
