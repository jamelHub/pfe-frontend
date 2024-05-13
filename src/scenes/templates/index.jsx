import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const Templates = () => {
  const navigate = useNavigate();



  const theme = useTheme();
  

  return (
    <Box >
      <Header title="Templates" />
    <div className="mx-2 my-8">
      <span>  List of Templates</span>
      <Button color="primary"  variant="contained" className="float-right m-4"          
       onClick={() => {
            navigate('/templates/create');
          }} >
        Create Template</Button>

    </div>

  <Card></Card>
    </Box>
  );
};

export default Templates