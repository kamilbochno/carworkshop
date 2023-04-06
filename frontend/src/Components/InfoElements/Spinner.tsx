import * as React from "react";
import { useContext } from "react";
import { Oval } from "react-loader-spinner";
import LoadingContext from "../context/LoadingProvider.tsx";

function Spinner() {
  const { loading } = useContext<any>(LoadingContext);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 bg-gray-700 opacity-70 z-10 h-full w-full">
      <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 ">
        <Oval
          ariaLabel="loading-indicator"
          height={120}
          width={120}
          strokeWidth={1}
          strokeWidthSecondary={3}
          color="white"
          secondaryColor="transparent"
        />
        <p className="opacity-100 text-white ml-6 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
}

export default Spinner;
