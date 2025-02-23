import React, { useState } from "react";
import { ethers } from "ethers";

const positionManagerAddress = "0x1238536071E1c677A632429e3655c799b22cDA52";
const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/ZmPsiv5sxYgS0eCXGwon8UJYek3zAQpS"); 

const positionManagerAbi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
  "function positions(uint256 tokenId) view returns (uint256 liquidity, int24 tickLower, int24 tickUpper)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function tokenURI(uint256 tokenId) view returns (string)"
];

// Define the metadata structure
interface Metadata {
  name?: string;
  liquidity?: string;
  feeTier?: string;
  image?: string;
}

interface Position {
  tokenId: string;
  name: string;
  liquidity: string;
  feeTier: string;
  imageUrl: string | null;
}

const Positions: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);

  const positionManager = new ethers.Contract(positionManagerAddress, positionManagerAbi, provider);

  /** Fetch positions using wallet address */
  const fetchPositions = async () => {
    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      alert("Please enter a valid Ethereum wallet address!");
      return;
    }
    setLoading(true);

    try {
      const balance = await positionManager.balanceOf(walletAddress);
      const userPositions: Position[] = [];

      for (let i = 0; i < Number(balance); i++) {
        const tokenId = await positionManager.tokenOfOwnerByIndex(walletAddress, i);
        const tokenURI = await positionManager.tokenURI(tokenId);
        let metadataUrl = tokenURI;
        let metadata: Metadata = {}; // Now properly typed

        if (tokenURI.startsWith("data:application/json;base64,")) {
          // Decode Base64 metadata
          const base64Data = tokenURI.split(",")[1];
          const jsonString = atob(base64Data);
          metadata = JSON.parse(jsonString) as Metadata;
        } else if (tokenURI.startsWith("http")) {
          // Fetch metadata from URL
          const response = await fetch(tokenURI);
          metadata = (await response.json()) as Metadata;
        }

        userPositions.push({
          tokenId: tokenId.toString(),
          name: metadata.name || `Position #${tokenId}`,
          liquidity: metadata.liquidity || "N/A",
          feeTier: metadata.feeTier || "N/A",
          imageUrl: metadata.image || null
        });
        console.log("name",metadata.name)
      }

      setPositions(userPositions);
    } catch (error) {
      console.error("Error fetching positions:", error);
      alert("Error fetching positions. Check the wallet address or RPC provider.");
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Uniswap V3 Positions</h1>
      
      <input
        type="text"
        placeholder="Enter Wallet Address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={fetchPositions} disabled={loading} style={{ padding: "10px" }}>
        {loading ? "Loading..." : "Fetch Positions"}
      </button>

      {positions.length > 0 && (
        <div>
          <h2>User Positions</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px',
            padding: '20px'
          }}>
            {positions.map((position, index) => (
              <div key={index} style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '15px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div style={{
                  width: '100%',
                  height: '200px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  {position.imageUrl ? (
                    <img 
                      src={position.imageUrl} 
                      alt={position.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#666'
                    }}>
                      No Image Available
                    </div>
                  )}
                </div>
                <h3 style={{ margin: '5px 0' }}>{position.name}</h3>
                <div style={{ fontSize: '0.9em', color: '#666' }}>
                  <p>Token ID: {position.tokenId}</p>
                  <p>Liquidity: {position.liquidity}</p>
                  <p>Fee Tier: {position.feeTier}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Positions;

