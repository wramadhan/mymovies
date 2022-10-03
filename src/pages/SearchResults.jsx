import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

const SearchResults = () => {
    const [pageNow, setPageNow] = useState('SearchResults');
    const [searchInput, setSearchInput] = useState('naruto');
    const [datas, setDatas] = useState();

    useEffect(() => {
        handleSearch();
    }, [])

    const handleSearch = () => {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: `https://api.themoviedb.org/3/search/movie?api_key=47182bd87a80c318c05c57ae7d42b9e2&language=en-US&query=${searchInput}&page=1&include_adult=false`,
            headers: {
                'Authorization': 'Bearer ' + process.env.REACT_APP_API_KEY
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

    return (
        <div>
            <NavBar />
        </div>
    )
}

export default SearchResults