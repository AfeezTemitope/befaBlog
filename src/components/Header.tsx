import Befa from '../assets/Befa.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Header: React.FC = () => {
    // const navigate = useNavigate(); // Initialize useNavigate hook

    // const goToLogin = () => {
    //     navigate('/login'); // Use navigate function
    // };

    return (
        <header className="bg-black text-white py-4 px-4 md:px-8 flex flex-row md:flex-row justify-between items-center border-b border-l-emerald-400">
            <div className="mb-4 md:mb-0 text-center md:text-left">
                <img src={Befa} alt="Befa Logo" className="h-12 w-auto" />
            </div>
            <div className="flex items-center space-x-4 justify-center md:justify-end">
                <FontAwesomeIcon
                    icon={faUserCircle}
                    size="2x"
                    className="hover:text-gray-400 cursor-pointer"
                    // onClick={goToLogin}
                />
                <FontAwesomeIcon icon={faSearch} size="2x" className="hover:text-gray-400" />
            </div>
        </header>
    );
};

export default Header;
