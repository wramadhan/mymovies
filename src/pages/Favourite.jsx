import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { useFavContext } from '../context/FavoritesProvider';

const Favourite = () => {
  const { fav, deleteFav } = useFavContext();
  const [pageNow] = useState('favourite')

  console.log(fav);
  return (
    <>
      <NavBar pageNow={pageNow} />
      <div className="px-6 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 h-screen">
        <p className="font-bold text-center text-3xl text-white">Favourite Page</p>
        <div className='flex justify-center flex-wrap'>
          {fav ? fav.map((item, index) => {
            return (
              <div className="w-40 mx-4" key={index}>
                <img className='w-full'
                  src={
                    item.item.poster_path
                      ? "https://image.tmdb.org/t/p/original/" + item.item.poster_path
                      : "https://via.placeholder.com/500x750.png/000000/FFFFFF/%20C/O%20https://placeholder.com/?text=No+image"
                  }
                  alt="Gambar"
                />
                <p className='text-center font-bold text-2xl'>{item.item.title}</p>
                {/* <button className='rounded-full mx-auto w-36 text-white bg-blue-700/50 font-bold' onClick={() => deleteFav(item)}>Delete</button> */}
              </div>
            );
          }) : <></>}
        </div>
      </div>
    </>
  )
}


export default Favourite;