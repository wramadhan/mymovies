import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Hiring = () => {
    const [pageNow, setPageNow] = useState('home')
    return (
        <div className='text-center'>
            <NavBar pageNow={pageNow} />
            <h1 className='font-bold'>Sorry,</h1>
            <h1>This page is still under construction. Please click the button below to be directed to the developer's personal page</h1>
            <a className='mt-4 flex justify-center'
                href="https://helloimwahyu.vercel.app/contact"
                target="_blank"
                rel="noreferrer"
            >
                <button className='border-blue-700 text-blue-700 border-2 px-2 py-[1px] rounded-full font-bold' >Hire me?</button>
            </a>
        </div >
    )
}

export default Hiring