import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import {
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

import { getWithExpiry } from "../../util/localstorage";

import { useNavigate } from "react-router-dom";

import Searchinput from "../../components/SearchInput";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});

const EditProduit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [produit, setProduit] = useState(null);

  const [ofs, setOfs] = useState([]);

  const [ofIds, setOfsIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOfs();
  }, []);

  const fetchOfs = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/ofs`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${getWithExpiry("TOKEN")}`,
        },
      });
      const data = await response.json();

      setOfs(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    const fetchProduit = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/produits/${id}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${getWithExpiry("TOKEN")}`,
            },
          }
        );
        const data = await response.json();

        setProduit(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchProduit();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      description: produit ? produit.description : "",
      name: produit ? produit.name : "",
   
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const updated = {
          ...values,
          ofs: ofIds,
        };

        console.log(" updated data ", updated);
        const response = await fetch(`http://localhost:8080/api/produits/${id}`, {
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
        navigate("/produits");

        console.log("Success:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  if (loading) {
    return <CircularProgress />;
  }

  const handleOfs = (data) => {
    let listOf = [];
    data.map((of) => {
      if (of?._id) {
        listOf.push(of?._id);
      }
    });
    setOfsIds(listOf);
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
          error={formik.touched.description && Boolean(formik.errors.description)}
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
          selectedProduit={produit.ofs}
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

export default EditProduit;
