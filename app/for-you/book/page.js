import React from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { MdBookmarkBorder } from "react-icons/md";

export default function page() {
    return (
        <div className="fixed left-0 top-0 text-left">
            <Sidebar />
            <div>
                <div className="fixed right-20 top-5">
                    <Header />
                </div>
                <div className="fixed top-25 left-60 pb-20 pt-10 max-w-svw max-h-svh overflow-y-auto scroll-auto border-t-2 border-gray-200">
                    {" "}
                    {/* Container */}
                    <div className="flex-col max-w-svw m-auto flex gap-4 text-center">
                        <div className="flex flex-row justify-between gap-6">
                            <div className="basis-3/4 text-left">
                                <h1 className="mb-4 font-bold text-3xl">
                                    How to win friends and influence people in
                                    the digital age
                                </h1>
                                <h2 className="mb-4 font-bold text">Author</h2>
                                <h3 className="mb-4 font-medium text-2xl">
                                    Subtitle Text
                                </h3>
                                <div className="border-t-2 border-gray-200 h-1">
                                    <br />
                                </div>
                                <p className="mt-4 mb-4 font-bold text-sm">
                                    Ratings, Audio Length <br />
                                    Audio/Text Ideas
                                </p>
                                <div className="border-t-2 border-gray-200 h-1 mb-4">
                                    <br />
                                </div>
                                <div>
                                    <button className="bg-black text-white p-4 m-auto rounded-2xl w-30 mr-4">
                                        {" "}
                                        Read{" "}
                                    </button>{" "}
                                    <button className="bg-black text-white p-4 m-auto rounded-2xl w-30 ml-4">
                                        {" "}
                                        Listen{" "}
                                    </button>
                                </div>
                                <div className="pt-4 pb-4 font-bold text-blue-500">
                                    <MdBookmarkBorder className="inline" /> Add
                                    title to my library
                                </div>
                                <h4 className="font-bold mb-2">
                                    What's it about?
                                </h4>
                                <p>
                                    "How to Win Friends and Influence People" is
                                    a self-help book written by Dale Carnegie
                                    and first published in 1936. The book
                                    provides practical advice and techniques for
                                    improving one's communication and social
                                    skills, with the goal of building better
                                    relationships and becoming more influential
                                    in both personal and professional settings.
                                    The book covers topics such as the
                                    importance of smiling, listening actively,
                                    giving honest and sincere appreciation,
                                    avoiding criticism, and becoming genuinely
                                    interested in others. It also emphasizes the
                                    power of empathy and understanding other
                                    people's perspectives. "How to Win Friends
                                    and Influence People" has been widely read
                                    and praised for its timeless and practical
                                    advice, and is considered a classic in the
                                    field of self-improvement.
                                </p>

                                <h4 className="pt-2 pb-2 font-semibold ">
                                    {" "}
                                    About the author
                                </h4>

                                <p>
                                    Dale Carnegie (1888-1955) was an American
                                    author, lecturer, and developer of
                                    self-improvement courses. He is best known
                                    for his book "How to Win Friends and
                                    Influence People," which has sold over 30
                                    million copies worldwide and is considered a
                                    classic in the self-help genre. Carnegie's
                                    teachings focused on improving interpersonal
                                    skills, communication, and leadership, and
                                    his courses and books were aimed at helping
                                    individuals become more confident,
                                    successful, and influential in both their
                                    personal and professional lives. He also
                                    founded the Dale Carnegie Training program,
                                    which is still in operation today and has
                                    helped millions of people around the world
                                    improve their communication and leadership
                                    skills.{" "}
                                </p>
                            </div>
                            <div className="basis-1/4">
                                <img
                                    className="w-200 mt-1"
                                    src="/tigers.png"
                                ></img>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                </div>
            </div>
        </div>
    );
}
