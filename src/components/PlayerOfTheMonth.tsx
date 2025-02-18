// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from "framer-motion";
//
// interface ImageSliderProps {
//     images: string[];
//     interval?: number;
// }
//
// const PlayerOfTheMonth: React.FC<ImageSliderProps> = ({ images, interval = 3000 }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//
//     useEffect(() => {
//         const timer = setInterval(() => {
//             setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//         }, interval);
//
//         return () => clearInterval(timer);
//     }, [images, interval]);
//
//     const imageVariants = {
//         enter: (direction: number) => {
//             return {
//                 x: direction > 0 ? 1000 : -1000,
//                 opacity: 0
//             };
//         },
//         center: {
//             zIndex: 1,
//             x: 0,
//             opacity: 1
//         },
//         exit: (direction: number) => {
//             return {
//                 zIndex: 0,
//                 x: direction > 0 ? -1000 : 1000,
//                 opacity: 0
//             };
//         }
//     };
//
//     const transition = {
//         duration: 0.6,
//         ease: "easeInOut"
//     };
//
//     const direction = currentIndex > 0 ? 1 : -1;
//
//     return (
//         <div className="relative w-full h-full overflow-hidden">
//             <AnimatePresence initial={false} custom={direction}>
//                 <motion.img
//                     key={images[currentIndex]}
//                     src={images[currentIndex]}
//                     alt={`Image ${currentIndex + 1}`}
//                     className="absolute inset-0 w-full h-full object-cover"
//                     variants={imageVariants}
//                     custom={direction}
//                     initial="enter"
//                     animate="center"
//                     exit="exit"
//                     transition={transition}
//                 />
//             </AnimatePresence>
//         </div>
//     );
// };
//
// export default PlayerOfTheMonth;