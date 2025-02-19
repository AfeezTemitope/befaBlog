import Befa from '../assets/Befa.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white py-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">

                <div className="mb-3 md:mb-0 text-center md:text-left flex flex-col items-center md:items-start">
                    <img
                        src={Befa}
                        alt="Budu Elite Football Academy Logo"
                        className="h-15 w-auto"
                    />
                    <h3 className="text-2xl font-bold mb-2 ">Budu Elite Football Academy</h3>
                    <p className="text-gray-400">Budu Rd, Lagos</p>
                    <div className="flex space-x-4 mb-4 mt-2">
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} size="2x" className="hover:text-blue-500" />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTiktok} size="2x" className="hover:text-blue-500" />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faYoutube} size="2x" className="hover:text-blue-500" />
                        </a>
                    </div>
                </div>

                {/* Academy Links */}
                <div className="mb-6 md:mb-0 text-center md:text-left md:self-center">
                    <a href="#" className="block hover:underline mb-2">About The Academy</a>
                    <a href="#" className="block hover:underline mb-2">Contact Us</a>
                    <a href="#" className="block hover:underline">FAQ</a>
                </div>

                {/* App Links and Social Message */}
                <div className="text-center md:text-right md:self-center">
                    <p className="mb-2">Get updates and follow us on social media!</p>
                    <div className="flex space-x-4 justify-center items-center md:justify-end">
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <img src="https://icon-library.com/images/app-store-icon-png/app-store-icon-png-14.jpg" alt="App Store" className="h-12 w-auto" />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <img src="https://th.bing.com/th/id/R.a5c4a0ae0a1684828655ea8f51d7d190?rik=fO8ghz3gzTM4ow&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fgoogle-play-icon-transparent%2fgoogle-play-icon-transparent-5.png&ehk=X6UOUpA%2bOVni4FAfy4Byq57nRBDLCnPCJ%2bi%2fYUt0OWc%3d&risl=&pid=ImgRaw&r=0" alt="Google Play" className="h-32 w-auto" />
                        </a>
                    </div>
                </div>
            </div>


            <div className="border-t border-gray-700 py-4 text-center">
                <p>&copy; {currentYear} Budu Elite Football Academy. All rights reserved.</p>
                <div className="flex flex-col md:flex-row justify-center items-center mt-2 space-x-0 md:space-x-4">
                    <a href="#" className="hover:underline mb-2 md:mb-0">Privacy Policy</a>
                    <a href="#" className="hover:underline">Terms & Conditions</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
