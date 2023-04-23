import React from "react";
import { useErrorBoundary } from "react-error-boundary";
import CatError from "../media/cat_error.png";
import { useTranslation } from "react-i18next";

export type FallbackProps = {
  error: any;
  resetErrorBoundary: (...args: any[]) => void;
};

function ErrorComponent({ error, resetErrorBoundary }: FallbackProps) {
  const { resetBoundary } = useErrorBoundary();

  const { t, i18n } = useTranslation("common");

  return (
    <div className="bg-gradient-to-t from-indigo-400 fixed left-0 top-0 bottom-0 right-0 flex items-center justify-center">
      <div className="flex flex-col justify-center gap-3">
        <div className="justify-center">
          <img className="w-32 h-32 mx-auto" src={CatError} alt="" />
        </div>
        <a className=" normal-case text-xl font-bold">{t("error.oops")}</a>

        <p className="text-center">{error.message}</p>
        <button
          className="btn btn-active btn-primary shadow mt-2"
          onClick={resetBoundary}
        >
          {t("error.try_again")}
        </button>
      </div>
    </div>
  );
}

export default ErrorComponent;
