import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { Icon } from '@iconify/react';
import { BsWhatsapp, BsInstagram, BsLinkedin, BsLink45Deg, BsGithub } from "react-icons/bs";

const Hiring = () => {
    const Swal = require('sweetalert2')
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [message, setMessage] = useState();
    const [pageNow, setPageNow] = useState()

    const handleSendMessage = () => {
        if (name && email && phone && message) {
            handlePost();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Please complete the form first before sending a message',
                timer: 3000,
                timerProgressBar: true,
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
        }
    }


    const handlePost = () => {
        var axios = require('axios');
        var data = JSON.stringify({
            "project_id": 2299859938,
            "content": name,
            "description": "nama:" + name + "\nEmail:" + email + "\nnomor telepon:" + phone + "\nmessage:" + message,
            "due_string": "today",
            "due_lang": "id",
            "priority": 4
        });

        var config = {
            method: 'post',
            url: 'https://api.todoist.com/rest/v1/tasks',
            headers: {
                'X-Request-Id': '2299859938',
                'Authorization': 'Bearer 3d1d8b400ac7b81b81fc3369403005779dca728a',
                'Content-Type': 'application/json',
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    };
    return (
        <div className='text-center'>
            <NavBar pageNow={pageNow} />
            <div className='md:px-6 lg:px-[100px]'>
                <div className='lgmax:px-6'>
                    <h1 className='font-bold text-[40px]'>Get In Touch</h1>
                    <h1 className='text-2xl font-semibold'>Please contact via the contact provided or using the form provided. Wahyoe Ramadhan will reply to your message as soon as possible</h1>
                </div>
                <div className='mdmax:flex-col-reverse flex mt-[25px]'>
                    <div className='px-6 lg:px-[39px] py-[44px] md:rounded-xl font-semibold bg-[#0E0C38] text-white'>
                        <h2 className='text-3xl mb-5'>Contact Us</h2>
                        <div className='flex'>
                            <Icon icon="akar-icons:location" color="white" height="30" />
                            <p className='ml-2 text-xl'>Citayam, West Java, Indonesia</p>
                        </div>
                        <div className='flex my-3'>
                            <Icon icon="ic:baseline-email" color="white" height="30" />
                            <p className='ml-2 text-md sm:text-xl'>wahyuramadhan0549@gmail.com</p>
                        </div>
                        <div className='flex'>
                            <Icon icon="ant-design:phone-filled" color="white" height="30" />
                            <p className='ml-2 text-xl'>+62 898-9057-794</p>
                        </div>
                        <div className='flex justify-center mt-4'>
                            <a className=''
                                href="https://github.com/wramadhan"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <button><BsGithub className='text-3xl hover:text-white/50 active:text-white/50' /></button>
                            </a>
                            <a className='mx-[30px]'
                                href="https://helloimwahyu.vercel.app/contact"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <button><BsLink45Deg className='text-3xl hover:text-white/50 active:text-white/50' /></button>
                            </a>
                            <a className=''
                                href="https://www.instagram.com/_wahyu_ramadhan/?hl=id"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <button><BsInstagram className='text-3xl hover:text-white/50 active:text-white/50' /></button>
                            </a>
                            <a className='mx-[30px]'
                                href="https://api.whatsapp.com/send?phone=628989057794&text=Halo%20Wahyu%20Ramadhan,%20bolehkah%20kita%20berdiskusi?%20Saya%20mendapatkan%20link%20ini%20dari%20Wahyoe%20Cinema"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <button><BsWhatsapp className='text-3xl hover:text-white/50 active:text-white/50' /></button>
                            </a>
                            <a className=''
                                href="https://www.linkedin.com/in/wahyu-r-211aa6141/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <button><BsLinkedin className='hover:text-white/50 active:text-white/50 text-3xl' /></button>
                            </a>
                        </div>
                    </div>

                    <div className='lgmax:px-6 lg:ml-7 mdmax:mb-6 w-full'>
                        <input onChange={e => setName(e.target.value)} type='text' placeholder='Your name' className='w-full focus:shadow-black shadow-white shadow-inner mb-5 focus:bg-[#0E0C38] text-white bg-[#01B4E4] rounded-lg py-1.5 text-xl font-semibold px-5 placeholder:text-white' />
                        <input onChange={e => setEmail(e.target.value)} type='email' placeholder='Your email' className='w-full focus:shadow-black shadow-white shadow-inner mb-5 focus:bg-[#0E0C38] text-white bg-[#01B4E4] rounded-lg py-1.5 text-xl font-semibold px-5 placeholder:text-white' />
                        <input onChange={e => setPhone(e.target.value)} type='number' placeholder='Your number phone' className='w-full focus:shadow-black shadow-white shadow-inner mb-5 focus:bg-[#0E0C38] text-white bg-[#01B4E4] rounded-lg py-1.5 text-xl font-semibold px-5 placeholder:text-white' />
                        <textarea onChange={e => setMessage(e.target.value)} rows="2" placeholder='Your message' className='w-full focus:shadow-black shadow-white shadow-inner focus:bg-[#0E0C38] text-white bg-[#01B4E4] rounded-lg py-1.5 mb-5 text-xl font-semibold px-5 placeholder:text-white' />

                        <button className='rounded-xl font-semibold text-xl px-6 py-1 active:bg-[#0E0C38] active:text-white active:shadow-black shadow-inner text-[#0E0C38] border-2 border-[#0E0C38]' onClick={() => handleSendMessage()}>Send</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Hiring