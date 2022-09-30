import { RiStarSFill } from "react-icons/ri";

const Card = ({ title, image, rating, klik, fav }) => {
  return (
    <div className="bg-yellow-500/50 w-40 h-auto py-2 rounded-lg grid place-content-center px-1 sm:ml-5">
      <div className="flex justify-center">
        <img
          src={
            image
              ? "https://image.tmdb.org/t/p/original/" + image
              : "https://via.placeholder.com/500x750.png/000000/FFFFFF/%20C/O%20https://placeholder.com/?text=No+image"
          }
          alt="Gambar"
          width={140}
        />
      </div>
      <h3 className="text-center font-bold text-white">{title}</h3>
      <h3 className="font-normal italic text-yellow-300 flex text-center ml-1 mt-1">
        <RiStarSFill className="text-2xl" />
        {rating}/10
      </h3>
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
    </div>
  );
};

export default Card;
