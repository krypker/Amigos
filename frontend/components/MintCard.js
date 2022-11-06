import React from "react";
import { popupImage } from "../lib/utils/util";
import { ENSName } from "react-ens-name";

export default function MintCard({
  identificador,
  picture,
  available,
  minting,
  owner,
  canMint,
  whitelist,
  contract,
  action,
}) {
  return (
    <div className='h-full border-0 border-gray-100 border-opacity-60 overflow-hidden'>
      <div className='pt-2 pb-1 flex items-center text-center justify-between px-1'>
        <span className='tracking-normal lg:text-md text-sm title-font font-normal text-gray-500 mb-0 text-center'>
          {String(`${identificador}`).padStart(3, "0")}
        </span>
        <div className='flex items-center text-center justify-center'>
          <a
            onClick={() => action(`${identificador}`)}
            className={
              canMint || contract || !available || !whitelist || minting
                ? "hidden"
                : "" +
                  "text-gray-500 inline-flex items-center lg:mb-0 cursor-pointer lg:text-md text-sm"
            }
          >
            mint
          </a>
        </div>
      </div>

      <img
        className='lg:h-auto md:h-36 sm:h-36 w-full object-cover object-center'
        onClick={() => popupImage(`${identificador}`)}
        src={`${picture}`}
        alt='Token'
      />
      {minting == identificador && (
        <p className='text-gray-500 text-center text-sm pt-2'>Minting...</p>
      )}

      {contract && !owner && (
        <p className='text-gray-500 text-center text-sm pt-2'>Loading...</p>
      )}

      {contract && owner && (
        <p className='text-gray-500 text-center text-sm pt-2'>
          <ENSName
            address={owner}
            displayType={"FIRST4_LAST4"}
            withEllipses
          ></ENSName>
        </p>
      )}
    </div>
  );
}
