import React, { useEffect, useState } from "react";
import Welcome from "../Components/Welcome";
import ResMap from "../Components/ResMap";
import ro from "../Assets/hi.jpg";

function Response({ setFormId }) {
  const api = "https://form-backend-tfpv.onrender.com/api/all/form";
  const [loading, setLoading] = useState(false);
  const [forms, setForms] = useState(null);

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
            {forms? <ResMap item={forms} setFormId={setFormId} setLoading={setLoading} /> :null}
          </div>
        )}
    </div>
  );
}

export default Response;
