/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../styles/index.css";

//Redux
import { connect } from "react-redux";
import logout from "../tools/logout";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DropdownUser = (props) => {
  const { user } = props;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-cyan-500">
          <div
            className={`flex flex-col items-end justify-center whitespace-nowrap`}
          >
            <div className={`m-0 text-left font-semibold select-none`}>
              {user.name}
            </div>
            <div className={`mt-[-5px] text-xs text-left select-none`}>
              {user.role}
            </div>
          </div>
          <div
            className={`w-[32px] h-[32px] ml-2 rounded-full border border-slate-50 overflow-hidden flex justify-center items-center`}
          >
            <FontAwesomeIcon
              icon={faUser}
              className={`w-[24px] h-[24px] text-slate-400`}
            />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="submit"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full text-left px-4 py-2 text-sm"
                  )}
                  onClick={() => {
                    logout();
                    window.location.reload(true);
                  }}
                >
                  Cerrar sesión
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState, null)(DropdownUser);
