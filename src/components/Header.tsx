import React from 'react';
import { useNavigate } from 'react-router-dom';
import Befa from '../assets/Befa.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    return (
        <header className="bg-black text-white py-4 px-4 md:px-8 flex md:flex-row justify-between items-center border-b border-l-emerald-400">
            <div className="mb-4 md:mb-0 cursor-pointer" onClick={goToHome}>
                <img src={Befa} alt="Befa Logo" className="h-12 w-auto md:h-16" />
            </div>
            <div className="flex flex-col items-center text-center mb-4 md:mb-0">
                <span className="text-xl font-bold">BEFA</span>
                <span className="text-sm">budu elite football academy</span>
            </div>
            <div className="flex items-center space-x-4">
                <FontAwesomeIcon
                    icon={faUserCircle}
                    size="lg"
                    className="hover:text-gray-400 cursor-pointer"
                />
                <FontAwesomeIcon
                    icon={faSearch}
                    size="lg"
                    className="hover:text-gray-400"
                />
            </div>
        </header>
    );
};

export default Header;