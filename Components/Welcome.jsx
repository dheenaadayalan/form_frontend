import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import home from "../Assets/home.png";

function Welcome() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="bg-primary w-full px-4 items-center lg:px-52 mx-auto flex lg:flex-row flex-col-reverse py-5 h-full lg:h-[50vh]">
        <div className="w-[50vw] flex justify-center">
          <img
            src={home}
            alt="Home Pic"
            className="object-contain h-80 w-96 mx-auto"
          />
        </div>
        <div className="flex flex-col w-[50vw] gap-3">
          <h1 className="lg:text-3xl text-lg font-bold text-center text-white mx-auto">
            <span className="italic"> Hola a todos!</span>
            <br /> Create Your Perfect Form
          </h1>
          <hr className="w-[40%] mx-auto" />
          <h1 className="text-base lg:text-lg font-normal w-full lg:w-[25vw] text-white mx-auto text-center">
            Our intuitive one tap interface lets you create professional forms
            in minutes. Focus on your business, not your paperwork.
          </h1>
          <div 
          onClick={()=>{navigate("/profile")}}
          className="w-full lg:w-[15vw] bg-white rounded-2xl p-1 mx-auto hover:cursor-pointer hover:bg-yellow-200">
            <h1 className="text-primary font-bold text-lg text-center hover:text-black">
              Create a Account
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-around bg-gray-200 lg:w-[25vw] xl:[20vw] gap-4 w-full mx-auto h-12 rounded-xl p-2 px-10">
        <div className=" text-center m-auto hover:cursor-pointer">
          <NavLink
            to="/forms"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-base bg-primary rounded-xl text-white p-2"
                : "text-base font-semibold"
            }
          >
            Forms
          </NavLink>
        </div>
        <div className=" text-center m-auto hover:cursor-pointer">
          <NavLink
            to="/response"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-base bg-primary rounded-xl text-white p-2"
                : "text-base font-semibold"
            }
          >
            Response
          </NavLink>
        </div>
        <div className="text-center m-auto hover:cursor-pointer">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-base bg-primary rounded-xl text-white p-2"
                : "text-base font-semibold"
            }
          >
            Profile
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
