import React, { useEffect, useState } from 'react';
import { RiStarSFill } from "react-icons/ri";
import NavBar from '../components/NavBar';
import { useLocation } from 'react-router-dom';
import { withRouter } from "../withRouter";
import { useNavigate } from "react-router-dom";
import { useFavContext } from '../context/FavoritesProvider'
// import { RiHeartAddFill } from "react-icons/ri";
import { TbHeartPlus } from "react-icons/tb";

const SearchResults = () => {
    const [lost, setLost] = useState();
    const navigate = useNavigate();
    const location = useLocation()
    const [pageNow, setPageNow] = useState('SearchResults');
    const [page, setPage] = useState(1);
    const [datas, setDatas] = useState();


    useEffect(() => {
        handleSearch();
    }, [page])


    const handleSearch = () => {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${location.state.search}&page=${page}&include_adult=false`,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                if (page < 2) {
                    setDatas(response.data.results);
                    setLost(response.data.results)
                } else {
                    let joined = datas.concat(response.data.results);
                    console.log(response.data);
                    console.log(lost)
                    setLost(response.data.total_pages)
                    setDatas(joined)
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    };
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
    const { handleFav } = useFavContext();

    const nextPage = () => {
        setPage(page + 1)
    };

    return (
        <div>
            <NavBar />
            <h1 className='font-bold text-center text-xl my-4 text-[#032541]'>Search Results</h1>

            <div className='px-6'>
                {datas ? (datas.map((item, index) => {
                    return (
                        <div className='px-[1px] my-2 flex border-2 rounded-xl shadow-white shadow-inner' key={index}>
                            <img
                                className="rounded-l-lg"
                                src={
                                    item.poster_path
                                        ? "https://image.tmdb.org/t/p/original/" + item.poster_path
                                        : "https://via.placeholder.com/500x750.png/000000/FFFFFF/%20C/O%20https://placeholder.com/?text=No+image"
                                }
                                alt="Gambar"
                                width={140}
                            />
                            <div className='w-full'>
                                <div className='ml-4 mt-2'>
                                    <h2 className="xsmax:text-center font-bold">{item.title}</h2>
                                    <div>
                                        <h3 className="font-normal italic text-yellow-700 flex ml-1 mt-1 xsmax:justify-center">
                                            <RiStarSFill className="text-2xl" />
                                            {item.vote_average * 10}%
                                        </h3>
                                    </div>
                                    <div className='xsmax:text-center mt-6'>
                                        <button onClick={() => handleDetailPage(item)} className='rounded-full xsmax:w-full xs:px-2 py-[1px] bg-[#032541] text-center text-md text-white font-medium'>Detail</button>
                                        <button className='xsmax:hidden rounded-full px-2 py-[1px] bg-[#032541] text-center text-md text-white font-medium'>Add to Favourites</button>
                                    </div>
                                    <div className='xs:hidden mt-4'>
                                        <button className='rounded-full w-full flex justify-center px-5 py-1 bg-[#032541] text-center text-md text-white font-medium'><TbHeartPlus /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })) : (<h1>loading..</h1>)}
            </div>
            <div className='animate-bounce py-4 flex w-screen text-center justify-center'>
                {lost !== page ? (<button onClick={() => nextPage()} className='bg-yellow-500 shadow-inner shadow-white active:shadow-black text-white active:bg-slate-600 rounded-full w-auto px-2 h-10'>See More Results</button>) : null}
                {/* <button onClick={() => nextPage()} className='bg-yellow-500 shadow-inner shadow-white active:shadow-black text-white active:bg-slate-600 rounded-full w-auto px-2 h-10'>See More Results</button> */}

            </div>
        </div >
    )
}

export default withRouter(SearchResults)