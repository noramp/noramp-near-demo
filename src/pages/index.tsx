import { GetServerSideProps } from 'next';
import Link from 'next/link';
import NftCard from '../components/NftCard';
import { fetchNfts } from '../lib/api';

const Home = ({ nfts }) => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {nfts.map((nft) => (
          <Link href={`/nft/${nft.id}`} key={nft.id}>
            <NftCard nft={nft} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const nfts = await fetchNfts();

  return {
    props: {
      nfts,
    },
  };
};
