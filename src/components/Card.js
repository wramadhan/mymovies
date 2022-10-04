import { RiStarSFill } from "react-icons/ri";
import React, { useEffect, useState } from "react";

const Card = ({ release_date, title, image, rating, klik, fav }) => {
  const [date, setDate] = useState("release");
  useEffect(() => {
    handleDate();
  }, []);
  const handleDate = () => {
    var parts = release_date.split("-");
    var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
    setDate(mydate.toDateString());
  };
  return (
    <>
      <div className=" w-40 h-[350px] py-2 rounded-lg  px-1 mr-2">
        <div className="flex justify-center">
          <img
            className="rounded-lg"
            src={
              image
                ? "https://image.tmdb.org/t/p/original/" + image
                : "https://via.placeholder.com/500x750.png/000000/FFFFFF/%20C/O%20https://placeholder.com/?text=No+image"
            }
            alt="Gambar"
            width={140}
          />
        </div>
        <h3 className="text-center font-bold">{title}</h3>
        <h3 className="font-normal italic text-yellow-700 flex text-center ml-1 mt-1">
          <RiStarSFill className="text-2xl" />
          {rating * 10}%
        </h3>
        <p>{date}</p>
      </div>
      <div className="grid gap-1">
        <button
          className="rounded-full mx-auto w-36 text-white bg-blue-700/50 font-bold"
          onClick={klik}
        >
          Detail
        </button>
        <button
          className="rounded-full mx-auto w-36 text-white bg-blue-700/50 font-bold"
          onClick={fav}
        >
          Add to Favourites
        </button>
      </div>
    </>
  );
};

export default Card;
