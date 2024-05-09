 import { Box, Button, TextField } from "@mui/material";
 import { useFormik } from 'formik';
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from "react-redux";
import { CreateWorkout} from "../../feature/WorkoutSlice";
import { object, string, number, date, InferType } from 'yup';
import { ToastContainer } from "react-toastify";
import Alert from '@mui/material/Alert';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//tawa ey
const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
<ToastContainer />
const userSchema = object({ 
    lastName: string().required("champs obligatoire"),
    age: number().required("champs obligatoire"),
    email: string().email("champs obligatoire"),
    firstName: string().required("champs obligatoire"),
    password: string().required("champs obligatoire"),
    contact: number().required("champs obligatoire"),
    matricule: string().required("champs obligatoire"),
    departement:string().required(),
  });
  const [showAlert, setShowAlert] = useState(false);

  const navigate=useNavigate()
  const formik = useFormik({
    validationSchema:userSchema,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      age:'',
      contact:'',
      matricule:'',
      password:'',
      departement:''
    },
    onSubmit: (values) => {
     alert(JSON.stringify(values)); 
  
    },
  });
  return (
    <>
      {showAlert && (
        <Alert severity="success">
          Workout ajouté avec succès.
        </Alert>
      )}
    <Box m="20px"> 
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      
          <form onSubmit={formik.handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={formik.handleBlur("firstName")}
                onChange={formik.handleChange("firstName")}
                value={formik.values.firstName}
                name="firstName"
                
                sx={{ gridColumn: "span 2" }}
              />
              <div className="error1">
            {formik.touched.firstName && formik.errors.firstName}
          </div>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
                name="lastName"
                sx={{ gridColumn: "span 2" }}
              />
               <div className="error1">
            {formik.touched.lastName && formik.errors.lastName}
          </div>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                name="email"
                
                sx={{ gridColumn: "span 4" }}
              />
               <div className="error1">
            {formik.touched.email && formik.errors.email}
          </div>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.contact}
                name="contact"
                sx={{ gridColumn: "span 4" }}
              />
               <div className="error1">
            {formik.touched.contact && formik.errors.contact}
          </div>
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Age"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.age}
                name="age"
                sx={{ gridColumn: "span 4" }}
              />
               <div className="error1">
            {formik.touched.age && formik.errors.age}
          </div>
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Matricule"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.matricule}
                name="matricule"
                sx={{ gridColumn: "span 4" }}
              />
               <div className="error1">
            {formik.touched.matricule && formik.errors.matricule}
          </div>
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                name="password"
                sx={{ gridColumn: "span 4" }}
              />
           <div className="error1">
            {formik.touched.password && formik.errors.password}
          </div>
              
            </Box>
            <FormGroup onBlur={formik.handleBlur}>
  <FormControlLabel
    control={<Checkbox name="departement" value="CMS" />}
    label="CMS"
    checked={formik.values.departement === 'CMS'}
    onChange={(event) => {
      formik.setFieldValue('departement', event.target.checked ? 'CMS' : '');
    }}
  />
  <FormControlLabel
    control={<Checkbox name="departement" value="CABLAGE" />}
    label="CABLAGE"
    checked={formik.values.departement === 'CABLAGE'}
    onChange={(event) => {
      formik.setFieldValue('departement', event.target.checked ? 'CABLAGE' : '');
    }}
  />
  <FormControlLabel
    control={<Checkbox name="departement" value="TRAD" />}
    label="TRAD"
    checked={formik.values.departement === 'TRAD'}
    onChange={(event) => {
      formik.setFieldValue('departement', event.target.checked ? 'TRAD' : '');
    }}
  />
</FormGroup>


<div className="error1">
           {formik.touched.departement && formik.errors.departement}
          </div>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
                 </Button>
            </Box>
          </form>
    
    </Box>
    </>
  );

};

export default Form;