import axios from "axios";

const Get_workouts = async (userData) => {
    const response = await axios.get(`http://localhost:4000/api/workouts/a`);
    return response.data;
  };//n5dmou l get ?ey

  const Get_workout = async (userData) => {
    const response = await axios.get(`http://localhost:4000/api/workouts/${userData}`);
    return response.data;
  };

  const Create_workout = async (data) => {
    const response = await axios.post(`http://localhost:4000/api/workouts/post`,{
lastName:data.lastName,
password:data.password,
firstName:data.firstName,
matricule:data.matricule,
age:data.age,
email:data.email,
contact:data.contact,
departement:data.departement
    });
    return response.data;
  };
  const Delete_workout = async (userData) => {
    const response = await axios.delete(`http://localhost:4000/api/workouts/delete`);
    return response.data;
  };
  const Update_workout = async (data) => {
    const response = await axios.patch(`http://localhost:4000/api/workouts/patch`,{
lastName:data.lastName,
password:data.password,
firstName:data.firstName,
matricule:data.matricule,
age:data.age,
email:data.email,
contact:data.contact
    });
    return response.data;
  };
  export const authservice = {
    Get_workouts,
    Get_workout,
    Create_workout,
    Delete_workout,
    Update_workout
  };