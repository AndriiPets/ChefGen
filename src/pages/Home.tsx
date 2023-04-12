import React, { useState, useEffect } from "react";

export interface Home {}

function Home() {
  const [recepieLoaded, setRecepieLoaded] = useState(true);
  return (
    <div className="bg-gradient-to-t from-indigo-300">
      {recepieLoaded ? (
        <div className="flex mx-auto flex-col mt-5 mb-5 max-w-sm md:max-w-lg">
          <div className="flex flex-col-reverse gap-5 md:flex-row justify-between items-center">
            <div className="bg-gray-500 w-72 h-48 rounded-lg"></div>
            <h1 className="font-bold text-gray-500 text-3xl">TITLE</h1>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col gap-6">
            <h1 className="text-gray-500 text-3xl font-bold">INGRIDIENTS</h1>
            <div className="w-full bg-white rounded-lg shadow">
              <p className="break-words ml-2 mt-2 mr-2 mb-2 font-serif italic text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco
              </p>
            </div>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col gap-6">
            <h1 className="text-gray-500 text-3xl font-bold">DIRECTIONS</h1>
            <div className="w-full bg-white rounded-lg shadow">
              <p className="break-words ml-2 mt-2 mr-2 mb-2 font-serif italic text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
          <div className="divider"></div>
          <div className="flex justify-between items-center">
            <button className="btn btn-accent shadow">Save</button>
            <button className="btn btn-primary shadow">Generate again</button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="font-bold text-gray-500 mb-3">
            Write ingridients you have in mind
          </h1>
          <div className="flex flex-col md:flex-row">
            <input
              type="text"
              placeholder="Separate by commas"
              className="input input-bordered w-full max-w-lg"
            />
            <button className="btn btn-active btn-primary">Generate</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
