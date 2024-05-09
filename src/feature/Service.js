import axios from "axios";

const Creecart = async (userData) => {
    const response = await axios.get(`http://127.0.0.1:5000/api/brand/getallbrand`);
    return response.data;
  };

  export const authservice = {
    Creecart,
  };
  