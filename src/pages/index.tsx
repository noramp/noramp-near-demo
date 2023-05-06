import Link from 'next/link';
import LoadingOverlay from '../components/LoadingOverlay';
import NftCard from '../components/NftCard';
import { useNfts } from '../hooks/useNfts';

const Home = () => {
  const { data: nfts, isLoading } = useNfts();

  if (isLoading) return <LoadingOverlay />;

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {nfts.map((nft) => (
          <Link href={`/nft/${nft.token_id}`} key={nft.token_id}>
            <NftCard nft={nft} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
