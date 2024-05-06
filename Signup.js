import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

import Signuppopup from './Signuppopup';
import Signuppopup2 from './Signuppopup2';

const Signup = () => {
    const [data, setData] = useState({
        cid: uuidv4(),
        name: "",
        mobile: "",
        password: "",
    });
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupOpen2, setIsPopupOpen2] = useState(false);

    const closePopup = () => {
        setIsPopupOpen(false);

    };

    const closePopup2 = () => {
        setIsPopupOpen2(false);
        navigate("/")

    };

    const navigate = useNavigate();

    const hndChg = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const hndSbt = async (e) => {
        e.preventDefault();
        setIsPopupOpen(true)

        console.log(data)

        if (data.password !== data.confirmPass) {
            setIsPopupOpen(false)
            alert("password mismatch")
        }

        if (data.password === data.confirmPass) {
            try {
                const res = await axios.post("http://localhost:8000/signup", { data })
                //console.log(res)
                if (res.status === 200) {
                    setIsPopupOpen(false)
                    setIsPopupOpen2(true);

                    //navigate("/")
                    //alert("Account created successfully! Please Login")
                }


            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div className='mt-24'>

            {/* kunal */}
            <div></div>



            <div className='w-2/5 border border-green-600 mt-4 mb-4 mx-auto block'>
                <p className='text-center text-3xl mb-4 mt-4'>Signup</p>
                <form onSubmit={hndSbt}>
                    <input name='name' onChange={hndChg} type='text' placeholder='Name' className="mx-auto block border border-green-500 focus:border-green-700 mb-4 h-12 w-3/4 rounded-md"></input><br></br>
                    <input name='mobile' onChange={hndChg} type='number' placeholder='mobile number' className="mx-auto block border border-green-500 focus:border-green-700 mb-4 h-12 w-3/4 rounded-md"></input><br></br>
                    <input name='password' onChange={hndChg} type='password' placeholder='password' className="mx-auto block border border-green-500 focus:border-green-700 mb-4 h-12 w-3/4 rounded-md"></input><br></br>
                    <input name='confirmPass' onChange={hndChg} type='password' placeholder='confirm password' className="mx-auto block border border-green-500 focus:border-green-700 mb-4 h-12 w-3/4 rounded-md"></input><br></br>
                    <button type='submit' className='bg-green-500 mx-auto block px-7 py-3 rounded-md mb-4'>Submit</button>


                </form>
            </div>

            {isPopupOpen && <Signuppopup onClose={closePopup} />}
            {isPopupOpen2 && <Signuppopup2 onClose2={closePopup2} />}
        </div>
    )
}

export default Signup;