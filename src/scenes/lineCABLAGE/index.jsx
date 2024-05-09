import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChartCABLAGE from "../../components/LineChartCABLAGE";

const LineCABLAGE = () => {
    return (
        <Box m="20px" >
            <Header title="CABLAGE" subtitle="Défauts CABLAGE "/>

            <Box height = "75vh">
                <LineChartCABLAGE/>
                
            </Box>
        </Box>
    );
};
export default LineCABLAGE ;
