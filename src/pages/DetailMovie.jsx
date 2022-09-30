import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { withRouter } from "../withRouter";
import { RiStarSFill } from "react-icons/ri";


const DetailMovie = () => {
  const location = useLocation()
  return (
    <>
      <div className="text-white font-serif bg-gradient-to-r from-blue-500 to-lime-500 h-auto w-full">
        <div className='w-full h-auto' style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${location.state.backdrop_path})`
        }}>
          <NavBar />
          <div className='px-12 py-6'>
            <h1 className="text-center text-4xl mb-4 font-bold text-sky-900 bg-slate-400/50 rounded border-8 border-slate-900/25 py-4 sm:px-4">{location.state.title}</h1>
            <div className='flex bg-slate-400/50 rounded border-8 border-slate-900/25 py-4 sm:px-4'>

              <img src={
                location.state.image
                  ? "https://image.tmdb.org/t/p/original/" + location.state.image
                  : "https://via.placeholder.com/500x750.png/000000/FFFFFF/%20C/O%20https://placeholder.com/?text=No+image"
              } className='h-40 sm:h-80' alt='gambar' />
              <div className='grid gap-4 content-center font-medium ml-4'>
                <p>Release Date: {location.state.release_date}</p>
                <p>Popularity: {location.state.popularity}</p>
                <p>Vote Total: {location.state.vote_count}</p>
                <p>Language: {location.state.lang}</p>
                <p className="flex">Rating: <RiStarSFill className='mt-1 text-lg' /> {location.state.vote_average}</p>
              </div>
            </div>
            <div className='bg-slate-400/50 mt-4 rounded p-2 border-8 border-slate-900/25'>
              <h2 className="text-xl font-bold">Overview :</h2>
              <p className="text-justify">{location.state.overview}</p>
            </div>
            <div className='bg-slate-400/50 mt-4 rounded p-2 border-8 border-slate-900/25'>
              <h2 className="text-xl text-center font-bold">Similar Movies</h2>
              <h2 className="text-xl text-center">Soon</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default withRouter(DetailMovie);