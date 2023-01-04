import type { NextPage } from "next";
import {
  useActiveListings,
  useContract,
  useAddress,
} from "@thirdweb-dev/react";
import NFTCard from "../components/NFTCard";
import Link from "next/link";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(
    "0x4cD6B34B855B165E87005781C347C1FCe64c1847",
    "marketplace"
  );

  const { data: nfts, isLoading } = useActiveListings(contract);

  if (isLoading)
    return (
      <div className={"mb-3 flex w-screen justify-center"}>Loading ...</div>
    );

  return (
    <div className="space-y-4 p-2">
      <div className="text-2xl font-semibold">Active Listings</div>
      <Link href={`profile/${address}`}>
        <div className={"cursor-pointer text-2xl font-semibold"}>
          My Collections
        </div>
      </Link>

      <div className="nft-grid">
        {nfts &&
          nfts.map((nft) => {
            return (
              <Link
                href={`/assets/${nft.id}`}
                key={nft.assetContractAddress + nft.id}
              >
                <a>
                  <NFTCard
                    nft={{
                      name: nft.asset.name as string,
                      tokenUri: nft.asset.image as string,
                      price: nft.buyoutCurrencyValuePerToken?.displayValue,
                    }}
                  />
                </a>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
