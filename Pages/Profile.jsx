import React from 'react'
import Welcome from '../Components/Welcome'
import wait from "../Assets/wait.png";

function Profile() {
  return (
    
    <div>
      <Welcome />
      <div className="w-full h-full flex-col flex justify-center mb-10">
        <img
          src={wait}
          alt="Nothing found"
          className="object-contain h-64 w-96 mx-auto"
        />
        <h1 className="mx-auto text-2xl text-center font-medium">
          You are early! Update coming soon.
        </h1>
      </div>
    </div>
  )
}

export default Profile