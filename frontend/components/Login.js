import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import BeatLoader from "react-spinners/BeatLoader";
import {
  tokenIsClaimed,
  getTokenAvatar,
  getVerifyMerkleTree,
} from "../lib/utils/_web3";
import {
  checkIsMerkleTreeValid,
  checkIsMerkleTreeValidJson,
  popupImage,
} from "../lib/utils/util";

export default function Login() {
  const [whitelistValid, setWhitelistValid] = useState(false);
  const [urlWhiteList, setUrlWhiteList] = useState(false);
  const [tokenAvatar, setTokenAvatar] = useState(false);
  const [tokenClaimed, setTokenClaimed] = useState(0);
  const [loading, setLoading] = useState(true);
  const { active, account } = useWeb3React();

  let imgAvatar = null;
  let imgNoWhiteList = null;
  let imgMintAvailable = null;

  const OWNER_ADDRESS = process.env.NEXT_PUBLIC_OWNER_ACCOUNT;

  useEffect(() => {
    if (!active || !account) {
      setWhitelistValid(false);
      return;
    }

    async function chackValidMerkleTree() {
      setLoading(true);

      const { proof } = await checkIsMerkleTreeValidJson(account);
      const resultAvatar = await getTokenAvatar(account);
      setTokenAvatar(resultAvatar);

      const resultClaimed = await tokenIsClaimed(account);
      setTokenClaimed(resultClaimed);

      const verify = await getVerifyMerkleTree(proof, account);
      setWhitelistValid(verify);

      setLoading(false);
    }
    if (account) {
      chackValidMerkleTree();
    }
  }, [account, active]);

  useEffect(() => {
    async function checkWhiteListPage() {
      setUrlWhiteList(window.location.pathname.includes("whitelist"));
    }

    checkWhiteListPage();
  }, []);

  imgAvatar = active && tokenAvatar && !urlWhiteList && active && (
    <div className='mx-auto' key='1'>
      <img
        className='mx-auto mb-4'
        onClick={() => popupImage(`${tokenAvatar}`)}
        src={`./tokens/${tokenAvatar}.png`}
        width='100'
        height='100'
        alt='Avatar'
      />
    </div>
  );

  imgNoWhiteList = active && !whitelistValid && (
    <div
      key='2'
      className='text-zinc-600 font-semibold p-2 leading-tight flex flex-col justify-center items-center mx-auto border border-solid border-neutral-400'
      style={{ width: "100px", height: "100px" }}
    >
      You are not yet on the mint list
    </div>
  );

  imgMintAvailable = active &&
    whitelistValid &&
    !tokenClaimed &&
    OWNER_ADDRESS != account && (
      <div
        key='3'
        className='text-zinc-600 font-semibold p-2 leading-tight flex flex-col justify-center items-center mx-auto border border-solid border-neutral-400'
        style={{ width: "100px", height: "100px" }}
      >
        You can mint the one you like
      </div>
    );

  return (
    <div className='lg:w-48 lg:absolute top-14 mb-0 mt-2 justify-center text-center text-gray-400 text-base md:pb-5 sm:pb-5'>
      {loading && active ? (
        <div className='h-auto p-0 text-center d-none'>
          <BeatLoader color='#909090' loading={loading} size={5} />
        </div>
      ) : (
        [imgAvatar, imgNoWhiteList, imgMintAvailable]
      )}
    </div>
  );
}
