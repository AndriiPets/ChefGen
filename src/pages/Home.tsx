import React, { useState, useEffect } from "react";
import serverURL from "../utils/ServerURL";
import axios from "axios";
import { Recepie } from "../utils/Types";
import RecepieLine from "../components/RecepieLine";

export interface Home {}

function Home() {
  const [recepieLoaded, setRecepieLoaded] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [recepie, setRecepie] = useState<Recepie>();
  const [loading, setLoading] = useState(false);

  const fetchRecepie = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${serverURL}/generate`, {
        prompt: prompt,
      });
      setRecepie(res.data);
      setRecepieLoaded(!recepieLoaded);
      setLoading(!loading);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(recepie?.directions);
  }, [recepieLoaded]);

  return (
    <div className="bg-gradient-to-t from-indigo-300">
      {recepieLoaded ? (
        <div className="flex mx-auto flex-col mt-5 mb-5 max-w-sm md:max-w-lg">
          <div className="flex flex-col-reverse gap-5 md:flex-row justify-between items-center">
            <div className="bg-gray-500 w-72 h-48 rounded-lg">
              <img
                src={recepie?.image}
                className="object-cover w-72 h-48 rounded-lg"
              />
            </div>
            <h1 className="font-bold text-gray-500 text-3xl">
              {recepie?.title}
            </h1>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col gap-6">
            <h1 className="text-gray-500 text-3xl font-bold">INGREDIENTS</h1>
            <div className="w-full bg-white rounded-lg shadow">
              <p className="flex flex-col gap-1 ml-2 mt-2 mr-2 mb-2 font-serif italic text-left">
                {recepie?.ingredients.map((dir, i) => (
                  <RecepieLine recepie={dir} index={i} type="ingredients" />
                ))}
              </p>
            </div>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col gap-6">
            <h1 className="text-gray-500 text-3xl font-bold">DIRECTIONS</h1>
            <div className="w-full bg-white rounded-lg shadow">
              <div className="flex flex-col ml-2 mt-2 mr-2 mb-2 font-serif italic text-left gap-1">
                {recepie?.directions.map((dir, i) => (
                  <RecepieLine recepie={dir} index={i} type="directions" />
                ))}
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="flex justify-between items-center">
            <button className="btn btn-accent shadow">Save</button>
            <button
              className="btn btn-primary shadow"
              onClick={(e) => {
                e.preventDefault();
                setRecepieLoaded(!recepieLoaded);
                setLoading(!loading);
              }}
            >
              Generate again
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center fixed left-0 top-0 bottom-0 right-0 bg-gradient-to-t from-indigo-300">
          {!loading && (
            <h1 className="font-bold text-gray-500 mb-3">
              Write ingridients you have in mind
            </h1>
          )}
          <div className="flex flex-col md:flex-row">
            <input
              type="text"
              placeholder="Separate by commas"
              className="input input-bordered w-full max-w-lg"
              onChange={(e) => setPrompt(e.target.value)}
            />
            {!loading && (
              <button
                className="btn btn-active btn-primary"
                type="submit"
                onClick={(e) => {
                  setLoading(!loading);
                  fetchRecepie(e);
                }}
              >
                Generate
              </button>
            )}
          </div>
          {loading && (
            <div className="flex flex-col gap-5 justify-center mt-3">
              <h1 className="font-bold text-gray-500 mb-3">
                AI chef generating a recepie for you...
              </h1>
              <progress className="progress w-full"></progress>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
