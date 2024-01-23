import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Images/logo.png'
const Nav = () => {

    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/SineUp')
    }
    return (
        <>
            <div className='NavContainer'>
                <img alt='Logo' src={logo} className='Logo' />
                {auth ?
                    <>
                        <div className='NavBar'>
                            <p ><Link to='/' className='NavTabs'>Product's</Link></p>
                            <p ><Link to='/Add' className='NavTabs'>Add-Product's</Link></p>
                            {/* <p ><Link to={'/Update'} className='NavTabs'>Update-Product's</Link></p> */}
                        </div>
                        <div className='NavBar1'>
                            <p ><Link to='/Profile' className='NavTabs'>Profile</Link></p>
                            <p ><Link to='/SineUp' className='NavTabs' onClick={logout} style={{color:'red'}}>Logout</Link><p></p></p>
                        </div>
                    </>
                    :
                    <div className='NavBar2'>
                        <p><Link to='/SineUp' className="NavTabs">SineUp</Link></p>
                        <p><Link to='/login' className='NavTabs'>Login</Link></p>
                    </div>}
            </div>
        </>
    )
}

export default Nav;