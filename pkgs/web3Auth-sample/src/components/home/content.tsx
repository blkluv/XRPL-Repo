import React from "react";
import { Balance } from "./balance";

/**
 * Content Component
 * @returns 
 */
export const Content = () => (
  <div className=" h-full">
    <div className="flex justify-center gap-4 xl:gap-12 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
      <div className="mt-6  gap-6 flex flex-col w-full">
        {/* Card Section Top */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Your Balance</h3>
          <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
            <Balance />
          </div>
        </div>
        {/* Chart */}
        <div className="h-full flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Statistics</h3>
          <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
            
          </div>
        </div>
      </div>
    </div>
  </div>
);
