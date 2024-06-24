import Button from '@mui/material/Button';
import Card from '../../components/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getWithExpiry } from '../../util/localstorage';

import IconButton from '@mui/material/IconButton';
const TitleUser = ['Date'];

const Fichiers = () => {
  const navigate = useNavigate();
  const [defaut, setDefaut] = useState([]);
  const handleFichiers = async () => {
    try {
      const response = await fetch(`http://pfe.emkatech.tn/api/fichiers`, {
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
    handleFichiers();
  }, []);

  return (
    <div className="mx-2">
      <h1> Fichiers </h1>
      <Card>
        {TitleUser.map((title) => {
          return <div className="w-1/12"> {title}</div>;
        })}
      </Card>
      {defaut.map((defaut) => {
        return (
          <Card>
            <div className="w-1/12">
              {new Date(defaut.createdAt).toDateString()}
            </div>
            <div className="w-1/12">
              {defaut.defauts.map((d) => {
                return <span> {d.code} </span>;
              })}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Fichiers;
