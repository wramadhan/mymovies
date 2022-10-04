import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Hiring = () => {
    const [pageNow, setPageNow] = useState('home')
    return (
        <div>
            <Link to={'/hiring'}>
                <NavBar pageNow={pageNow} />
                <h1>Sorry</h1>
                <h1>Comming Soon,page still under construction</h1>
            </Link>
        </div>
    )
}

export default Hiring