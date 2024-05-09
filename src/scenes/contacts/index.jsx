import { Box ,Typography} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Getworkouts } from "../../feature/WorkoutSlice";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

const Contacts = () => {
 

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns= [
        {field: "_id", headerName: "_id" ,flex : 0.07 },
        //{field: "registrarId" , headerName: "Registrar ID" ,flex: 0.1 },

        {field: "firstName", 
        headerName: "First Name" , 
        flex: 0.1 , 
        cellClassName: "name-column-cell",
        },
        {field: "lastName", 
        headerName: "Last Name" , 
        flex: 0.1 , 
        cellClassName: "name-column-cell",
        },
        {field: "age", //kifeh chniya l mochkla? serveur mch y5dm 5dmou kima 5damet ena taw walahy khadamtou bekri wdidet w bara kol chy akes andy hhh
        headerName: "Age" ,//mn terminal m3dch t3ml bl git ok
        type : "number",//bhy cht7b t5dm tawa bhy eni ala ases bekri jebet hadhom lena mtaa3 l manage ama chou lahdah
        headerAlign: "left",
        align: " left", 
        flex: 0.07 , 
        //m3ndnech lo5rin fl info li 3ndna checkbox mahouch qaade yetqra eli f form w  lokhra bech naheha ataw n5dhelk l7dha
        },
        {
            field: "contact", 
        headerName: "Phone Number" , 
        flex: 0.1, 
        },

        {
            field: "email", 
        headerName: "Email" , 
        flex: 0.1 , 
        },
        {
            field: "departement", 
        headerName: "Departement" , 
        flex: 0.1 , 
        },// hedhy lazem taqra wahda m checkbox
        {
            field: "matricule", 
        headerName: "Matricule" , 
        flex: 0.1 , 
        }, {
            field: "password", 
        headerName: "Password" , 
        flex: 0.1 , 
        },
       
    ];
    //const transformedData = workoutsState.map(row => ({ ...row, id: row._id }));
//behy hedhy eli 3a9detny nhar kaml yaamali indefided
    return (
        <Box m="20px">
            <Header title ="CONTACTS"  subtitle= "Liste des contactes de future références" />
            < Box m= "40px 0 0 0" height = "75vh"
            sx= {{ "& .MuiDataGrid-root":{

                border:"none",
            },
            "& .MuiDataGrid-cell": {
                borderBottom: "none",
            },
            "& .name-column--cell": {
                color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
            },

            "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
            },

            "& .MuiDataGrid-footerContainer": {
               
                backgroundColor: colors.blueAccent[700],
                borderTop: "none",
                
            },
            "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
            },

             }}>
                      

    {/*      <DataGrid 
    rows={workoutsState}
    columns={columns}
    getRowId={(row) => row._id}
    components={{ Toolbar: GridToolbar }}                                                           
        /> */}

            </Box>
        </Box>
    );
};
export default Contacts ;