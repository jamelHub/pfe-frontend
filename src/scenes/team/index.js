import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Getworkouts } from "../../feature/WorkoutSlice";
import { useNavigate } from "react-router-dom";

const Team = () => {



 const workoutsState=useSelector((state)=>state.auth.user)
  console.log(workoutsState);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {field: "_id", headerName: "_id" ,flex : 1 },
    {field: "firstName", 
    headerName: "First Name" , 
    flex: 1 , 
    cellClassName: "name-column-cell",
    },
    {field: "lastName", 
    headerName: "Last Name" , 
    flex: 1 , 
    cellClassName: "name-column-cell",
    },
    {
      field: "departement", 
  headerName: "Departement" , 
  flex: 1 , 
  },
   
  {
    field: "matricule", 
headerName: "Matricule" , 
flex: 1 , 
}, {
    field: "password", 
headerName: "Password" , 
flex: 1 , 
},
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];
const transformedData = workoutsState && workoutsState.map(row => ({ ...row, id: row._id })) ;

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
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
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >



       <DataGrid  
        getRowId={(row) => row._id} 
        rows={workoutsState} 
        columns={columns}
        components={{
          Toolbar: GridToolbar
        }}
        />



      </Box>
    </Box>
  );
};

export default Team;