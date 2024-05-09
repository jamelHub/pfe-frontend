import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChartCMS from "../../components/LineChartCMS";

const LineCMS = () => {
    return (
        <Box m="20px" >
            <Header title="CMS " subtitle="Défauts CMS "/>

            <Box height = "75vh">
                <LineChartCMS/>
                
            </Box>
        </Box>
    );
};
export default LineCMS ;
