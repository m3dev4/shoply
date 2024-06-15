import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFavorites } from '../../redux/features/favoritesSlice';
import Product from '../products/product';

const FavoritePage = () => {
  const favoritesFromRedux = useSelector(selectFavorites);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(favoritesFromRedux);
  }, [favoritesFromRedux]);

  return (
    <div className="ml-40">
      <h1 className="text-lg text-white font-bold ml-[3rem] mt-[3rem]">
        Votre liste de favoris
      </h1>
      <div className="flex flex-wrap">
        {favorites && favorites.length > 0 ? (
          favorites.map((product) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <p className="text-white">Aucun favori pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritePage;