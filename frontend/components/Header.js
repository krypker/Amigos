import useMetaMask from "../lib/hooks/metamask";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { popupForm } from "../lib/utils/util";
import WalletButton from "./WalletButton";
import Link from "next/link";

const Header = () => {
  const { isActive, account } = useMetaMask() || {};
  const [hiddenMenu, setHiddenMenu] = useState(true);
  const owner_address = process.env.NEXT_PUBLIC_OWNER_ACCOUNT;

  return (
    <div className='flex justify-between lg:justify-center items-center mx-auto w-full'>
      <div className='flex flex-beteew p-6 w-1/4'>
        <ul className='flex menu items-start justify-start gap-3'>
          <li key='1'>
            <Link href='https://cuatroceronueve.io'>
              <a target='_blank' className='social'>
                <FontAwesomeIcon icon={faGlobe} />
              </a>
            </Link>
          </li>
          <li key='2'>
            <Link href='https://discord.gg/wuDCbbZHFE'>
              <a target='_blank' className='social'>
                <FontAwesomeIcon icon={faDiscord} />
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div className='lg:block hidden w-5/6 md:w-4/6'>
        <ul className='flex items-center justify-end gap-3'>
          <li
            key='1'
            className={!isActive || account !== owner_address ? "hidden" : ""}
          >
            <Link href='/'>
              <a className='link'>Home</a>
            </Link>
          </li>
          <li
            key='2'
            className={!isActive || account !== owner_address ? "hidden" : ""}
          >
            <Link href='/whitelist'>
              <a className='link'>Whitelist</a>
            </Link>
          </li>
          <li
            key='3'
            className={!isActive || account !== owner_address ? "hidden" : ""}
          >
            <a className='link' onClick={() => popupForm()}>
              Transfer
            </a>
          </li>
          <li key='4' className='flex'>
            <WalletButton />
          </li>
        </ul>
      </div>
      <div className='block lg:hidden lg:w-4/6'>
        <a
          href='#'
          className='link'
          id='mobile-menu'
          onClick={() => setHiddenMenu(!hiddenMenu)}
        >
          Menu
        </a>
        <ul
          className={
            (hiddenMenu ? "hidden" : "") +
            " mobile-links w-full absolute z-50 left-0 text-center bg-gray-800 "
          }
        >
          <li
            key='1'
            className={!isActive || account !== owner_address ? "hidden" : ""}
          >
            <Link href='/'>
              <a className='social-menu'>Home</a>
            </Link>
          </li>
          <li
            key='2'
            className={!isActive || account !== owner_address ? "hidden" : ""}
          >
            <Link href='/whitelist'>
              <a className='social-menu'>Whitelist</a>
            </Link>
          </li>
          <li
            key='3'
            className={!isActive || account !== owner_address ? "hidden" : ""}
          >
            <a href='#' className='social-menu' onClick={() => popupForm()}>
              Transfer
            </a>
          </li>
          <li key='4'>
            <WalletButton />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
