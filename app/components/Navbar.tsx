import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="h-[60] w-full bg-[color:var(--primary)] fixed top-0 left-0 z-999 shadow-md">
        <div className="flex items-center justify-center gap-5 w-[40vw] h-full">
          <h1 className="text-2xl text-white ">CR-M</h1>
          <input
            type="text"
            className="h-[70%] w-[30vw] rounded-lg text-white  bg-white/20 px-5 "
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
