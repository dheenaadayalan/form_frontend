import React from "react";
import { useNavigate } from "react-router-dom";

const coverPic = [
  "https://rb.gy/guznc9",
  "https://rb.gy/vvliic",
  "https://rb.gy/1r3pb9",
  "https://rb.gy/ao8f3r",
  "https://rb.gy/xfxsy4",
  "https://shorturl.at/v5zvE",
  "https://shorturl.at/LDsqe",
  "https://shorturl.at/lSj2D",
  "https://shorturl.at/4r6Ee",
  "https://shorturl.at/LH4TU",
];

function ResMap({ item, setFormId, setLoading }) {
  const navigate = useNavigate();
  const randomPic = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-4 mx-4">
      {item.map((res, i) => {
        return (
          <div className="bg-white shadow-xl rounded-lg p-4" key={i}>
            <img
              src={randomPic(coverPic)}
              alt={"hello"}
              className="w-full h-44 object-cover rounded-t-lg"
            />
            <h2 className="text-xl font-semibold mt-2">{res.title}</h2>
            <a
              href={`http://localhost:5173/form/${res._id}`}
              target="_blank"
              className="text-blue-500 underline"
            >
              Your Form Link
            </a>
            <div className="flex flex-row justify-evenly h-8 my-4 gap-4">
              <div
                onClick={() => {
                  setFormId(res._id);
                  navigate(`/all/responses/${res._id}`);
                }}
                className="hover:bg-blue-300 w-full rounded-xl text-center hover:cursor-pointer my-auto border border-blue-600"
              >
                <p className="text-base font-medium ">View All Respones</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ResMap;
