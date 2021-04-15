import React from "react";
import Item from "./Item";
export default function BaseList (props) {
  const { data } = props;
  if (data.length !== 0)
    return (
      <div className="baselist">
        <div className="items-content">
          {data.map((item, index) => {
            return (
              <div className="item-movies" key={index}>
                <div key={item.text}  className="item-data-list">
                  <Item item={item.text} />
                </div>
                <a href="#"><img className="poster index" src={item.image}/></a>
              </div>
            );
          })}
        </div>
        <div>
          Page {props.page}
          <button className="page" onClick={() => props.updatePage()}>
            {" "}
            {">"}{" "}
          </button>
        </div>
      </div>
    );
  return <div> </div>;
};