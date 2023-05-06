import { useQuery } from '@tanstack/react-query';
import { fetchNfts } from '../lib/mintbase';

export const useNfts = () => {
  return useQuery(['nfts'], () => fetchNfts(), {
    retry: false,
    refetchOnWindowFocus: false,
  });
};
