import React, { useState } from "react";
import not from "../Assets/not.png";
import { AiTwotoneDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function AddForms() {
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formItem, setFormItem] = useState([]);
  const [loading, setLoading] = useState(false);

  const postData = async (url, data, method) => {
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
      setLoading(false);
      const responseData = await response.json();
      if (responseData.success == true) {
        navigate("/forms");
      }
    } catch (error) {
      setLoading(true);
      console.error("Error:", error);
      throw error;
    }
  };

  const submit = () => {
    if (formItem.length == 0) {
      alert("The form can't be empty! Add few input feids");
      return;
    }
    if (formTitle == "Untitled Form") {
      alert("I am sure you would like to give your form a name!");
      return;
    }
    const data = { formItem: formItem, title: formTitle };
    postData("https://form-backend-tfpv.onrender.com/api/add/form", data, "POST");
  };

  const addInput = (type) => {
    const newFeild = {
      type: type,
      placeholder: "Add title/Placeholder",
      id: formItem.length,
      value: "",
    };
    setFormItem([...formItem, newFeild]);
  };

  const handleChange = (event) => {
    setFormTitle(event.target.value);
  };

  const handleDelete = (indexToDelete) => {
    const newItems = formItem.filter((_, index) => index !== indexToDelete);
    setFormItem(newItems);
  };

  const handleChangeArray = (id, newValue) => {
    setFormItem((prevFormItem) =>
      prevFormItem.map((item) =>
        item.id === id
          ? { ...item, placeholder: newValue, value: newValue }
          : item
      )
    );
  };

  return (
    <div className="w-full h-[100vh] bg-primary grid content-center">
      <div className="lg:w-[70vw] w-[80vw] m-auto h-[80vh] rounded-xl bg-white flex lg:flex-row flex-col overflow-auto lg:overflow-hidden">
        <div className="lg:w-[50vw] w-full h-full p-4 flex flex-col gap-4">
          <input
            type="text"
            className="w-full h-16 bg-gray-300 rounded-lg p-3"
            value={formTitle}
            onChange={handleChange}
          />
          {formItem.length > 0 ? (
            <div className="flex-wrap gap-3 flex justify-evenly overflow-auto">
              {formItem.map((res, index) => {
                return (
                  <div key={index} className="lg:w-[47%] w-[80%]">
                    <div className="flex flex-row ">
                      <input
                        type="text"
                        className="w-[90%] h-10 bg-gray-300 rounded-lg p-3"
                        placeholder={res.placeholder}
                        value={res.value}
                        onChange={(event) =>
                          handleChangeArray(res.id, event.target.value)
                        }
                      />
                      <div
                        className="w-[10%] ml-2 m-auto hover:cursor-pointer"
                        onClick={() => handleDelete(index)}
                      >
                        <AiTwotoneDelete />
                      </div>
                    </div>
                    <p className="text-xs font-semibold">Type: "{res.type}"</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full h-[50vh] flex-col flex justify-center">
              <img
                src={not}
                alt="Nothing found"
                className="object-contain h-64 w-96 mx-auto"
              />
              <h1 className="mx-auto text-2xl text-center">
                No input field found! Please add new form input field
              </h1>
            </div>
          )}
          <button
            disabled={loading}
            type="button"
            onClick={() => submit()}
            className={`bg-primary text-white font-bold text-xl rounded-xl p-2 w-[50vw] lg:w-[10vw] mx-auto ${
              loading ? "opacity-30" : null
            }`}
          >
            {loading ? "Loading" : " Save"}
          </button>
        </div>
        <div className="lg:w-[20vw] w-full lg:h-[80vh] lg:border-l-2 lg:border-primary p-4 ">
          <h1 className="text-center font-bold text-xl h-[10vh]">
            Add Input to form
          </h1>
          <div className="flex flex-col lg:h-[70vh] h-full gap-5 mt-8">
            <div
              className="bg-primary hover:cursor-pointer p-3 rounded-2xl hover:bg-secondary"
              onClick={() => addInput("text")}
            >
              <h1 className="text-white font-medium text-center text-lg">
                Text
              </h1>
            </div>
            <div
              className="bg-primary hover:cursor-pointer p-3 rounded-2xl hover:bg-secondary"
              onClick={() => addInput("email")}
            >
              <h1 className="text-white font-medium text-center text-lg">
                Email
              </h1>
            </div>
            <div
              className="bg-primary hover:cursor-pointer p-3 rounded-2xl hover:bg-secondary"
              onClick={() => addInput("password")}
            >
              <h1 className="text-white font-medium text-center text-lg">
                Password
              </h1>
            </div>
            <div
              className="bg-primary hover:cursor-pointer p-3 rounded-2xl hover:bg-secondary"
              onClick={() => addInput("number")}
            >
              <h1 className="text-white font-medium text-center text-lg">
                Number
              </h1>
            </div>
            <div
              className="bg-primary hover:cursor-pointer p-3 rounded-2xl hover:bg-secondary"
              onClick={() => addInput("date")}
            >
              <h1 className="text-white font-medium text-center text-lg">
                Date
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddForms;
