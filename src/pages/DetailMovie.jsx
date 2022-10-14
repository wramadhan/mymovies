import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';
import { withRouter } from "../withRouter";
import { BsFillPlayFill } from "react-icons/bs";
import { Icon } from '@iconify/react';
import { useFavContext } from '../context/FavoritesProvider'
import Card from '../components/Card'
{/* <NumberFormat value={2456981} displayType={'text'} thousandSeparator={true} prefix={'$'} /> */ }

const DetailMovie = () => {
  const { handleFav } = useFavContext();
  const [genres, setGenres] = useState();
  // const [budget, setBudget] = useState('unknown budget');
  const navigate = useNavigate();
  const location = useLocation()
  const id = useState(location.state.id)
  const [page, setPage] = useState(JSON.parse(1))
  const [simillarMovie, setSimillarMovie] = useState()
  const [vote, setVote] = useState();
  const [showTrailer, setShowTrailer] = useState(false);
  // const [runtime, setRuntime] = useState();
  const [overview, setOverview] = useState();
  const [key, setKey] = useState();

  const scrollMovie = () => {
    const section = document.querySelector(".trailer");
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    handleSimillarMovie();
  }, [page])

  useEffect(() => {
    showDetail();
    getTrailer();
  }, []);

  const getTrailer = () => {
    var axios = require('axios');
    var data = '';

    var config = {
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=47182bd87a80c318c05c57ae7d42b9e2',
      headers: {},
      data: data
    };

    axios(config)
      .then(function (response) {
        setKey(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });

  };
  const showDetail = () => {
    let axios = require('axios');
    let FormData = require('form-data');
    let data = new FormData();

    let config = {
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/' + id + '?api_key=47182bd87a80c318c05c57ae7d42b9e2&language=en-US',
      data: data
    };

    axios(config)
      .then((response) => {
        // console.log(response.data.runtime);
        setVote(Math.round((response.data.vote_average) * 100) / 100);
        setGenres(response.data.genres);
        setOverview(response.data.overview);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const handleSimillarMovie = () => {
    let axios = require('axios');
    let data = '';

    let config = {
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/' + id + '/similar?api_key=' + process.env.REACT_APP_API_KEY + '&language=en-US&page=' + page,
      headers: {},
      data: data
    };

    axios(config)
      .then((response) => {
        if (page === 1) {
          setSimillarMovie(response.data.results);
        } else {
          var joined = simillarMovie.concat(response.data.results);
          setSimillarMovie(joined)
        }
        // console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });

  }
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

  const handleShowTrailer = () => {
    // scrollMovie()
    setShowTrailer(true);
  };
  const handleNotShowTrailer = () => {
    setShowTrailer(false);
  };

  return (
    <>
      <div className="text-white font-serif bg-white">
        <NavBar />
        <div className='bg-cover w-full h-auto md:h-[574px]' style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${location.state.backdrop_path})`
        }}>
          <div className="md:flex w-full h-full bg-[#032541]/60 px-4 sm:px-10 py-4 md:py-12">
            <div className='w-full mdmax:flex mx-auto md:h-[510px] mdmax:w-[290px] rounded-xl overflow-hidden md:w-[300px]'>
              <img src={
                location.state.image
                  ? "https://image.tmdb.org/t/p/original/" + location.state.image
                  : "https://via.placeholder.com/500x750.png/000000/FFFFFF/%20C/O%20https://placeholder.com/?text=No+image"
              } className='w-full mdmax:w-7/12 sm:h-9/12' alt='gambar' />
              <button onClick={handleShowTrailer} className='hover:shadow-inner mdmax:text-center hover:shadow-white/50 active:shadow-inner active:shadow-black active:text-white/70 md:flex w-full md:h-3/12 bg-[#032541] justify-center'>
                <div className='mdmax:flex mdmax:justify-center'>
                  <Icon className='mr-2' icon="ant-design:youtube-filled" color="white" width="55" />
                </div>
                <div>
                  <h1>Now Streaming</h1>
                  <h2 className='font-semibold'>Watch Now</h2>
                </div>
              </button>
            </div>
            <div className='md:pt-20 mdmax:ml-6 md:w-8/12'>
              <h1 className='mdmax:my-4 text-3xl mdmax:text-center font-bold'>{location.state.title}</h1>
              <h2 className='mdmax:text-center'>
                {genres ? (genres.map((item, index) => {
                  return (
                    <span key={index}>{item.name}, </span>
                  );
                })) : (<span>Unknown Genre</span>)}
              </h2>
              <div className='mdmax:flex justify-center'>
                <h2 className='text-xl font-semibold my-4'><span className='bg-[#032541] rounded-full p-2'>{vote}%</span> User Score</h2>
              </div>
              <div className='mdmax:flex mdmax:justify-center'>
                <button className='bg-[#032541] p-2 rounded-full hover:shadow-white/30 active:shadow-black shadow-inner'>
                  <Icon icon="ant-design:heart-filled" color="white" width="17" />
                </button>
              </div>
              <div className='mdmax:flex justify-center my-4'>
                <button className='hover:bg-[#032541] active:bg-[#032541] p-2 rounded-full hover:shadow-white/30 active:shadow-black shadow-inner font-bold flex active:text-white/60' onClick={handleShowTrailer}>
                  <BsFillPlayFill className='text-xl mr-2' />Watch Movie</button>
              </div>
              <h2 className='font-bold text-lg mdmax:text-center mdmax:my-6'>Overview</h2>
              <p className='text-sm text-justify'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{overview}</p>
            </div>
          </div>
        </div>
        <div className='w-full'>
          {showTrailer ? (<>
            <div className='bg-white w-screen fixed top-20'>
              <h2 className='my-4 font-bold text-4xl text-[#032541] text-center'>Watch Trailer</h2>
              <button onClick={handleNotShowTrailer} className='w-screen justify-center text-[#032541] flex text-xl font-semibold'>
                Close Trailer<Icon icon="bx:window-close" color="#032541" width="30" inline={true} />
              </button>
              <div className='flex snap-x overflow-x-scroll'>
                {key ? (key.map((item, index) => {
                  return (
                    <div className='snap-center mx-2' key={index}>
                      <iframe className='xsmax:w-[320px] xsmax:h-[160px] h-[315px] w-[560px] ' src={"https://www.youtube.com/embed/" + item.key} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen >text</iframe>
                    </div>
                  );
                })) : (<h1>Movie Not Available</h1>)}
              </div>
            </div></>) : null}
          <h1 className='text-center font-bold text-4xl my-6 text-[#032541]'>Simillar Movie</h1>
          <div className='mt-6 flex w-full overflow-x-auto scroll-smooth flex-row trailer'>
            {simillarMovie ? simillarMovie.map((item, index) => {
              return (
                <div className='mr-4' key={index}>
                  <Card id={item.id} title={item.title} image={item.poster_path} backdrop_path={item.backdrop_path} rating={item.vote_average} popularity={item.popularity} lang={item.original_language} vote_count={item.vote_count} release_date={item.release_date} overview={item.overview} vote_average={item.vote_average} klik={() => handleDetailPage(item)} fav={() => handleFav(item)} />
                </div>
              )
            }) : <p>data gak kebaca</p>}
          </div>
        </div>
        <>
          {/* <div className='w-full h-auto' style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${location.state.backdrop_path})`
          }}>
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
          {/* {simillarMovie ? simillarMovie.map((item, index) => {
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
          </div > */}
          {/* </div > */}
        </>
      </div >
    </>
  )
}
export default withRouter(DetailMovie);