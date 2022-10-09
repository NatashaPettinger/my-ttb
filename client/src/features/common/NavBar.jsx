import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from "../api/useAuth";
import api from '../api';



const navigation = [
    { name: 'Inventory', href: '/raw-materials' },
    { name: 'Production', href: '/production' },
    { name: 'Spirit Storage', href: '/warehousing' },
    { name: 'Processing', href: '/processing' },
    { name: 'TTB Forms', href: '/ttb' },
]


const NavBar = () => {

    const { token, onLogout } = useAuth();
      

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    {navigation.map((link) => (
                        <li key={link.name}><a href={link.href}>{link.name}</a></li>
                    ))}
                </ul>
                </div>
                <button className="btn btn-ghost normal-case text-xl disabled">myTTB</button>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                {navigation.map((link) => (
                    <li key={link.name}><a href={link.href}>{link.name}</a></li>
                ))}
                </ul>
            </div>
            <div className="navbar-end">
                {!!token && (
                <span className="btn" onClick={onLogout}>Logout</span>
                )}
                
            </div>
        </div>
    )
}

export default NavBar