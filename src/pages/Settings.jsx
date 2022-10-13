import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const [pageNow] = useState('settings')
    const navigate = useNavigate()
    return (

        <div>
            <NavBar pageNow={pageNow} />
            <div className='text-center'>
                <h1 className='font-bold text-3xl text-[#032541]'>Sorry</h1>
                <p className='font-semibold text-2xl text-[#032541] my-3'>This page is under construction</p>
                <div className='flex justify-center'>
                    <button className='text-xl rounded-full px-3 font-semibold active:bg-[#032541] active:shadow-black shadow-white active:text-[#01B4E4] shadow-inner text-white bg-[#01B4E4] border-2 py-2' onClick={() => navigate(-1)}>Go Back</button>
                </div>
            </div>
        </div>
    )
}

export default Settings