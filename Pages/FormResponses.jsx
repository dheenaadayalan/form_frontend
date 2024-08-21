import React, { useEffect, useState } from "react";
import nores from "../Assets/nores.png";
import ro from "../Assets/hi.jpg";

function FormResponses({ formId }) {
  const api = "https://form-backend-tfpv.onrender.com/api/form/res/byId";
  const [loading, setLoading] = useState(false);
  const [formItem, setFormItem] = useState([]);
  const [data, setData] = useState(false);
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const getForm = async (url, method) => {
    const data = { formID: formId };
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      if (responseData.success == true) {
        setLoading(false);
        if (responseData.form.length > 0) {
          setFormTitle(responseData.form[0].title);
          setFormItem(responseData.form[0].responses);
          setData(true);
        }
      }
    } catch (error) {
      setLoading(true);
      console.error("Error:", error);
      throw error;
    }
  };
  useEffect(() => {
    getForm(api, "POST");
  }, []);
  return (
    <div className="w-full h-[100vh] bg-primary grid content-center">
      {loading ? (
        <div className="lg:w-[70vw] w-[80vw] m-auto h-[80vh] rounded-xl bg-white flex flex-col">
          <div className="my-auto">
            <img
              src={ro}
              alt="Nothing found"
              className="object-contain h-64 w-96 mx-auto "
            />
            <h1 className="mx-auto text-2xl text-center">Loading...</h1>
          </div>
        </div>
      ) : (
        <div>
          {data ? (
            <div className="lg:w-[60vw] w-[80vw] m-auto h-[80vh] rounded-xl bg-white flex flex-col overflow-auto gap-5 p-4">
              <h1 className="text-5xl text-start font-bold">{formTitle}</h1>
              {formItem.map((response, responseIndex) => (
                <div
                  key={responseIndex}
                  className={`${
                    responseIndex % 2 == 0 ? "bg-slate-300" : "bg-white"
                  } p-2 rounded-lg`}
                >
                  <h2>Response {responseIndex + 1}</h2>
                  {response.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <p>
                        <b>{Object.keys(item)[0]}:</b> {Object.values(item)[0]}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="lg:w-[70vw] w-[80vw] m-auto h-[80vh] rounded-xl bg-white flex flex-col">
              <div className="my-auto">
                <img
                  src={nores}
                  alt="Nothing found"
                  className="object-contain h-64 w-96 mx-auto "
                />
                <h1 className="mx-auto text-2xl text-center">
                  No Data found! Please Share your form.
                </h1>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FormResponses;
