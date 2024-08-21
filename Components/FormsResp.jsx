import { info } from "autoprefixer";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function FormsResp() {
  const { id } = useParams();
  const api = "https://form-backend-tfpv.onrender.com/api/form/byId";
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formItem, setFormItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getForm = async (url, method) => {
    const data = { formID: id };
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
        setFormTitle(responseData.form.title);
        setFormItem(
          responseData.form.formData.map((item) => ({
            ...item,
            value: "",
          }))
        );
      }
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.error("Error:", error);
      throw error;
    }
  };

  const handleChangeArray = (id, newValue) => {
    setFormItem((prevFormItem) =>
      prevFormItem.map((item, index) =>
        index === id ? { ...item, value: newValue } : item
      )
    );
  };

  const submitForm = async () => {
    setLoading(true);
    const data = {
      title:formTitle,
      formID: id,
      formData: formItem.map((item) => ({ [item.placeholder]: item.value })),
    };
    try {
      const response = await fetch("https://form-backend-tfpv.onrender.com/api/form/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      alert("Form submitted successfully:)");
      navigate("/thanks");
      console.log("Form submitted successfully:", responseData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    getForm(api, "POST");
  }, []);

  return (
    <div className="w-full h-[100vh] bg-primary grid content-center">
      <div className="lg:w-[60vw] w-[80vw] m-auto h-[80vh] rounded-xl bg-white flex flex-col overflow-auto gap-5 p-4">
        <div className="flex flex-row justify-between">
          <h1 className="text-5xl text-start font-bold">{formTitle}</h1>
          <div
            className={`my-auto rounded-xl bg-primary p-2 hover:cursor-pointer ${loading?"opacity-30":null}`}
            onClick={() => {
              submitForm();
            }}
          >
            <h1 className="text-xl text-white">{loading?"Loading...":"Save"}</h1>
          </div>
        </div>
        {formItem.map((res, i) => {
          return (
            <div key={i} className="flex flex-col">
              <label className="text-xl font-semibold">
                You'r {res.placeholder}
              </label>
              <input
                type={res.type}
                placeholder={res.placeholder}
                className="h-12 rounded-2xl border-solid border-secondary border-2 p-2"
                value={res.value}
                onChange={(event) => handleChangeArray(i, event.target.value)}
                disabled={loading}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FormsResp;
