import DATA from '../../../data/nfts.json';

const handler = (req, res) => {
  const nft = DATA.find((n) => n.id == req.query.id);
  res.statusCode = 200;

  res.json(nft);
};

export default handler;
