import React from "react";

export interface Menu {}

function Menu() {
  return (
    <div>
      <ul className="menu p-4 w-80 bg-base-100">
        <li>
          <a>Sidebar Item 1</a>
        </li>
        <li>
          <a>Sidebar Item 2</a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
