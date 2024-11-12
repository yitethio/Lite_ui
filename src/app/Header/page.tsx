import React from "react";
const   Header = () => {
    return(

        <>
        <div className="h-[80px] w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#5C1B96] via-[#5D4792] via-[#5E7E8C] via-[#7B549A] via-[#9E21AA] via-[#A5139C] to-[#C825B8]">
        
            <div className="w-full flex justify-between items-center px-8 absolute top-0 h-16">
                    <p className="text-white font-[Jaro] text-lg">
                        LIYT
                    </p>
                    <div className="flex space-x-6 text-white">
                        <p>Home</p>
                        <p>About</p>
                        <p>Dashboard</p>
                    </div>
                    <button
                        className="text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-purple-600 transition"
                    >
                        Sign Up
                    </button>
                </div>
        </div>
        </>
    );
};
export default Header