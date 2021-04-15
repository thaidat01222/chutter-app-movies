import React from "react";

export default function Item(props)  {
    return (
      <li className="item-data" id={props.item}>
        <a href="#" >{props.item}</a>
      </li>
    );
  };
