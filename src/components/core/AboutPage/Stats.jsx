import React, { useEffect, useState } from "react";
import { apiConnector } from "../../../services/apiConnector";
import { aboutStatsEndpoints } from "../../../services/apis";


const StatsComponent = () => {
  const [stats,setStats]=useState([]);
  useEffect(()=>{
    const fetchStats=async()=>{
    try{
      
      const response=await apiConnector('GET',aboutStatsEndpoints.STATS_API);
      console.log(response)
      setStats(response.data.data)
      
      
    }catch(error){
        console.error("Error in fetchStats:", error);
        console.error("Error.response:", error.response);
        console.error("Error.request:", error.request);
        console.error("Error.code:", error.code);
    }
  };
  fetchStats();
  },[])
  return (
    <div className="bg-base-200">
      {/* Stats */}
      <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-base-content mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center">
          {stats.map((data, index) => {
            return (
              <div className="flex flex-col py-10" key={index}>
                <h1 className="text-[30px] font-bold text-base-content">
                  {data.count}
                </h1>
                <h2 className="font-semibold text-[16px] text-base-content/70">
                  {data.label}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;
