import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState } from "react";

const NavBar = () => {
  const [searchBox, setSearchBox] = useState(false);

  const handleSearchBox = () => {
    setSearchBox(!searchBox);
    console.log(searchBox);
  };
  return (
    <>
      <nav className="sticky top-0 w-full h-14 bg-[#032541] px-3 py-1 flex justify-between">
        <div className="flex">
          <Icon
            icon="arcticons:jiocinema"
            color="white"
            width="37"
            height="37"
          />
          <h1 className="text-white font-bold mt-2 ml-1 text-md sm:text-xl">
            <Link to={"/"}>Wahyoe Cinema</Link>
          </h1>
        </div>
        <div className="flex">
          <button className="grid mr-4 text-white font-bold mt-2 ml-1 text-md sm:text-xl">
            <Link to={"/"}>Home</Link>
          </button>
          <button className="mx-4 text-white grid font-bold mt-2 ml-1 text-md sm:text-xl">
            <Link to={"/Favourite"}>Favourites</Link>
          </button>
          <button onClick={() => handleSearchBox()}>
            {searchBox ? (
              <Icon
                icon="codicon:search-stop"
                color="white"
                width="37"
                height="37"
                hFlip={true}
              />
            ) : (
              <Icon
                icon="icon-park-outline:search"
                color="white"
                width="37"
                height="37"
              />
            )}
          </button>
        </div>
      </nav>
      {searchBox ? (
        <div className="sticky w-full py-2 bg-[#032541] flex justify-between top-14 h-auto">
          <input
            className="w-11/12 bg-transparent focus:bg-white/50 focus:text-white text-yellow-400 font-semibold px-2 rounded-full"
            type="text"
            placeholder="Search Movie"
          />
          <button className="rounded-full w-1/12 bg-gradient-to-r from-[#02B5E3] to-[#1ED5AB] text-white font-semibold text-base">
            Search
          </button>
        </div>
      ) : null}
    </>
  );
};
export default NavBar;
