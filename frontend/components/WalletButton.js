import React from "react";
import useMetaMask from "../lib/hooks/metamask";
import Login from "./Login";
import { ENSName } from "react-ens-name";

export default function WalletButton() {
  const { connect, disconnect, isActive, account } = useMetaMask() || {};

  return (
    <div className='align-text-bottom mx-auto w-48 text-center'>
      <button
        onClick={connect}
        className={
          (isActive ? "hidden" : "") +
          " cursor-pointer lg:text-gray-500 text-white font-bold py-2 px-6 rounded-full align-middle transition duration-500 text-sm"
        }
      >
        {"CONNECT WALLET"}
      </button>
      <button
        onClick={disconnect}
        className={
          (isActive ? "" : "hidden") +
          " first:cursor-pointer lg:text-gray-500 text-white font-bold py-2 px-0 rounded-full align-middle transition duration-500 lg:hover:text-gray-700 text-sm"
        }
      >
        {isActive && (
          <ENSName
            address={account}
            displayType={"FIRST4_LAST4"}
            withEllipses
          ></ENSName>
        )}
      </button>
      <Login />
    </div>
  );
}
