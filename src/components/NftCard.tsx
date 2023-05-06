import Image from 'next/image';
import { NFT } from '../types/mintbase';

type NftCardProps = {
  nft: NFT;
};

const NftCard = ({ nft }: NftCardProps) => {
  return (
    <>
      <div className="h-full overflow-hidden bg-white rounded-lg shadow-md">
        <div className="relative flex items-center justify-center overflow-hidden aspect-square ">
          <Image
            src={nft.media}
            alt={nft.title}
            className="transition-transform duration-300 ease-in-out cover hover:scale-125"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <div className="px-2 pt-4 pb-2">
          <p className="flex justify-between text-base">
            {nft.title} <code className="text-gray-500">#{nft.token_id}</code>
          </p>
          <p className="font-semibold text-right">$1</p>
        </div>
      </div>
    </>
  );
};

export default NftCard;
