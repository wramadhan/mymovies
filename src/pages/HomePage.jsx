import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Card from '../components/Card';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { withRouter } from "../withRouter";
import { useFavContext } from '../context/FavoritesProvider'



function HomePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState([]);
  const [page, setPage] = useState(1);
  const { handleFav } = useFavContext();

  useEffect(() => {
    getData();
  }, [page]);


  const getData = async (page) => {
    await axios
      .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=47182bd87a80c318c05c57ae7d42b9e2&language=en-US&page=${page}`)
      .then((response) => {
        setTitle(response.data.results)
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleDetailPage = (item) => {
    navigate(`/detail/${item.id}`, {
      state: {
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

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
    getData(page)
  };

  const nextPage = () => {
    setPage(page + 1)
    getData(page)
  };

  return (
    <>
      <NavBar favourites={() => favourites()} />
      <div className="px-6 py-6 bg-gradient-to-r from-teal-400 to-blue-800 h-auto w-full">
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3'>


          {title.map((item, index) => {
            return (
              <div key={index}>
                <Card title={item.title} image={item.poster_path} backdrop_path={item.backdrop_path} rating={item.vote_average} popularity={item.popularity} lang={item.original_language} vote_count={item.vote_count} release_date={item.release_date} overview={item.overview} vote_average={item.vote_average} klik={() => handleDetailPage(item)} fav={() => handleFav(item)} />
              </div>
            );
          })}


        </div>
        <p>Halaman :{page}</p>
        <div className='flex justify-center'>
          <button className='rounded-full mr-2 w-36 text-white bg-blue-700/50 font-bold' onClick={(value) => previousPage(value)}>Previous Page</button>
          <button className='rounded-full w-36 text-white bg-blue-700/50 font-bold' onClick={(value) => nextPage(value)}>Next Page</button>
        </div>
      </div>
    </>
  )
}

export default withRouter(HomePage);