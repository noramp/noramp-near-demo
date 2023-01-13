import axios from 'axios';

export const fetchNfts = async () => {
  const response = await axios.get('/api/nfts', {
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
  });
  return response.data;
};

export const fetchNft = async (id: string) => {
  const response = await axios.get(`/api/nfts/${id}`, {
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
  });
  return response.data;
};

export const createPriceForNft = async (nftId: string) => {
  const response = await axios.get(`/api/prices/${nftId}`, {
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
  });

  return response.data;
};
