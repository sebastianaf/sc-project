/* This example requires Tailwind CSS v2.0+ */
import { Fragment /* useRef, */ } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";

//Redux
import { connect } from "react-redux";
import { setModalOpen, setLoading } from "../actions";

const Modal = (props) => {
  const { modalOptions, modalOpen, setModalOpen, setLoading } = props;

  /* const cancelButtonRef = useRef(null); */

  return (
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog
        as={`div`}
        className={`relative z-10`}
        /* initialFocus={cancelButtonRef} */
        onClose={setModalOpen}
      >
        <Transition.Child
          as={Fragment}
          enter={`ease-out duration-300`}
          enterFrom={`opacity-0`}
          enterTo={`opacity-100`}
          leave={`ease-in duration-200`}
          leaveFrom={`opacity-100`}
          leaveTo={`opacity-0`}
        >
          <div
            className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}
          />
        </Transition.Child>

        <div className={`fixed z-10 inset-0 overflow-y-auto`}>
          <div
            className={`flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0`}
          >
            <Transition.Child
              as={Fragment}
              enter={`ease-out duration-300`}
              enterFrom={`opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95`}
              enterTo={`opacity-100 translate-y-0 sm:scale-100`}
              leave={`ease-in duration-200`}
              leaveFrom={`opacity-100 translate-y-0 sm:scale-100`}
              leaveTo={`opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95`}
            >
              <Dialog.Panel
                className={`relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full`}
              >
                <div className={`bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}>
                  <div className={`sm:flex sm:items-start`}>
                    <div
                      className={`${
                        !modalOptions.error ? `bg-cyan-100` : `bg-red-100`
                      } mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10`}
                    >
                      {!modalOptions.error ? (
                        <InformationCircleIcon
                          className={`h-6 w-6 text-cyan-500`}
                          aria-hidden={true}
                        />
                      ) : (
                        <ExclamationIcon
                          className={`h-6 w-6 text-red-600`}
                          aria-hidden={true}
                        />
                      )}
                    </div>
                    <div
                      className={`mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left`}
                    >
                      <Dialog.Title
                        as={`h3`}
                        className={`text-lg leading-6 font-medium text-gray-900`}
                      >
                        {modalOptions.title}
                      </Dialog.Title>
                      <div className={`mt-2`}>
                        <p className={`text-sm text-gray-500`}>
                          {modalOptions.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse`}
                >
                  <button
                    type={`button`}
                    className={`${
                      !modalOptions.error
                        ? `bg-cyan-600 focus:ring-cyan-500 first-letter:hover:bg-cyan-700`
                        : `bg-red-600 focus:ring-red-500 first-letter:hover:bg-red-700`
                    } w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
                    onClick={() => {
                      setModalOpen(!modalOpen);
                      setLoading(false);
                    }}
                  >
                    Aceptar
                  </button>
                  {/* <button
                    type={`button`}
                    className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const mapStateToProps = (state) => {
  return {
    modalOpen: state.modalOpen,
    modalOptions: state.modalOptions,
  };
};

const mapDispatchToProps = {
  setModalOpen,
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
