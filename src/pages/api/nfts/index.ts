import DATA from '../../../data/nfts.json';

const handler = (req, res) => {
  res.statusCode = 200;

  res.json(DATA);
};

export default handler;
