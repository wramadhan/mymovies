import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import NavBar from '../components/NavBar';
import { useLocation } from 'react-router-dom';
import { withRouter } from "../withRouter";
import { useNavigate } from "react-router-dom";
import { useFavContext } from '../context/FavoritesProvider'

const SearchResults = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [pageNow, setPageNow] = useState('SearchResults');
    const [page, setPage] = useState(1);
    const [datas, setDatas] = useState();

    useEffect(() => {
        handleSearch();
    }, [])

    const handleSearch = () => {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: `https://api.themoviedb.org/3/search/movie?api_key=47182bd87a80c318c05c57ae7d42b9e2&language=en-US&query=${location.state.search}&page=1&include_adult=false`,
            headers: {
                'Authorization': 'Bearer 3d1d8b400ac7b81b81fc3369403005779dca728a'
            }
        };

        axios(config)
            .then(function (response) {
                setDatas(response.data.results);
                console.log(response.data.results);
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
            <div className='w-full h-auto border-[#032541] border-[1px]'>
            </div>
            <div className='grid grid-cols-4 gap-4'>
                {datas ? (datas.map((item, index) => {
                    return (
                        <div key={index}>
                            <Card id={item.id} release_date={item.release_date} title={item.title} image={item.poster_path} backdrop_path={item.backdrop_path} rating={item.vote_average} popularity={item.popularity} lang={item.original_language} vote_count={item.vote_count} overview={item.overview} vote_average={item.vote_average} klik={() => handleDetailPage(item)} fav={() => handleFav(item)} />
                        </div>
                    );
                })) : (<h1>Movies not available</h1>)}
            </div>
            <div className='animate-bounce py-4 flex w-screen text-center justify-center'>
                <button onClick={() => nextPage()} className='bg-yellow-500 shadow-inner shadow-white active:shadow-black text-white active:bg-slate-600 rounded-full w-auto px-2 h-10'>See More Results</button>
            </div>
        </div>
    )
}

export default withRouter(SearchResults)