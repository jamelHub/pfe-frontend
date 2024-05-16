import Button from '@mui/material/Button';
import Card from '../../components/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getWithExpiry } from '../../util/localstorage';
import { usersActions } from '../../store';

import IconButton from '@mui/material/IconButton';
const TitleUser = [
  'Email',
  'Nom',
  'Matricule',
  'Password',
  'Administrator',
  'Responsable',
  'Departement',
  'Actions',
];

const Users = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const handleUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/user`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getWithExpiry('TOKEN')}`,
        },
      });
      if (response.ok) {
        const rs = await response.json();

        setUser(rs);
        console.log('users', user);
        // dispatch(usersActions.update(user));
      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      //   setFailed(true);
      //   setPassword('');
    }
  };
  useEffect(() => {
    handleUsers();
  }, []);
  

const deleteUser = async (userId) =>{
  try {
    const response = await fetch(`http://localhost:8080/api/user/`+userId, {
      method: 'DELETE',

      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getWithExpiry('TOKEN')}`,
      },
    });
    handleUsers();

    if (response.ok) {


      // dispatch(usersActions.update(user));
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    //   setFailed(true);
    //   setPassword('');
  }
}

  return (
    <div className="mx-2">
      <h1> users </h1>

      <div className="w-full flex justify-end p-4">
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            navigate('/users/create');
          }}
        >
          Create new User
        </Button>
      </div>
      <Card>
        {TitleUser.map((title) => {
          return <div className="w-1/12"> {title}</div>;
        })}
      </Card>
      {user.map((user) => {
        return (
          <Card>
            <div className="w-1/12"> {user.email}</div>
            <div className="w-1/12"> {user.nom}</div>
            <div className="w-1/12"> {user.matricule}</div>
            <div className="w-1/12"> {user.password}</div>
            <div className="w-1/12">
              {user.administrator ? ' admin' : 'User'}
            </div>
            <div className="w-1/12">
              {user.responsable ? ' Responsable' : 'Ouvrier'}
            </div>
            <div className="w-1/12"> {user.departement}</div>
            <div className="flex ">
              <IconButton
                aria-label="edit"
                onClick={() => {
                  navigate('edit/' + user._id);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteIcon  onClick={()=>deleteUser(user._id)} />
              </IconButton>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Users;
