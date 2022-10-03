import React, { useState } from "react";
import { Icon } from "@iconify/react";

const Wellcome = () => {
  const [inputSearch, setInputSearch] = useState();
  const handleInputSearch = (e) => {
    setInputSearch(e.target.value);
  };

  return (
    <div className="bg-cover bg-center w-full h-60 bg-[url('https://source.unsplash.com/1600x900/?movie')]">
      <div className="w-full h-full bg-[#032541]/50 sm:px-10 py-12">
        <h1 className="text-white w-auto text-5xl font-bold">Wellcome</h1>
        <h2 className="text-white w-auto text-2xl font-semibold">
          Millions of movies, TV shows and people to discover. Explore now.
        </h2>
        <div className="flex w-full">
          <input
            className="w-full focus:bg-[#032541]/40 rounded-full px-2 py-[1px] text-white bg-transparent border-[1px] border-white focus:border-black text-lg font-medium"
            type="text"
            placeholder="looking for a movie"
            onChange={handleInputSearch}
          />
          <button>
            <Icon icon="bx:search-alt" color="white" width="50" height="50" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Wellcome;
