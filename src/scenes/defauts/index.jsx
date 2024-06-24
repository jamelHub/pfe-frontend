import Button from '@mui/material/Button';
import Card from '../../components/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getWithExpiry } from '../../util/localstorage';

import IconButton from '@mui/material/IconButton';
const TitleUser = [
  'Code',
  'Designation',
  'qtDefauts',
  'totalDefauts',
  'Actions',
];

const Defaut = () => {
  const navigate = useNavigate();
  const [defaut, setDefaut] = useState([]);
  const handleDefauts = async () => {
    try {
      const response = await fetch(`http://pfe.emkatech.tn/api/defauts`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getWithExpiry('TOKEN')}`,
        },
      });
      if (response.ok) {
        const rs = await response.json();

        setDefaut(rs);
        console.log('users', defaut);

        // dispatch(usersActions.update(defaut));
      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      //   setFailed(true);
      //   setPassword('');
    }
  };
  useEffect(() => {
    handleDefauts();
  }, []);

  const deleteDefaut = async (defautId) => {
    try {
      const response = await fetch(
        `http://pfe.emkatech.tn/api/defauts/` + defautId,
        {
          method: 'DELETE',

          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getWithExpiry('TOKEN')}`,
          },
        }
      );
      handleDefauts();

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
      <h1> defauts </h1>

      <div className="w-full flex justify-end p-4">
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            navigate('/defauts/create');
          }}
        >
          Create new Defauts
        </Button>
      </div>
      <Card>
        {TitleUser.map((title) => {
          return <div className="w-1/12"> {title}</div>;
        })}
      </Card>
      {defaut.map((defaut) => {
        return (
          <Card>
            <div className="w-1/12"> {defaut.code}</div>
            <div className="w-1/12"> {defaut.designation}</div>
            <div className="w-1/12"> {defaut.qtDefauts}</div>
            <div className="w-1/12"> {defaut.totDefauts}</div>

            <div className="flex ">
              <IconButton
                aria-label="edit"
                onClick={() => {
                  navigate('edit/' + defaut._id);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteIcon onClick={() => deleteDefaut(defaut._id)} />
              </IconButton>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Defaut;
