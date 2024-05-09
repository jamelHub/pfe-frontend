import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";

const Pie = () => {
    return (
        <Box m="20px" >
            <Header title="Pourçentage des défauts" subtitle="Défauts dans chaque département"/>

            <Box height = "75vh">
                <PieChart/>
                
            </Box>
        </Box>
    );
};
export default Pie ;