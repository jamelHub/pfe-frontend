import axios from "axios";

const Get_ofs = async (userData) => {
    const response = await axios.get(`http://localhost:4000/api/ofs`);
    return response.data;
  };

  const Get_of= async (userData) => {
    const response = await axios.get(`http://localhost:4000/api/of/id`);
    return response.data;
  };

  const Create_of = async (data) => {
    const response = await axios.post(`http://localhost:4000/api/of/post`,{
        name:data.name,
        date:data.date,
    });
    return response.data;
  };
  const Delete_of = async (userData) => {
    const response = await axios.delete(`http://localhost:4000/api/of/delete`);
    return response.data;
  };
  const Update_of= async (data) => {
    const response = await axios.patch(`http://localhost:4000/api/of/patch`,{
name:data.name,
date:data.date,
    });
    return response.data;
  };
  export const authservice = {
    Get_ofs,
    Get_of,
    Create_of,
    Delete_of,
    Update_of
  };