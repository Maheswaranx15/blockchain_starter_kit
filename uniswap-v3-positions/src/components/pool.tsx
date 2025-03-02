import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SearchBox } from "@components/search-box/search-box";
import { Button } from "antd";
import { HaiWave } from "@assets/index";
import { AddLiquidityModalHome } from "@pages/pool/components/add-liquidity-home/add-liquidity-home-page";
import { usePoolData } from "../../graphql/hooks/usePoolData"; // Import custom hook
import { PoolDetailsPage } from "./components/pool-detail-page/pool-detail-page";
import "./pool.css";

interface DisplayPool {
  id: string;
  token0: {
    symbol: string;
  };
  token1: {
    symbol: string;
  };
  status: string;
}

const Pool = () => {
  const { t } = useTranslation("common");
  const [openAddLiquidityHomePage, setOpenAddLiquidityHomePage] = useState(false);
  const { pools } = usePoolData(); // Fetch pool data
  const [displayPools, setDisplayPools] = useState<DisplayPool[]>([]);
  const [openPoolDetailsPage, setOpenPoolDetailsPage] = useState(false);
  const [selectedPool, setSelectedPool] = useState<DisplayPool | null>(null);

  useEffect(() => {
    if (pools?.length > 0) {
      setDisplayPools(
        pools.map((pool:any) => ({
          ...pool,
          status: pool?.status || (Math.random() > 0.5 ? "In Range" : "Out of Range"), 
         }))
      );
    }
  }, [pools]); 
  const handlePoolClick = (pool: DisplayPool) => {
    setSelectedPool(pool);  // Set the selected pool
    setOpenPoolDetailsPage(true); // Open the pool details modal
  };

  return (
    <>
      {!openPoolDetailsPage ? (
        <div className="d-flex align-center justify-center m-t-24">
          <div className="w-800">
            <div className="d-flex align-center justify-space-between">
              <h2 className="f-24-30-600-p">Pools</h2>
              <div className="d-flex align-center">
                <SearchBox
                  placeHolder={t("searchBar.placeHolder.searchPool")}
                  className="h-44 w-266"
                />
                <Button
                  type="primary"
                  className="p-x-16 p-y-12 f-16-20-600-b-f-p bg-btn-filled-default radius-10 m-l-12 main-button"
                  onClick={() => setOpenAddLiquidityHomePage(true)}
                >
                  {t("pool.newPosition")}
                </Button>
              </div>
            </div>

            {displayPools.length > 0 ? (
              <div className="m-t-24">
                {/* Table Header */}
                <div className="d-flex justify-space-between p-y-12 p-x-16 bg-gray-100 radius-t-12">
                  <span className="f-14-20-600-p">Tokens</span>
                  <span className="f-14-20-600-p">Status</span>
                </div>

                {/* Table Content */}
                {displayPools.map((pool) => (
                  <div
                    key={pool.id}
                    className="d-flex justify-space-between p-y-16 p-x-16 border-b cursor-pointer"
                    onClick={() => handlePoolClick(pool)}
                  >
                    {/* Token Name */}
                    <div className="d-flex align-center">
                      <span className="f-16-20-600-p">
                        {pool?.token0?.symbol}/{pool?.token1?.symbol}
                      </span>
                    </div>

                    {/* Dynamic Status Badge */}
                    <div className={`status-badge ${pool.status === "In Range" ? "status-in-range" : "status-out-of-range"}`}>
                      {pool.status}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="m-t-24 border-primary-1 radius-12 d-flex justify-center">
                <div className="p-y-40 d-flex flex-column align-center justify-center max-w-250 text-center">
                  <img src={HaiWave} alt="hai-wave" />
                  <h3 className="m-t-8 f-16-20-600-p">
                    {t("pool.firstPoolHeading")}
                  </h3>
                  <p className="m-t-8 f-14-20-400-h">
                    {t("pool.firstPoolMessage")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        selectedPool && (
          <PoolDetailsPage
            pool={selectedPool}
            handleClose={() => setOpenPoolDetailsPage(false)}
          />
        )
      )}

      {openAddLiquidityHomePage && (
        <AddLiquidityModalHome handleClose={() => setOpenAddLiquidityHomePage(false)} />
      )}
    </>
  );
};

export const Component = Pool;


///detail

import { Button } from "antd";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./pool-detail-page.css";

interface PoolDetailsPageProps {
  pool: {
    id: string;
    token0: {
      symbol: string;
    };
    token1: {
      symbol: string;
    };
    status: string;
  };
  handleClose: () => void;
}

interface NFTMetadata {
  name?: string;
  description?: string;
  image?: string;
  liquidity?: string;
  feeTier?: string;
}

export const PoolDetailsPage = ({ pool, handleClose }: PoolDetailsPageProps) => {
  const [nftImage, setNftImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);

  // Pool data (you'll need to fetch these values from your pool data)
  const poolData = {
    fee: "0.3%",
    tickLower: "#87220",
    tickUpper: "#87220",
    token0Amount: "0.953",
    token1Amount: "10.50",
    uncollectedFees: {
      token0: "0",
      token1: "0.001"
    },
    currentPrice: "11.0218",
    tokenId: pool.id
  };

  const fetchNFTMetadata = async () => {
    try {
      const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/ZmPsiv5sxYgS0eCXGwon8UJYek3zAQpS");
      const positionManagerAddress = "0x1238536071E1c677A632429e3655c799b22cDA52";
      const positionManagerAbi = [
        "function tokenURI(uint256 tokenId) view returns (string)"
      ];

      const positionManager = new ethers.Contract(
        positionManagerAddress,
        positionManagerAbi,
        provider
      );

      const tokenURI = await positionManager.tokenURI(poolData.tokenId);
      let nftMetadata: NFTMetadata = {};

      if (tokenURI.startsWith("data:application/json;base64,")) {
        // Decode Base64 metadata
        const base64Data = tokenURI.split(",")[1];
        const jsonString = atob(base64Data);
        nftMetadata = JSON.parse(jsonString);
      } else if (tokenURI.startsWith("http")) {
        // Fetch metadata from URL
        const response = await fetch(tokenURI);
        nftMetadata = await response.json();
        console.log('nftmetadata',response)
      }

      if (nftMetadata.image) {
        setNftImage(nftMetadata.image);
      }
      setMetadata(nftMetadata);
    } catch (error) {
      console.error("Error fetching NFT metadata:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTMetadata();
  }, [pool.id]);

  return (
    <div className="pool-details-container">
      <div className="d-flex align-center m-b-24">
        <button className="back-button d-flex align-center" onClick={handleClose}>
          <span className="m-r-8">←</span> Your positions
        </button>
      </div>

      <div className="d-flex align-center m-b-24">
        <div className="token-pair-header">
          <div className="d-flex align-center">
            <span className="token-pair f-20-24-600">
              {pool.token0.symbol}/{pool.token1.symbol}
            </span>
            <span className="fee-badge m-l-8">{poolData.fee}</span>
          </div>
          <div className="status-indicator">
            <span className={`status-dot ${pool.status === "In Range" ? "in-range" : "out-range"}`}></span>
            <span className="status-text">{pool.status}</span>
          </div>
        </div>
        <div className="ml-auto">
          <Button type="primary" className="m-r-12">Add liquidity</Button>
          <Button>Remove liquidity</Button>
        </div>
      </div>

      <div className="d-flex gap-24">
        {/* Left column - NFT Card */}
        <div className="pool-nft-card">
          <div className="nft-container">
            {loading ? (
              <div className="nft-loading">Loading NFT...</div>
            ) : nftImage ? (
              <img 
                src={nftImage} 
                alt="Pool Position NFT" 
                className="nft-image"
                onError={() => setNftImage(null)} // Fallback if image fails to load
              />
            ) : (
              <div className={`nft-background ${pool.status === "In Range" ? "in-range" : "out-range"}`}>
                <div className="nft-content">
                  <div className="pair-text">{pool.token0.symbol}/{pool.token1.symbol}</div>
                  <div className="fee-text">{metadata?.feeTier || poolData.fee}</div>
                  <div className="tick-range">
                    <div>Min Tick: {poolData.tickLower}</div>
                    <div>Max Tick: {poolData.tickUpper}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column - unchanged */}
        <div className="pool-details-info">
          <div className="info-card">
            <h3>Liquidity</h3>
            <div className="token-amounts">
              <div className="d-flex justify-space-between m-b-8">
                <span>{pool.token0.symbol}</span>
                <span>{poolData.token0Amount}</span>
              </div>
              <div className="d-flex justify-space-between">
                <span>{pool.token1.symbol}</span>
                <span>{poolData.token1Amount}</span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>Uncollected fees</h3>
            <div className="token-amounts">
              <div className="d-flex justify-space-between m-b-8">
                <span>{pool.token0.symbol}</span>
                <span>{poolData.uncollectedFees.token0}</span>
              </div>
              <div className="d-flex justify-space-between">
                <span>{pool.token1.symbol}</span>
                <span>{poolData.uncollectedFees.token1}</span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>Price range</h3>
            <div className="price-chart">
              <div className="current-price">
                <div>Current price</div>
                <div className="price-value">{poolData.currentPrice}</div>
                <div className="price-denomination">{pool.token1.symbol} per {pool.token0.symbol}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};