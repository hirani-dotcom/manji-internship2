import React from "react";
import "../style.css";
import Layout from "@/components/Layout";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function page() {
    return (
        <Layout>
            <div className="">
              <div className="">
                    <figure>
                        <img src="logo" alt="" />
                    </figure>
                    <div className="right-0">
                        <div>
                          <div className="bg-gray-200 flex items-center m-auto p-2 rounded-full w-72">
                            <input
                              type="text"
                              className="w-66"
                              placeholder=" Search for books ..." />
                            <FaMagnifyingGlass />
                          </div>
                        </div>
                    </div>
                </div>
                Selected Just For You
            </div>
        </Layout>
    );
}
