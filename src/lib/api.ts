import axios from 'axios';

export const createPriceForNft = async (nftId: string) => {
  const response = await axios.get(`/api/prices/${nftId}`, {
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
  });

  return response.data;
};
