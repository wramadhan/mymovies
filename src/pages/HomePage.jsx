import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Card from '../components/Card';
import NavBar from '../components/NavBar';
import { withRouter } from "../withRouter";
import { useFavContext } from '../context/FavoritesProvider'
import Wellcome from '../components/Wellcome';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2'


function HomePage() {
  const Swal = require('sweetalert2')
  const [pageNow, setPageNow] = useState('home')
  const [inputSearch, setInputSearch] = useState();
  const navigate = useNavigate();
  const [title, setTitle] = useState([]);
  const [page, setPage] = useState(1);
  const [pagePopular, setPagePopular] = useState(1);
  const { handleFav } = useFavContext();
  const [popularButton, setPopularButton] = useState(true)
  const [popular, setPopular] = useState();

  useEffect(() => {
    getData();
  }, [page]);

  const getData = () => {
    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();

    var config = {
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=47182bd87a80c318c05c57ae7d42b9e2&language=en-US&page=' + page,
      headers: {
        'Authorization': 'Bearer 3d1d8b400ac7b81b81fc3369403005779dca728a',
      },
      data: data
    };

    axios(config)
      .then((response) => {
        if (page === 1) {
          setTitle(response.data.results)
        } else {
          let joined = title.concat(response.data.results);
          setTitle(joined)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const getPopularMovie = () => {
    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();

    var config = {
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/popular?api_key=47182bd87a80c318c05c57ae7d42b9e2&language=en-US&page=' + pagePopular,
      headers: {
        'Authorization': 'Bearer 3d1d8b400ac7b81b81fc3369403005779dca728a'
      },
      data: data
    };

    axios(config)
      .then((response) => {
        if (pagePopular < 2) {
          setPopular(response.data.results)
        } else {
          let joined = popular.concat(response.data.results);
          setPopular(joined)
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const handlePopularButton = () => {
    setPopularButton(false);
    getPopularMovie();
  }

  const handleInputSearch = (e) => {
    setInputSearch(e.target.value);
    console.log(e.target.value);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      if (inputSearch) {
        navigate(`/search/${inputSearch}`, {
          state: {
            search: inputSearch
          }
        })
      } else if (inputSearch === undefined) {
        Swal.fire({
          icon: 'error',
          title: 'please enter your search keyword',
          timer: 3000,
          timerProgressBar: true,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
      }
    }
  };


  const handleClickSearch = () => {
    if (inputSearch) {
      navigate(`/search/${inputSearch}`, {
        state: {
          search: inputSearch
        }
      })
    } else if (inputSearch === undefined) {
      Swal.fire({
        icon: 'error',
        title: 'please your search keyword',
        timer: 3000,
        timerProgressBar: true,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
    }
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

  const favourites = () => {
    navigate("/favourite");
  };

  const nextPage = () => {
    setPage(page + 1)
  };

  useEffect(() => {
    if (pagePopular > 1) {
      getPopularMovie();
    }
  }, [pagePopular])

  const nextPagePopular = () => {
    setPagePopular(pagePopular + 1)
    getPopularMovie();
  };

  return (
    <>
      <NavBar pageNow={pageNow} favourites={() => favourites()} />
      <Wellcome handleInputSearch={(e) => handleInputSearch(e)} handleSearch={(e) => handleSearch(e)} handleClickSearch={() => handleClickSearch()} />
      <div className="px-6 py-6 h-auto w-full">
        <h1 className='font-bold text-2xl text-center'>Now Playing</h1>
        <div className='mb-10 flex py-4 w-full overflow-x-auto scroll-smooth flex-row'>
          {title ? (title.map((item, index) => {
            return (
              <div key={index}>
                <Card id={item.id} release_date={item.release_date} title={item.title} image={item.poster_path} backdrop_path={item.backdrop_path} rating={item.vote_average} popularity={item.popularity} lang={item.original_language} vote_count={item.vote_count} overview={item.overview} vote_average={item.vote_average} klik={() => handleDetailPage(item)} fav={() => handleFav(item)} />
              </div>
            );
          })) : (<h1>Loading...</h1>)}
          <div className='flex flex-col justify-center'>
            <button onClick={() => nextPage()} className='bg-yellow-500 shadow-inner shadow-white active:shadow-black text-white active:bg-slate-600 rounded-full w-auto px-2 h-10'><Icon icon="ic:outline-navigate-next" color="white" width="24" height="24" /></button>
          </div>
        </div>
        {popularButton ? (<div className='animate-bounce my-6 flex justify-center'>
          <button onClick={() => handlePopularButton()} className='shadow-inner text-xl shadow-white active:shadow-black active:text-black rounded-full w-auto px-2 py-[1px] text-white bg-blue-700/50 font-bold text-center'>See Popular Movie?</button>
        </div>) : null}
        {popularButton ? null : (<><h1 className='text-2xl text-center font-bold'>Popular Movie</h1>
          <div className='flex py-4 w-full overflow-x-auto scroll-smooth flex-row'>
            {popular ? (popular.map((item, index) => {
              return (
                <div key={index}>
                  <Card id={item.id} release_date={item.release_date} title={item.title} image={item.poster_path} backdrop_path={item.backdrop_path} rating={item.vote_average} popularity={item.popularity} lang={item.original_language} vote_count={item.vote_count} overview={item.overview} vote_average={item.vote_average} klik={() => handleDetailPage(item)} fav={() => handleFav(item)} />
                </div>
              );
            })) : (<h1>Loading...</h1>)}
            <div className='flex flex-col justify-center'>
              <button onClick={() => nextPagePopular()} className='bg-yellow-500 shadow-inner shadow-white active:shadow-black text-white active:bg-slate-600 rounded-full w-auto px-2 h-10'><Icon icon="ic:outline-navigate-next" color="white" width="24" height="24" /></button>
            </div>
          </div></>)}

      </div>
    </>
  )
}

export default withRouter(HomePage);