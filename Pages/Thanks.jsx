import React from "react";
import to from "../Assets/thanks.png";

function Thanks() {
  return (
    <div className="w-full h-[100vh] bg-primary grid content-center">
      <div className="lg:w-[70vw] w-[80vw] m-auto h-[80vh] rounded-xl bg-white flex flex-col">
        <div className="my-auto">
          <img
            src={to}
            alt="Nothing found"
            className="object-contain h-64 w-96 mx-auto "
          />
          <h1 className="mx-auto text-2xl text-center">
            Thanks for your response! Your response has be saved!
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Thanks;
