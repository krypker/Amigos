import axios from "axios";
import Swal from "sweetalert2";
import images from "../../components/images";
import arrayDisponibles from "../../data/availables.json";
import {
  mintTokenTransfer,
  checkOwnerToken,
  getContractTokenID,
  getContractOwners,
  getTokenCount,
} from "./_web3";

const OWNER_ADDRESS = "0x6E6752e757282f5907E9898804a716bcD8373b4a";
//process.env.NEXT_PUBLIC_OWNER_ACCOUNT;

export const popupConfirmation = (status, hash, tokenId) => {
  Swal.fire({
    icon: status ? "success" : "error",
    title: status ? "Mint token (" & tokenId & ")" : "Reverted",
    html: status
      ? `<span style='font-size:14px'>Transaction completed.</span><br><span style='font-size:12px'>${hash}</span>`
      : `<span style='font-size:14px'>Transaction has been reverted by the EVM.</span>`,
  });
};

export const popupImage = (picture) => {
  Swal.fire({
    imageUrl: `./tokens/${picture}.png`,
    imageWidth: 409,
    imageHeight: 409,
    showCloseButton: false,
    showCancelButton: true,
    showConfirmButton: false,
    cancelButtonText: "Close",
    focusConfirm: false,
    imageAlt: "AMIGO 409",
    onOpen: () => Swal.disableConfirmButton(),
  });
};

export const popupForm = () => {
  Swal.fire({
    title: "Transfer token",
    html: `
    <input type="text" id="id" class="w-5/6 p-2 mx-2 mb-5 rounded-md border-2 text-sm focus:border-indigo-300 focus:ring-1 focus:ring-indigo-200 outline-none text-gray-700" placeholder="ID Token">
    <input type="text" id="to" pattern='^0x[a-fA-F0-9]{40}$' class="w-5/6 p-2 mx-2 mb-5 text-sm rounded-md border-2 focus:border-indigo-300 focus:ring-1 focus:ring-indigo-200 outline-none text-gray-700" placeholder="To" >
    <input type="text" id="from" readonly class="read-only:bg-gray-100 text-sm w-5/6 p-2 mx-2 mb-5 rounded-md border-2 focus:border-indigo-300 focus:ring-1 focus:ring-indigo-200 outline-none text-gray-700" placeholder="From" value="${OWNER_ADDRESS}">`,

    confirmButtonText: "Transfer",
    confirmButtonColor: "#1e3a8a",
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: async () => {
      const id = Swal.getPopup().querySelector("#id").value;
      const to = Swal.getPopup().querySelector("#to").value;
      if (!id || !to) {
        Swal.showValidationMessage(
          `Please enter all data [To address and Token Id are required]`
        );
      }
      if (id > 0 && to) {
        const validaToken = await checkOwnerToken(id);
        if (validaToken) {
          Swal.showValidationMessage(`Token #${id} has been assigned`);
        }
      }
      if (id > 409 && to) {
        Swal.showValidationMessage(`Max. token Id 409`);
      }
      return { tokenId: id, to: to };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      (async function () {
        await mintTokenTransfer(to.value, from.value, id.value)
          .then((result) => {
            Swal.fire({
              icon: result.success ? "success" : "error",
              title: result.success
                ? "Transaction succesful"
                : "Transaction failed",
              html: result.success
                ? `<span style='font-size:14px'>Transaction completed.</span><br><span style='font-size:12px'>${result.blockhash}</span>`
                : `<span style='font-size:14px'>Transaction has been reverted by the EVM.</span>`,

              confirmButtonColor: "#1e3a8a",
            }).finally(() => {
              location.reload();
            });
          })
          .catch((e) => {
            console.log(e);
            Swal.fire({
              icon: "error",
              title: "Transaction failed",
              text: e,
            });
          });
      })();
    }
  });
};

export const checkIsMerkleTreeValid = async (account) => {
  const { MerkleTree } = require("merkletreejs");
  const keccak256 = require("keccak256");
  const url = "http://127.0.0.1:3000/api/getAddress";
  const response = await axios.get(url);
  const result = await response.data;
  const whitelist = result.map((item) => item.address);
  const whitelistLeafNodes = whitelist.map((addr) => keccak256(addr));
  const merkleTree = new MerkleTree(whitelistLeafNodes, keccak256, {
    sortPairs: true,
  });
  const hashedAddress = keccak256(account);
  const proof = merkleTree.getHexProof(hashedAddress);
  const root = merkleTree.getHexRoot();
  const valid = merkleTree.verify(proof, hashedAddress, root);

  return {
    proof,
    valid,
  };
};

export const joinDataArray = async (tokenMinting) => {
  const tokenMinted = await getContractTokenID();
  const tokenOwners = await getContractOwners();
  const totalMinted = await getTokenCount();

  const arrayTokens = images.map((item) => ({
    ...item,
    available:
      arrayDisponibles.filter((value) => value == -1).length == 1
        ? true
        : arrayDisponibles.filter((value) => value == 0).length == 1
        ? false
        : arrayDisponibles.filter((value) => value == item.token_id) > 0
        ? true
        : false,
    contract:
      (tokenMinted || []).filter((value) => value == item.token_id).length > 0
        ? true
        : false,
    minting: item.token_id === tokenMinting ? true : false,
    owner:
      (tokenOwners || []).findIndex((value) => value.tokenId == item.token_id) >
      -1
        ? tokenOwners.filter((value) => value.tokenId == item.token_id)[0].owner
        : null,
  }));

  return { arrayTokens, totalMinted };
};
