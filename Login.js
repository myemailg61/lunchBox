import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import classes from './Login.module.css'
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;

const Login = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["login"])
    const [data, setData] = useState({
        mobile: '',
        password: '',
    })

    const navigate = useNavigate();


    const hndChg = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    axios.defaults.withCredentials = true

    const hndSbt = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/login", data)
            console.log(res.data.data[0].name)
            Cookies.set('NAME', res.data.data[0].name, { expires: (1 / 1440) * 60 }, { secure: true });
            Cookies.set("CID", res.data.data[0].cid, { expires: (1 / 1440) * 60 }, { secure: true });
            Cookies.set("ADMINSUCCESS", res.data.Admin, { expires: (1 / 1440) * 60 }, { secure: true });
            navigate("/")
        } catch (err) {
            console.log(err)
        }

    };

    return (
        <div className='mt-28 bg-cover bg-center' style={{ backgroundImage: "url('./asset/log1.jpg')", }}>

            {/* kunal */}
            <div></div>

            <div className='w-2/5 border border-green-600 mt-4 mx-auto block'>
                <p className='text-center text-3xl mb-4 mt-4'>Login</p>
                <form onSubmit={hndSbt}>
                    <input name='mobile' onChange={hndChg} type='number' placeholder='mobile number' className="mx-auto block border border-green-500 focus:border-green-700 mb-4 h-12 w-3/4 rounded-md"></input><br></br>
                    <input name='password' onChange={hndChg} type='password' placeholder='password' className="mx-auto block border border-green-500 focus:border-green-700 mb-4 h-12 w-3/4 rounded-md"></input><br></br>
                    <button className='bg-green-500 mx-auto block px-7 py-3 rounded-md mb-4'>Submit</button>

                    <p className='text-center mb-1 text-sm'>Don't have an account ?. <Link to='/signup'><span className='text-red-500 text-lg'>Register</span></Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login;