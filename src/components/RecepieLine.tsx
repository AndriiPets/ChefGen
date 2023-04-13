import React from "react";
import { RecepieContent } from "../utils/Types";

export interface RecepieLine {}

function RecepieLine({ recepie, index, type }: RecepieContent) {
  return (
    <div className="flex gap-2 bg-slate-100 items-center rounded-lg">
      <kbd className="kbd kbd-md font-bold text-xl">{index + 1}</kbd>
      <p className="text-lg">{recepie}</p>
    </div>
  );
}

export default RecepieLine;
