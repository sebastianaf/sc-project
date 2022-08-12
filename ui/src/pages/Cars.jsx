import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import DefaultLayout from "../layout/DefaultLayout";
import ProtectedRoute from "../routes/ProtectedRoute";
import ComputeLayout from "../layout/ComputeLayout";
import Spinner from "../components/Spinner";
import errorCodes from "../config/errorCodes";
import api2 from "../config/api2";

//Redux
import { connect } from "react-redux";
import { setModalOpen, setModalOptions } from "../actions";

const Cars = (props) => {
  const { setModalOpen, setModalOptions } = props;
  const [city, setCity] = useState(0);
  const [clients, setClients] = useState(1);
  const [seed, setSeed] = useState(40);

  const [sol, setSol] = useState("");
  const [calc, setCalc] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <ComputeLayout>
          <div className="text-lg md:text-xl font-bold m-3 md:m-5">
            Simulación de vehículos
          </div>
          <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 ">
            <div className="p-3 bg-white rounded-t-lg">
              <div class="flex justify-center">
                <div class="m-3 xl:w-96">
                  <label
                    for="city"
                    class="form-label inline-block mb-2 text-gray-700"
                  >
                    Ciudad
                  </label>
                  <input
                    type="number"
                    className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-cyan-700 focus:bg-white  focus:border-cyan-600 focus:outline-none"
                    id="city"
                    min={0}
                    max={2}
                    step={1}
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </div>
                <div class="m-3 xl:w-96">
                  <label
                    for="clients"
                    class="form-label inline-block mb-2 text-gray-700"
                  >
                    # Clientes
                  </label>
                  <input
                    type="number"
                    className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-cyan-700 focus:bg-white  focus:border-cyan-600 focus:outline-none"
                    id="clients"
                    min={1}
                    max={500}
                    step={1}
                    value={clients}
                    onChange={(e) => {
                      setClients(e.target.value);
                    }}
                  />
                </div>
                <div class="m-3 xl:w-96">
                  <label
                    for="seed"
                    class="form-label inline-block mb-2 text-gray-700"
                  >
                    Semilla
                  </label>
                  <input
                    type="number"
                    className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-cyan-700 focus:bg-white  focus:border-cyan-600 focus:outline-none"
                    id="seed"
                    min={1}
                    max={100}
                    step={1}
                    value={seed}
                    onChange={(e) => {
                      setSeed(e.target.value);
                    }}
                  />
                </div>
              </div>
              <Transition
                show={city !== "" && clients !== "" && seed !== "" && calc}
                enter="transition ease-out duration-500"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-500"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <label
                  htmlFor="message"
                  className={`block m-2 text-sm font-medium text-gray-900 dark:text-gray-400`}
                >
                  Respuesta
                </label>

                <textarea
                  id="message"
                  rows="4"
                  className={`min-h-[400px] block p-2.5 w-full text-lg md:text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-cyan-500 focus:border-cyan-500`}
                  readOnly
                  value={sol}
                ></textarea>
              </Transition>
            </div>
            <div className="flex flex-row-reverse items-center py-2 px-3 border-t ">
              <div className="flex pl-0 space-x-1 sm:pl-2">
                <button
                  className="inline-flex items-center py-2 px-4 border
                  border-transparent text-sm font-medium rounded-md text-white bg-cyan-600
                  hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2
                  focus:ring-cyan-500 duration-500 cursor-pointer disabled:hover:bg-slate-100 disabled:bg-slate-100 disabled:text-black"
                  disabled={loading}
                  onClick={async () => {
                    //console.log(params);
                    if (city !== "" && clients !== "" && seed !== "") {
                      try {
                        setLoading(true);
                        //fetch
                        const res1 = await axios({
                          url: `${api2.host}/cars`,
                          method: "POST",
                          params: { city, clients, seed },
                          config: {
                            headers: {
                              "Content-Type": "multipart/form-data",
                            },
                          },
                        });

                        if (res1.data !== "") {
                          //console.log(res1.data);
                          setSol(res1.data);
                          setLoading(false);
                          setCalc(true);
                        } else {
                          setModalOpen(true);
                          setModalOptions({
                            title: errorCodes.COMPUTE_ERROR.title,
                            description: errorCodes.COMPUTE_ERROR.description,
                            error: true,
                          });
                          setLoading(false);
                          setCalc(false);
                        }
                      } catch (error) {
                        setModalOpen(true);
                        setModalOptions({
                          title: errorCodes.COMPUTE_ERROR.title,
                          description: errorCodes.COMPUTE_ERROR.description,
                          error: true,
                        });
                        setLoading(false);
                        setCalc(false);
                      }
                    } else {
                      setModalOpen(true);
                      setModalOptions({
                        title: errorCodes.INCOMPLETE_PARAMS.title,
                        description: errorCodes.INCOMPLETE_PARAMS.description,
                        error: false,
                      });
                    }
                  }}
                >
                  {loading ? (
                    <Spinner loading />
                  ) : (
                    <FontAwesomeIcon
                      className={`text-white mr-2`}
                      icon={faPlay}
                    />
                  )}
                  Simular
                </button>
              </div>
            </div>
          </div>
          <p className="ml-auto text-xs text-gray-500 ">
            Aquí se deben escribir los parámetros de la simulación. [ Quito: 0 - Bogotá: 1 - México: 2 ]
          </p>
        </ComputeLayout>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

const mapState = (state) => {
  return {
    //Modal props
    modalOpen: state.modalOpen,
  };
};

const mapProps = {
  setModalOpen,
  setModalOptions,
};

export default connect(mapState, mapProps)(Cars);
