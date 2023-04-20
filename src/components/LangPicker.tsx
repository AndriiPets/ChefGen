import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { changeLang } from "../redux/langSlice";
import { GB } from "country-flag-icons/react/3x2";
import { RU } from "country-flag-icons/react/3x2";
import TranslateIcon from "@mui/icons-material/TranslateRounded";

export interface LangPicker {}

function LangPicker() {
  const { t, i18n } = useTranslation("common");
  const { lang } = useSelector((langstate: RootState) => langstate.langState);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(lang);
  }, [lang]);
  return (
    <div className="mr-4 cursor-pointer ">
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="cursor-pointer btn btn-square btn-ghost">
          <TranslateIcon className="scale-150" />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-7"
        >
          <li>
            <a
              className={lang === "en" ? "active" : ""}
              onClick={() => {
                i18n.changeLanguage("en");
                dispatch(changeLang("en"));
              }}
            >
              <GB className="h-7 w-12 rounded-md" />
              <p className="font-bold">English</p>
            </a>
          </li>
          <li>
            <a
              className={lang === "ru" ? "active" : ""}
              onClick={() => {
                i18n.changeLanguage("ru");
                dispatch(changeLang("ru"));
              }}
            >
              <RU className="h-7 w-12 rounded-md" />
              <p className="font-bold">Русский</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LangPicker;
