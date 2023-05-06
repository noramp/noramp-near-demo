import axios from 'axios';
import { NORAMP_APP_ID, NORAMP_TRIGGER_ID } from '../../../config/config';

export const createPrice = async (appId: string, createPriceDto) => {
  return axios
    .post(`/prices/${appId}`, createPriceDto, {
      baseURL: process.env.NORAMP_API_URL,
      headers: {
        Authorization: `Bearer ${process.env.NORAMP_API_KEY}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response?.data?.message);
      throw error.response?.data?.message;
      // throw Object.keys(error.response);
    });
};

const handler = async (req, res) => {
  const nftId = req.query.id;

  const newPrice = await createPrice(NORAMP_APP_ID, {
    amount: 1,
    trigger_id: NORAMP_TRIGGER_ID,
    trigger_data: {
      params_data: {
        token_id: String(nftId),
        receiver_id: 'elijosedev.testnet',
      },
    },
  });

  res.statusCode = 200;

  res.json(newPrice.data);
};

export default handler;
