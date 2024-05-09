import axios from "axios";

const Get_defauts = async (userData) => {
    const response = await axios.get(`http://localhost:4000/api/defauts`);
    return response.data;
  };

  const Get_defaut= async (userData) => {
    const response = await axios.get(`http://localhost:4000/api/defaut/id`);
    return response.data;
  };

  const Create_defaut = async (data) => {
    const response = await axios.post(`http://localhost:4000/api/defaut/post`,{
        code:data.code,
        designiation:data. designiation
    });
    return response.data;
  };
  const Delete_defaut= async (userData) => {
    const response = await axios.delete(`http://localhost:4000/api/defaut/delete`);
    return response.data;
  };
  const Update_defaut = async (data) => {
    const response = await axios.patch(`http://localhost:4000/api/defaut/patch`,{
name:data.name,
    });
    return response.data;
  };
  export const authservice = {
    Get_defauts,
    Get_defaut,
    Create_defaut,
    Delete_defaut,
    Update_defaut
  };