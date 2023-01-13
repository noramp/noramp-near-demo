import Image from 'next/image';

const NftCard = ({ nft }) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow-md h-full overflow-hidden">
        <div className="overflow-hidden flex items-center justify-center relative aspect-square  ">
          <Image
            src={nft.image_url}
            alt={nft.name}
            className="cover transition-transform ease-in-out duration-300 hover:scale-125"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <div className="px-2 pt-4 pb-2">
          <p className="text-base">{nft.name}</p>
          <p className="text-right font-semibold">${nft.price}</p>
        </div>
      </div>
    </>
  );
};

export default NftCard;
