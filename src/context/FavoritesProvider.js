import React, { useState, createContext, useContext } from "react";

const FavContext = createContext();

export const useFavContext = () => {
  const context = useContext(FavContext);
  const [fav, setFav] = context.fav;

  const handleFav = (item) => {
    const newTodos = [...fav, { item }];
    setFav(newTodos);
    console.log(newTodos);
  };

  const deleteFav = (item) => {
    setFav(fav.pop(item));
  };

  return {
    handleFav,
    fav,
    deleteFav,
  };
};

export const FavoritesProvider = ({ children }) => {
  const [fav, setFav] = useState([]);
  const [deleteFav, setDeleteFav] = useState([]);

  return (
    <FavContext.Provider
      value={{
        fav: [fav, setFav],
        deleteFav: [deleteFav, setDeleteFav],
      }}
    >
      {children}
    </FavContext.Provider>
  );
};
