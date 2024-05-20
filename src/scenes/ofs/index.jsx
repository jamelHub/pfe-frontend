import Button from "@mui/material/Button";
import Card from "../../components/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getWithExpiry } from "../../util/localstorage";
import { usersActions } from "../../store";

import IconButton from "@mui/material/IconButton";
const TitleUser = [
  "Nom",
  
];

const Ofs = () => {
  const navigate = useNavigate();
  const [of, setOf] = useState([]);
  const handleOfs = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/ofs`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${getWithExpiry("TOKEN")}`,
        },
      });
      if (response.ok) {
        const rs = await response.json();

        setOf(rs);

        // dispatch(usersActions.update(of));
      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      //   setFailed(true);
      //   setPassword('');
    }
  };


  useEffect(() => {
    handleOfs();
  }, []);

  const deleteOf = async (ofId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/ofs/` + ofId, {
        method: "DELETE",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${getWithExpiry("TOKEN")}`,
        },
      });
      handleOfs();

      if (response.ok) {
      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      //   setFailed(true);
      //   setPassword('');
    }
  };

  return (
    <div className="mx-2">
      <h1> ofs </h1>

      <div className="w-full flex justify-end p-4">
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            navigate("/ofs/create");
          }}
        >
          Create new Of
        </Button>
      </div>
      <Card>
        {TitleUser.map((title) => {
          return <div className="w-1/12"> {title}</div>;
        })}
      </Card>
      {of.map((of) => {
        return (
          <Card>
            <div className="w-1/12"> {of.name}</div>

            <div className="flex ">
              <IconButton
                aria-label="edit"
                onClick={() => {
                  navigate("edit/" + of._id);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteIcon onClick={() => deleteOf(of._id)} />
              </IconButton>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Ofs;
