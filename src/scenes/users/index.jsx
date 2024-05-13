import Button from '@mui/material/Button';
import Card from '../../components/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

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

const User = [
  'example@gmail.com',
  'example',
  '123456789',
  '12345678',
  'true',
  'false',
  'CMS',
];

const Users = () => {
  const navigate = useNavigate();

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
      <Card>
        {User.map((title) => {
          return <div className="w-1/12"> {title}</div>;
        })}

        <div className="flex ">
          <IconButton aria-label="delete">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>
      </Card>
      <Card>
        {User.map((title) => {
          return <div className="w-1/12"> {title}</div>;
        })}

        <div className="flex ">
          <IconButton aria-label="delete">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>
      </Card>
    </div>
  );
};

export default Users;
