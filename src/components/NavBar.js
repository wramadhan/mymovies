import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState } from "react";

const NavBar = ({ pageNow }) => {
  const [searchBox, setSearchBox] = useState(false);
  const [burger, setBurger] = useState(false);
  const [input, setInput] = useState("");

  const handleSearchBox = () => {
    setSearchBox(!searchBox);
  };
  const handleBurger = () => {
    setBurger(!burger);
  };
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      alert(input);
    }
  };

  return (
    <>
      <nav className="sticky top-0 w-full h-14 bg-[#032541] px-3 py-2 flex justify-between">
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
        <div>
          <button className="md:hidden" onClick={() => handleBurger()}>
            {burger ? (
              <Icon
                icon="carbon:side-panel-close"
                color="white"
                width="37"
                height="37"
                rotate={1}
              />
            ) : (
              <Icon
                icon="charm:menu-hamburger"
                color="white"
                width="37"
                height="37"
              />
            )}
          </button>
        </div>

        <div className="flex mdmax:hidden">
          <button className="grid mr-4 text-white font-bold mt-2 ml-1 text-md sm:text-xl">
            {pageNow === "home" ? (
              <button className="text-white rounded-full border-white font-bold text-lg w-full flex justify-center">
                <div className="flex flex-col">
                  <h2>Home</h2>
                  <div className="bg-[#01B4E4] w-16 h-[1px]"></div>
                </div>
              </button>
            ) : (
              <Link to={"/"}>Home</Link>
            )}
          </button>
          <button className="mx-4 text-white grid font-bold mt-2 ml-1 text-md sm:text-xl">
            <Link to={"/Favourite"}>Favourites</Link>
          </button>
          <button className="mx-4 text-white grid font-bold mt-2 ml-1 text-md sm:text-xl">
            <Link to={"/settings"}>Settings</Link>
          </button>
          <button className="bg-[#01B4E4] mr-4 shadow-inner shadow-white active:shadow-black text-[#032541] active:text-white/70 active:bg-slate-600 rounded-full w-auto px-2 h-10">
            <Link to={"/hiring"}>
              <h1 className=" font-bold text-lg">Hire Me?</h1>
            </Link>
          </button>
          {pageNow === "home" ? null : (
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
          )}
        </div>
      </nav>
      {searchBox ? (
        <div className="mdmax:hidden sticky w-full py-2 bg-[#032541] flex justify-between top-14 h-auto">
          <input
            onChange={handleInput}
            onKeyPress={handleSearch}
            className="w-11/12 bg-transparent focus:bg-white/50 focus:text-white text-white font-semibold px-2 rounded-full"
            type="text"
            placeholder="Search Movie"
          />
          <button className="rounded-full w-1/12 bg-gradient-to-r from-[#02B5E3] to-[#1ED5AB] text-white font-semibold text-base">
            Search
          </button>
        </div>
      ) : null}
      {burger ? (
        <div className="md:hidden fixed w-full text-center bg-[#032541]">
          <div className="py-2">
            {pageNow === "home" ? (
              <Link to={"/"}>
                <button className="text-white rounded-full border-white font-bold text-lg w-full flex justify-center">
                  <div className="flex flex-col">
                    <h2>Home</h2>
                    <div className="bg-[#01B4E4] w-16 h-[1px]"></div>
                  </div>
                </button>
              </Link>
            ) : (
              <Link to={"/"}>
                <button className="text-white rounded-full border-white font-bold text-lg w-full">
                  <h2>Home</h2>
                </button>
              </Link>
            )}
          </div>
          <div className="py-2">
            {pageNow === "fav" ? (
              <Link to={"/favourite"}>
                <button className="text-white rounded-full border-white font-bold text-lg w-full flex justify-center">
                  <div className="flex flex-col">
                    <h2>Favourites</h2>
                    <div className="bg-[#01B4E4] w-16 h-[1px]"></div>
                  </div>
                </button>
              </Link>
            ) : (
              <Link to={"/favourite"}>
                <button className="text-white rounded-full border-white font-bold text-lg w-full">
                  <h2>Favourites</h2>
                </button>
              </Link>
            )}
          </div>
          <div className="py-2">
            {pageNow === "settings" ? (
              <button className="text-white rounded-full border-white font-bold text-lg w-full flex justify-center">
                <div className="flex flex-col">
                  <h2>Settings</h2>
                  <div className="bg-[#01B4E4] w-16 h-[1px]"></div>
                </div>
              </button>
            ) : (
              <button className="text-white rounded-full border-white font-bold text-lg w-full">
                <h2>Settings</h2>
              </button>
            )}
          </div>
          <div className="py-2">
            {pageNow === "settings" ? (
              <button className="bg-[#01B4E4] shadow-inner shadow-white active:shadow-black text-[#032541] active:text-white active:bg-slate-600 rounded-full w-auto px-2 h-10">
                <Link to={"/hiring"}>
                  <h1 className=" font-bold text-lg">Hire Me?</h1>
                </Link>
              </button>
            ) : (
              <button className="bg-[#01B4E4] shadow-inner shadow-white active:shadow-black  text-[#032541] active:text-white/70 active:bg-slate-600 rounded-full w-auto px-2 h-10">
                <Link to={"/hiring"}>
                  <h1 className=" font-bold text-lg">Hire Me?</h1>
                </Link>
              </button>
            )}
          </div>
          {pageNow === "home" ? null : (
            <div className="py-2">
              <button
                onClick={() => handleSearchBox()}
                className="text-white rounded-full border-white font-bold text-lg w-full"
              >
                <h2>Search Movie</h2>
              </button>
            </div>
          )}

          <div className="py-2">
            {searchBox ? (
              <div className="flex">
                <input
                  placeholder="Search Movie"
                  onKeyPress={handleSearch}
                  onChange={handleInput}
                  className="px-2 text-[#032541] rounded-full border-white font-bold text-lg w-full"
                />
                <button>
                  <Icon
                    icon="icon-park-outline:search"
                    color="white"
                    width="37"
                    height="37"
                  />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default NavBar;
