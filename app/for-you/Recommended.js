"use client";

import { useBooks } from "@/app/context/BookContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    FaArrowCircleLeft,
    FaArrowCircleRight,
    FaRegStar,
    FaRegClock,
} from "react-icons/fa";
import TimeDisplay from "../../components/TimeDisplay";

export default function Recommended() {
    const { recommendedBooks, loading, error } = useBooks();
    console.log(recommendedBooks);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    function PrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#333",
                    borderRadius: "50%",
                    padding: "15px",
                    zIndex: 2,
                    left: "-30px", // arrow location on left edge
                }}
                onClick={onClick}
            >
                <FaArrowCircleLeft color="#fff" />
            </div>
        );
    }

    // Custom Next Arrow Component
    function NextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#333",
                    borderRadius: "50%",
                    padding: "15px",
                    zIndex: 2,
                    right: "1px", // arrow location on right edge
                }}
                onClick={onClick}
            >
                <FaArrowCircleRight color="#fff" />
            </div>
        );
    }

    // Slider settings
    const settings = {
        dots: true, // Show navigation dots
        infinite: true, // Infinite loop
        speed: 500, // Transition speed in ms
        slidesToShow: 4, // Number of slides visible
        slidesToScroll: 1, // Number of slides to scroll at once
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            // Responsive breakpoints
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: 840,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 540,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    return (
        <div className="mt-8">
            <div className="max-w-230">
                <div className="mt-10 text-left text-2xl font-bold mb-1">
                    Recommended For You
                    <p className="text-left text-sm font-normal mb-8">
                        We think you will like these!
                    </p>
                </div>
                <Slider {...settings}>
                    {recommendedBooks.map((book) => (
                        <div key={book.id}>
                            <div className="gap-4">
                                <div className="justify-items-start w-50 h-50 text-right">
                                    {book.subscriptionRequired ? (
                                        <button className="bg-black text-white text-sm rounded-full pr-1 pl-1 ">
                                            Premium
                                        </button>
                                    ) : (
                                        <p className="text-white text-sm rounded-full p-1 ">
                                            Premium
                                        </p>
                                    )}
                                    <div className="mt-4">
                                        <img
                                            src={book.imageLink}
                                            className="w-30 m-auto"
                                        />
                                        <p className="text-left font-bold">
                                            {book.title}
                                        </p>
                                        <p className="text-left mt-1">
                                            {book.author}
                                        </p>
                                        <p className="mt-1 text-sm italic text-left" >
                                            {book.subTitle}
                                        </p>
                                        <div className="flex space-x-4 text-left text-sm mt-1">
                                            <div>
                                                <FaRegClock className="inline" />{" "}
                                                <TimeDisplay seconds={
                                                        book.audioLink.length
                                                    }
                                                />
                                            </div>
                                            <div className="">
                                                {" "}
                                                <FaRegStar className="inline" />{" "}
                                                {book.averageRating}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
