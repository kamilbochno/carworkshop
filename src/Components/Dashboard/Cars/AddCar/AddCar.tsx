import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function AddCar({ openAddCar, setIsOpenAddCar }) {
  const [carsData, setCarsData] = useState<any>([]);
  const [carModels, setCarModels] = useState<any>([]);

  const getCarsData = () => {
    axios.get("/dashboard/cars/addcar/getCars").then((response) => {
      let carsData = response.data;
      setCarsData(carsData);
    });
  };

  useEffect(() => {
    getCarsData();
  }, []);

  function handleChangeBrand(e) {
    const brand = e.target.value;
    let models = carsData.filter((x) => x.brand === brand);
    setCarModels(models[0].models);
  }

  function handleChangeModel(e) {
    console.log(e.target.value);
  }

  const handleSubmitCar = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const carBrand = e.target.carBrand.value;
    const carModel = e.target.carModel.value;
    const engine = e.target.engine.value;
    const hp = e.target.hp.value;
    const year = e.target.year.value;
    const mileage = e.target.mileage.value;
    const vin = e.target.vin.value;

    const carData = {
      carBrand: carBrand,
      carModel: carModel,
      engine: engine,
      hp: hp,
      year: year,
      mileage: mileage,
      vin: vin,
      token: token
    };
    if (
      carData.carBrand &&
      carData.carModel &&
      carData.engine &&
      carData.hp &&
      carData.year &&
      carData.mileage &&
      carData.vin
    ) {
      try {
        const car = await axios.post("/dashboard/cars/addcar", carData).then((res) => {
          if (res.status === 201) {
            setIsOpenAddCar(false);

            console.log(res.data);
          }
        });
      } catch (err) {
        if (err.response.status === 400) {
          console.log(err.response.data);
        }
      }
    }
    console.log(carData);
  };
  if (!openAddCar) return null;

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-center justify-between p-6 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font=semibold mx-auto">Add car to your account</h3>
            <button
              type="button"
              onClick={() => setIsOpenAddCar(false)}
              className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm inline-flex items-center"
              data-modal-hide="defaultModal">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="relative p-4 flex-auto">
            <form className="px-8 w-full" onSubmit={handleSubmitCar}>
              <label className="block text-sm font-medium text-black">Select your car brand</label>
              <select
                id="carBrand"
                name="carBrand"
                onChange={handleChangeBrand}
                className="border mb-2 border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value={""} selected disabled>
                  Select...
                </option>
                {carsData.map((cars) => (
                  <option key={cars._id} value={cars.brand}>
                    {cars.brand}
                  </option>
                ))}
              </select>
              <label className="block text-sm font-medium text-black">Select your car model</label>
              <select
                id="carModel"
                name="carModel"
                onChange={handleChangeModel}
                className="border mb-2 border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected disabled>
                  Select...
                </option>
                {carModels.map((models) => (
                  <option value={models}>{models}</option>
                ))}
              </select>
              <label className="block text-sm font-medium text-black">Engine</label>
              <input
                name="engine"
                className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
              />
              <label className="block text-sm font-medium text-black">Hp</label>
              <input
                name="hp"
                className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
              />
              <label className="block text-sm font-medium text-black">Year of production</label>
              <input
                name="year"
                className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
              />
              <label className="block text-sm font-medium text-black">Car mileage</label>
              <input
                name="mileage"
                className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
              />
              <label className="block text-sm font-medium text-black">VIN number</label>
              <input
                name="vin"
                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
              />
              <div className="flex justify-center items-center mt-4">
                <button
                  className="text-white bg-blue-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-blue-600 outline-none focus:outline-none mr-1 mb-1"
                  type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCar;
