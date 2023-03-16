import { GetServerSideProps } from 'next';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Celebrate from '../../components/Celebrate';
import NftCard from '../../components/NftCard';
import NoRampButton from '../../components/NoRampButton/NoRampButton';
import { NORAMP_APP_ID, NORAMP_URL } from '../../config/config';
import { createPriceForNft, fetchNft } from '../../lib/api';

const NftPage = ({ nft }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.origin !== NORAMP_URL) {
        return;
      }

      if (event.data.event === 'noramp:onPayment') {
        console.log('Payment event', event.data);

        const type = event.data?.detail?.type;
        const status = event.data?.detail?.data?.status;

        if (type === 'finished' && status === 'paid') {
          setSuccess(true);
        }
      }
    });
  }, []);

  const handleBuy = useCallback(async () => {
    try {
      setIsLoading(true);

      const newPrice = await createPriceForNft(nft.id);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.initializeNoRamp({
        appId: NORAMP_APP_ID,
        priceId: newPrice.id,
        testnet: true,

        onSuccess: async (data) => {
          console.log('success', data);
          // setSuccess(true);
          setIsLoading(false);
        },
        onFailure: (err) => {
          console.error(err);
          if (err?.message) {
            alert(err?.message);
          }
        },
        onClose: (data) => {
          console.log('closed', data);
          setIsLoading(false);
        },
        onEvent: console.log,
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.NoRamp.open();
    } catch (e) {
      console.error(e);
      toast.error('Error creating price');
      setError('Error creating price');
    }
  }, [nft.id]);

  const renderContent = () => {
    return <NoRampButton onClick={handleBuy} loading={isLoading} />;
  };

  return (
    <div className="container flex flex-col items-center justify-center gap-8 px-4 mx-auto md:flex-row">
      <div className="flex-1 w-11/12 max-w-xs md:max-w-md">
        <NftCard nft={nft} />
      </div>

      <div className="flex items-center justify-center flex-1">
        {error && (
          <div
            className="flex flex-col gap-2 p-4 text-sm text-red-700 bg-red-100 border-red-500 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            <div className="flex items-center">
              <span>{error}</span>
            </div>
          </div>
        )}

        {renderContent()}
      </div>

      {success && <Celebrate />}
    </div>
  );
};

export default NftPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string;
  const nft = await fetchNft(id);

  return {
    props: {
      nft,
    },
  };
};
