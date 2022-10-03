import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const NavBar = ({ theme }) => {
  return (
    <>
      <nav className="sticky top-0 w-full h-14 bg-neutral-700 px-3 py-1 flex justify-between">
        <div className="flex">
          <MdOutlineLocalMovies className="text-white w-8 h-8 mt-1 sm:w-11 sm:h-11" />
          <h1 className="text-white font-bold mt-2 ml-1 text-md sm:text-xl">
            <Link to={"/"}>Yoe Movie</Link>
          </h1>
          <MdOutlineLocalMovies className="text-white w-8 h-8 mt-1 sm:w-11 sm:h-11" />
          <button>
            <input
              type="text"
              placeholder="Search Movie"
              className="bg-transparent focus:bg-yello-700 text-white"
            />
            {/* <Icon icon="bx:search-alt" color="white" width="50" height="50" /> */}
          </button>
        </div>
        <button className="grid text-white font-bold mt-2 ml-1 text-md sm:text-xl">
          <Link to={"/"}>Home</Link>
        </button>
        <button className="text-white grid font-bold mt-2 ml-1 text-md sm:text-xl">
          <Link to={"/Favourite"}>Favourites</Link>
        </button>
      </nav>
    </>
  );
};
export default NavBar;
