import { useQuery } from '@tanstack/react-query';
import { fetchNfts } from '../lib/mintbase';

export const useNft = (tokenId: string) => {
  return useQuery(['nfts'], () => fetchNfts(), {
    retry: false,
    refetchOnWindowFocus: false,
    select: (data) => {
      const nft = data.find((nft) => nft.token_id === tokenId);

      if (!nft) {
        throw new Error(`No NFT found with tokenId ${tokenId}`);
      }

      return nft;
    },
  });
};
