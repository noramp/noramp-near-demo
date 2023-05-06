import axios from 'axios';
import { NFT } from '../types/mintbase';

export const fetchNfts = async () => {
  const data = JSON.stringify({
    filters: {},
    limit: 56,
    offset: 0,
    listedOnly: true,
    orderBy: 'price asc',
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://surface-api-testnet-z3w7d7dnea-ew.a.run.app/stores/noramp.mintspace2.testnet/filter',
    headers: {
      'content-type': 'application/json',
      'mb-api-key': 'omni-site',
    },
    data: data,
  };

  const DATA: NFT[] = await axios
    .request(config)
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => {
      console.log(error);
    });
  return DATA;
};
