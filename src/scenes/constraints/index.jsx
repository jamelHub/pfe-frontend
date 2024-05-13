import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Button from '@mui/material/Button';


const Constraints = () => {
  


  const theme = useTheme();
  

  return (
    <Box >
      <Header title="Constraints" />
    <div className="mx-2 my-8">
      <span>  List of Constraints</span>
      <Button color="primary"  variant="contained" className="float-right m-4" >Create Constraint</Button>

    </div>

  <Card></Card>
    </Box>
  );
};

export default Constraints;