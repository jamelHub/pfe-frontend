import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getWithExpiry } from '../../util/localstorage';
import React, { useEffect, useState } from 'react';

const Constraints = () => {
  const navigate = useNavigate()
  const [names, setNames] = useState([])
  useEffect(() => {
    // Base URL
    const baseUrl = `http://34.232.68.212/proxy/apis/constraints.gatekeeper.sh/v1beta1/`;

    // Make the GET request using Axios
    axios.get(baseUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getWithExpiry("kubeToken")}`,
      }
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          const rs = response.data.items;
          setNames(rs);

        }

      });

  }, []);
 const list = names.map(obj => obj.metadata.name);
  function deleteConstraint(nameConstraint) {
    console.log("name Constraint ", nameConstraint)
    const baseUrl = `http://34.232.68.212/proxy/apis/templates.gatekeeper.sh/v1beta1/constrainttemplates/`;

    // Construct the full URL including the resource nameTemplate
    const deleteUrl = `${baseUrl}${nameConstraint}` ;

    // Make the DELETE request using Axios
    axios.delete(deleteUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getWithExpiry("kubeToken")}`,
      }
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {

          const updatedItems = names.filter(obj => obj.metadata.name != nameConstraint)
          setNames(updatedItems)
        }
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error('Error details:', error.response.data);
        } 
      });
  }

  const theme = useTheme();
  return (
    <Box >
      <Header title="Constraints" />
    <div className="mx-2 my-8">
      <span>  List of Constraints</span>
      <Button color="primary"  variant="contained" className="float-right m-4" 
             onClick={() => {
              navigate('/constraints/create');
            }} >
          Create Constraint</Button>

    </div>
    <div className="flex flex-col gap-2">
        {
          list.map((n) => {
            return <Card  key={n}  nameT={n} deleteConstraint={() => deleteConstraint(n)}></Card>

          })
        }
      </div>

  <Card>
  </Card>
    </Box>
  );
};

export default Constraints;