import Button from '@mui/material/Button';
import Card from '../../components/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getWithExpiry } from '../../util/localstorage';

import IconButton from '@mui/material/IconButton';
const TitleUser = ['Nom', 'Description', 'Actions'];

const Produits = () => {
  const navigate = useNavigate();
  const [produit, setProduit] = useState([]);
  const handleProduits = async () => {
    try {
      const response = await fetch(`http://pfe.emkatech.tn/api/produits`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getWithExpiry('TOKEN')}`,
        },
      });
      if (response.ok) {
        const rs = await response.json();

        setProduit(rs);

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
    handleProduits();
  }, []);

  const deleteUser = async (produitId) => {
    try {
      const response = await fetch(
        `http://pfe.emkatech.tn/api/produits/` + produitId,
        {
          method: 'DELETE',

          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getWithExpiry('TOKEN')}`,
          },
        }
      );
      handleProduits();

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
      <h1> Produits </h1>

      <div className="w-full flex justify-end p-4">
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            navigate('/produits/create');
          }}
        >
          Create new Produits
        </Button>
      </div>
      <Card>
        {TitleUser.map((title) => {
          return <div className="w-1/12"> {title}</div>;
        })}
      </Card>
      {produit.map((produit) => {
        return (
          <Card>
            <div className="w-1/12"> {produit.name}</div>
            <div className="w-1/12"> {produit.description}</div>

            <div className="flex ">
              <IconButton
                aria-label="edit"
                onClick={() => {
                  navigate('edit/' + produit._id);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteIcon onClick={() => deleteUser(produit._id)} />
              </IconButton>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Produits;
