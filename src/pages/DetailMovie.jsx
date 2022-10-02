import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { withRouter } from "../withRouter";
import { RiStarSFill } from "react-icons/ri";
import Card from '../components/Card';
import { Icon } from '@iconify/react';
import { useFavContext } from '../context/FavoritesProvider'

const DetailMovie = () => {
  const { handleFav } = useFavContext();
  const navigate = useNavigate();
  const location = useLocation()
  const id = useState(location.state.id)
  const [page, setPage] = useState(JSON.parse(1))
  const [simillarMovie, setSimillarMovie] = useState()
  useEffect(() => {
    handleSimillarMovie();
  }, [page])

  const handleSimillarMovie = () => {
    var axios = require('axios');
    var data = '';

    var config = {
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/' + id + '/similar?api_key=47182bd87a80c318c05c57ae7d42b9e2&language=en-US&page=' + page,
      headers: {},
      data: data
    };

    axios(config)
      .then(function (response) {
        if (page === 1) {
          setSimillarMovie(response.data.results);
        } else {
          var joined = simillarMovie.concat(response.data.results);
          setSimillarMovie(joined)
        }
        console.log(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  // const handleSimillarMovie = () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Authorization", "Bearer " + process.env.REACT_APP_API_KEY);

  //   var requestOptions = {
  //     method: 'GET',
  //     headers: myHeaders,
  //     redirect: 'follow'
  //   };

  //   fetch(`https://api.themoviedb.org/3/movie/${id}/347201?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`, requestOptions)
  //     .then(response => response.text())
  //     .then(result => {
  //       setSimillarMovie(JSON.parse(result).results)
  //       console.log(JSON.parse(result).results)
  //       //   if (page === 1) {
  //       //     setSimillarMovie(JSON.parse(result).results)
  //       //   } else {
  //       //     var joined = simillarMovie.concat(JSON.parse(result).results);
  //       //     setSimillarMovie(joined)
  //       //   }
  //       //   console.log(JSON.parse(result).results)
  //     }
  //     )
  //     .catch(error => console.log('error', error));
  // }


  const moreSimillar = () => {
    setPage(page + 1)
    handleSimillarMovie();
  }

  const handleDetailPage = (item) => {
    navigate(`/detail/${item.id}`, {
      state: {
        id: item.id,
        title: item.title,
        image: item.poster_path,
        backdrop_path: item.backdrop_path,
        popularity: item.popularity,
        lang: item.original_language,
        overview: item.overview,
        vote_count: item.vote_count,
        vote_average: item.vote_average,
        release_date: item.release_date
      },
    });
  }

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
              <div className='mt-6 flex w-full overflow-x-auto scroll-smooth flex-row'>
                {/* {simillarMovie ? simillarMovie.map((item, index) => {
                  return (
                    <p key={index}>{item.title}</p>
                  )
                }) : <p>data gak kebaca</p>} */}
                {simillarMovie ? simillarMovie.map((item, index) => {
                  return (
                    <div className='mr-4' key={index}>
                      <Card id={item.id} title={item.title} image={item.poster_path} backdrop_path={item.backdrop_path} rating={item.vote_average} popularity={item.popularity} lang={item.original_language} vote_count={item.vote_count} release_date={item.release_date} overview={item.overview} vote_average={item.vote_average} klik={() => handleDetailPage(item)} fav={() => handleFav(item)} />
                    </div>
                  )
                }) : <p>data gak kebaca</p>}
                < div className='flex flex-col justify-center' >
                  <button className='hover:bg-yellow-500 text-white bg-slate-600 rounded-full w-auto px-2 h-10 ' onClick={() => moreSimillar()}><Icon icon="ic:outline-navigate-next" color="white" width="24" height="24" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default withRouter(DetailMovie);