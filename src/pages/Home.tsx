import React, { useState, useEffect } from "react";
import serverURL from "../utils/ServerURL";
import axios from "axios";
import { Recepie } from "../utils/Types";
import RecepieLine from "../components/RecepieLine";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useErrorBoundary } from "react-error-boundary";
import { changeChef } from "../redux/chefSlice";
import chef_top from "../media/chef_top.png";
import chef_beam from "../media/chef_beam.png";

export interface Home {}

function Home() {
  const [recepieLoaded, setRecepieLoaded] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [recepie, setRecepie] = useState<Recepie>();
  const [loading, setLoading] = useState(false);

  const { showBoundary } = useErrorBoundary();

  const dispatch = useDispatch();

  const { lang } = useSelector((langState: RootState) => langState.langState);
  const { chef } = useSelector((chefState: RootState) => chefState.chefState);

  const { t, i18n } = useTranslation("common");
  const placeholder = t("placeholder");

  const fetchRecepie = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${serverURL}/generate/`, {
        prompts: prompt,
        lang: lang,
        chef: chef,
      });
      setRecepie(res.data);
      setRecepieLoaded(!recepieLoaded);
      setLoading(!loading);
    } catch (err) {
      console.log(err);
      showBoundary(err);
    }
  };

  useEffect(() => {
    console.log(chef);
  }, [chef]);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, []);

  return (
    <div className="bg-gradient-to-t from-indigo-400">
      {recepieLoaded ? (
        <div className="flex mx-auto flex-col mt-5 mb-5 max-w-sm md:max-w-lg ">
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
            <h1 className="text-gray-500 text-3xl font-bold">
              {t("recepie.ingridients")}
            </h1>
            <div className="w-full bg-white rounded-lg shadow">
              <div className="flex flex-col gap-1 ml-2 mt-2 mr-2 mb-2 font-serif italic text-left">
                {recepie?.ingredients.map((dir, i) => (
                  <RecepieLine recepie={dir} index={i} type="ingredients" />
                ))}
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col gap-6">
            <h1 className="text-gray-500 text-3xl font-bold">
              {t("recepie.directions")}
            </h1>
            <div className="w-full bg-white rounded-lg shadow">
              <div className="flex flex-col ml-2 mt-2 mr-2 mb-2 font-serif italic text-left gap-1">
                {recepie?.directions.map((dir, i) => (
                  <RecepieLine recepie={dir} index={i} type="directions" />
                ))}
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="flex gap-4 justify-center mb-6">
            <h3 className="font-bold text-gray-700">{t("rate")}</h3>
            <div className="rating gap-1">
              <input type="radio" name="rating-9" className="rating-hidden" />
              <input
                type="radio"
                name="rating-9"
                className="mask mask-star-2"
                checked
              />
              <input
                type="radio"
                name="rating-9"
                className="mask mask-star-2"
              />
              <input
                type="radio"
                name="rating-9"
                className="mask mask-star-2"
              />
              <input
                type="radio"
                name="rating-9"
                className="mask mask-star-2"
              />
              <input
                type="radio"
                name="rating-9"
                className="mask mask-star-2"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button className="btn btn-accent shadow">
              {t("recepie.save")}
            </button>
            <button
              className="btn btn-primary shadow"
              onClick={(e) => {
                e.preventDefault();
                setRecepieLoaded(!recepieLoaded);
                setLoading(!loading);
              }}
            >
              {t("recepie.generate")}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center fixed left-0 top-0 bottom-0 right-0 bg-gradient-to-t from-indigo-300">
          {!loading && (
            <div className="flex flex-col justify-center">
              <h1 className="font-bold text-xl text-gray-500 mb-3">
                {t("chefs.choose")}
              </h1>
              {/* chefs select */}
              <div className="flex justify-between w-72 mb-12 mx-auto">
                <div className="flex flex-col hover:bg-slate-400 rounded-lg cursor-pointer">
                  <button
                    className={
                      chef === "top"
                        ? "bg-primary rounded-lg text-white"
                        : "text-gray-500"
                    }
                    onClick={() => dispatch(changeChef("top"))}
                  >
                    <img className="w-20 h-20 mx-3" src={chef_top} />
                    <h3 className="font-bold  mb-3">{t("chefs.chef_1")}</h3>
                  </button>
                </div>
                <div className="flex flex-col hover:bg-slate-400 rounded-lg cursor-pointer">
                  <button
                    className={
                      chef === "beam"
                        ? "bg-primary rounded-lg text-white"
                        : "text-gray-500"
                    }
                    onClick={() => dispatch(changeChef("beam"))}
                  >
                    <img className="w-20 h-20 mx-3" src={chef_beam} />
                    <h3 className="font-bold  mb-3">{t("chefs.chef_2")}</h3>
                  </button>
                </div>
              </div>

              <h1 className="font-bold text-xl text-gray-500 break-all break-normal mb-3 mx-6">
                {t("title")}
              </h1>
            </div>
          )}
          <div className="flex flex-col md:flex-row">
            <input
              type="text"
              placeholder={placeholder}
              className="input input-bordered w-72 md:rounded-r-none"
              onChange={(e) => setPrompt(e.target.value)}
            />
            {!loading && (
              <button
                className="btn btn-active btn-primary md:rounded-l-none"
                type="submit"
                onClick={(e) => {
                  setLoading(!loading);
                  fetchRecepie(e);
                }}
              >
                {t("create_button")}
              </button>
            )}
          </div>
          {loading && (
            <div className="flex flex-col gap-5 justify-center mt-3">
              <h1 className="font-bold text-gray-500 mb-3">{t("loading")}</h1>
              <progress className="progress w-full"></progress>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
