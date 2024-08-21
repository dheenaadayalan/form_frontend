import React, { useEffect, useState } from "react";
import Welcome from "../Components/Welcome";
import { Link } from "react-router-dom";
import ro from "../Assets/hi.jpg";

import ItemMap from "../Components/itemMap";

function Forms({ setFormId }) {
  const api = "https://form-backend-tfpv.onrender.com/api/all/form";
  const [forms, setForms] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllForms = (apiUrl) => {
    setLoading(true);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setForms(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    getAllForms(api);
  }, []);
  return (
    <div className="mb-10">
      <Welcome />
      <div className="w-full mt-4 h-full">
        <div className="flex flex-row justify-around bg-primary w-[90vw] lg:w-[80vw] mx-auto h-20 rounded-3xl p-2 px-10">
          <div className="w-full m-auto text-start">
            <h1 className="font-semibold text-white text-2xl">Your Forms!</h1>
          </div>
          <div className=" w-full m-auto hover:cursor-pointer text-end">
            <Link
              to="/add/form"
              className="font-bold bg-white lg:rounded-3xl lg:p-3 p-1 rounded-md"
            >
              Add new Form
            </Link>
          </div>
        </div>
        {loading ? (
          <div className="w-full h-full flex-col flex justify-center mb-10">
            <img
              src={ro}
              alt="Nothing found"
              className="object-contain h-64 w-96 mx-auto"
            />
            <h1 className="mx-auto text-2xl text-center font-medium">
              Loading...
            </h1>
          </div>
        ) : (
          <div>
            {forms? <ItemMap item={forms} setFormId={setFormId} setLoading={setLoading} setForms={setForms}/> :null}
          </div>
        )}
      </div>
    </div>
  );
}

export default Forms;
