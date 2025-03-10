import React from 'react';
import { useNavigate } from 'react-router-dom';
import Befa from '../assets/Befa.png';

const Header: React.FC = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    const goToAdminPage = () => {
        navigate('/admin');
    };

    return (
        <header className="bg-black text-white py-4 px-4 md:px-8 flex items-center border-b border-l-emerald-400">
            <div className="flex items-center cursor-pointer" onClick={goToHome}>
                <img src={Befa} alt="Befa Logo" className="h-10 w-auto md:h-16 mr-4" />
            </div>
            <div className="flex flex-col items-center flex-grow">
                <span className="text-4xl font-extrabold cursor-pointer">BEFA</span>
                <span className="text-xs"  onClick={goToAdminPage}>budu elite football academy</span>
            </div>
        </header>
    );
};

export default Header;
