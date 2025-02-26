// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Befa from '../assets/Befa.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
//
// const Header: React.FC = () => {
//     const navigate = useNavigate();
//
//     const goToHome = () => {
//         navigate('/');
//     };
//
//     const goToAdminPage =()=>{
//         navigate('/admin')
//     }
//
//     return (
//         <header className="bg-black text-white py-4 px-4 md:px-8 flex md:flex-row justify-between items-center border-b border-l-emerald-400">
//             <div className="mb-4 md:mb-0 cursor-pointer" onClick={goToHome}>
//                 <img src={Befa} alt="Befa Logo" className="h-12 w-auto md:h-16" />
//             </div>
//             <div className="flex flex-col items-center text-center mb-4 md:mb-0">
//                 <span className="text-lg font-bold" onClick={goToAdminPage}>BEFA</span>
//                 <span className="text-sm">budu elite football academy
//                 </span>
//             </div>
//             <div className="flex items-center space-x-4">
//                 <FontAwesomeIcon
//                     icon={faUserCircle}
//                     size="lg"
//                     className="hover:text-gray-400 cursor-pointer"
//                 />
//                 <FontAwesomeIcon
//                     icon={faSearch}
//                     size="lg"
//                     className="hover:text-gray-400"
//                 />
//             </div>
//         </header>
//     );
// };
//
// export default Header;
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
                <span className="text-2xl font-extrabold cursor-pointer" onClick={goToAdminPage}>BEFA</span>
                <span className="text-xs">budu elite football academy</span>
            </div>
        </header>
    );
};

export default Header;
