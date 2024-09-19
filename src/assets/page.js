import React from 'react';

export default function Page() {
    return (
      <div className="min-h-screen bg-slate-700 flex flex-col items-center justify-center p-5">
        <div className="text-center text-white space-y-4">
          <h1 className="text-4xl font-bold w-full">WORKOUT PLANS</h1>
          <div className="flex flex-row  justify-between text-lg">
            <div>
              <h2>0</h2>
              <p>EXERCISES</p>
            </div>
            <div>
              <h2>0</h2>
              <p>KCAL</p>
            </div>
            <div>
              <h2>0</h2>
              <p>MINS</p>
            </div>
          </div>
          <p className="text-lg text-center w-full">Choose your Workout!</p>
          <button className="bg-white text-blue-500 ease-in-out px-4 py-2 rounded-md font-bold duration-300 hover:scale-110 active:scale-90">
            CREATE YOUR PLAN HERE!
          </button>
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white relative flex flex-col active:scale-95 ease-in-out duration-200 items-center justify-center group rounded-lg shadow-lg overflow-hidden h-96 w-96" >
              <img src="/full-body.webp" alt="Full Body" className=" w-full group-hover:blur-sm group-hover:brightness-75 group-hover:scale-105 ease-in-out duration-200 h-full object-cover rounded-md" />
              <p className="absolute font-bold mt-2 text-white scale-0 group-hover:scale-100 duration-300 ease-in-out text-2xl ">FULL BODY WORKOUT</p>
            </div>
            <div className="bg-white relative flex flex-col active:scale-95 ease-in-out duration-200 items-center justify-center group rounded-lg shadow-lg overflow-hidden h-96 w-96" >
              <img src="/abs-begineer.jpg" alt="Full Body" className="relative w-full group-hover:blur-sm group-hover:brightness-75 group-hover:scale-105 ease-in-out duration-200 h-full object-cover rounded-md" />
              <p className="absolute font-bold mt-2 text-white scale-0 group-hover:scale-100 duration-300 ease-in-out text-2xl ">ABS BEGINNER</p>
            </div>
            <div className="bg-white relative flex flex-col active:scale-95 ease-in-out duration-200 items-center justify-center group rounded-lg shadow-lg overflow-hidden h-96 w-96" >
              <img src="/arm-begineer.webp" alt="Full Body" className="relative w-full group-hover:blur-sm group-hover:brightness-75 group-hover:scale-105 ease-in-out duration-200 h-full object-cover rounded-md" />
              <p className="absolute font-bold mt-2 text-white scale-0 group-hover:scale-100 duration-300 ease-in-out text-2xl ">ARM BEGINNER</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  