import axios from "axios";

const Get_departements = async (userData) => {
    const response = await axios.get(`http://localhost:4000/api/departements`);
    return response.data;
  };

  const Get_departement= async (userData) => {
    const response = await axios.get(`http://localhost:4000/api/departement/id`);
    return response.data;
  };

  const Create_departement = async (data) => {
    const response = await axios.post(`http://localhost:4000/api/departement/post`,{
        name:data.name,
    });
    return response.data;
  };
  const Delete_departement = async (userData) => {
    const response = await axios.delete(`http://localhost:4000/api/departement/delete`);
    return response.data;
  };
  const Update_departement = async (data) => {
    const response = await axios.patch(`http://localhost:4000/api/departement/patch`,{
name:data.name,
    });
    return response.data;
  };
  export const authservice = {
    Get_departements,
    Get_departement,
    Create_departement,
    Delete_departement,
    Update_departement
  };