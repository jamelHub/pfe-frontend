import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getWithExpiry } from '../../util/localstorage';
import React, { useEffect, useState } from 'react';


const Templates = () => {
  const navigate = useNavigate();

  const [names, setNames] = useState([])

  useEffect(() => {
    // Base URL
    const baseUrl = 'http://3.82.219.248/proxy/apis/templates.gatekeeper.sh/v1beta1/constrainttemplates/';

    // Make the GET request using Axios
    axios.get(baseUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getWithExpiry("kubeToken")}`,
      }
    })
      .then(response => {
        if( response.status >= 200 && response.status < 300)
{
  const rs = response.data.items;
  setNames(rs)

}

      });
      
  }, []);
  const baseUrl = 'http://3.82.219.248/proxy/apis/templates.gatekeeper.sh/v1beta1/constrainttemplates/';

  // Function to delete a constraint template by name
  function deleteConstraintTemplate(resourceName) {
    // Construct the full URL including the resource name
    const deleteUrl = `${baseUrl}${resourceName}`;
  
    // Make the DELETE request using Axios
    axios.delete(deleteUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getWithExpiry("kubeToken")}`,
      }
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        // Handle successful deletion
        console.log('Resource deleted successfully');
        // Perform any additional actions if needed, e.g., updating the UI
      }
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response:', error.response.status);
        console.error('Error details:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
      }
    });
  }
  
  // Example usage: Call the function with the dynamic resource name
  let dynamicResourceName = 'nn'; // This should be dynamically set
  deleteConstraintTemplate(dynamicResourceName);
  
  // Example: Dynamically setting the resource name
  dynamicResourceName = 'anotherResourceName';
  deleteConstraintTemplate(dynamicResourceName);
  
  const list = names.map(obj => obj.metadata.name);

  console.log("list =>", list)

  return (
    <Box >
      <Header title="Templates" />
      <div className="mx-2 my-8">
        <span>  List of Templates</span>
        <Button color="primary" variant="contained" className="float-right m-4"
          onClick={() => {
            navigate('/templates/create');
          }} >
          Create Template</Button>

      </div>
      <div className="flex flex-col gap-2">
      {
        list.map((name) => {
          return   <Card name={name}></Card>

        })
      } 
      </div>
  
    </Box>
  );
};

export default Templates