import { ethers } from 'ethers';

const contractABI = [
  "function submitPaper(string memory title, string memory abstract, string memory field, string memory ipfsHash) public",
  "function submitReview(uint256 paperId, uint8 rating, string memory comments) public",
  "function getPaper(uint256 paperId) public view returns (string memory title, string memory abstract, string memory field, string memory ipfsHash, address author)",
  "event PaperSubmitted(uint256 indexed paperId, address indexed author, string title)",
  "event ReviewSubmitted(uint256 indexed paperId, address indexed reviewer, uint8 rating)"
];

const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with actual contract address

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask to use this feature");
  }

  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    return await provider.getSigner();
  } catch (error) {
    if (error.code === 4001) {
      throw new Error("Please connect your wallet to continue");
    } else if (error.code === -32002) {
      throw new Error("Please check MetaMask - a connection request is pending");
    }
    throw new Error("Failed to connect wallet. Please try again");
  }
}

export async function submitPaperToBlockchain(
  title: string,
  abstract: string,
  field: string,
  ipfsHash: string
) {
  try {
    const signer = await connectWallet();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    
    const tx = await contract.submitPaper(title, abstract, field, ipfsHash);
    await tx.wait();
    
    return tx.hash;
  } catch (error) {
    if (error.code === 'ACTION_REJECTED') {
      throw new Error("Transaction was rejected. Please try again");
    }
    throw new Error(error.message || "Failed to submit paper");
  }
}

export async function submitReviewToBlockchain(
  paperId: string,
  rating: number,
  comments: string
) {
  try {
    const signer = await connectWallet();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    
    // Convert paperId to BigInt as contract expects uint256
    const paperIdBN = BigInt(paperId);
    
    const tx = await contract.submitReview(paperIdBN, rating, comments);
    await tx.wait();
    
    return tx.hash;
  } catch (error) {
    if (error.code === 'ACTION_REJECTED') {
      throw new Error("Transaction was rejected. Please try again");
    }
    throw new Error(error.message || "Failed to submit review");
  }
}