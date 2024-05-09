import axios from "axios";

const Get_products = async (userData) => {
    const response = await axios.get(`http://localhost:4000/api/products`);
    return response.data;
  };

  const Get_product= async (userData) => {
    const response = await axios.get(`http://localhost:4000/api/products/id`);
    return response.data;
  };

  const Create_product = async (data) => {
    const response = await axios.post(`http://localhost:4000/api/products/post`,{
        name:data.name,
    });
    return response.data;
  };
  const Delete_product = async (userData) => {
    const response = await axios.delete(`http://localhost:4000/api/products/delete`);
    return response.data;
  };
  const Update_product = async (data) => {
    const response = await axios.patch(`http://localhost:4000/api/products/patch`,{
name:data.name,
    });
    return response.data;
  };
  export const authservice = {
    Get_products,
    Get_product,
    Create_product,
    Delete_product,
    Update_product
  };