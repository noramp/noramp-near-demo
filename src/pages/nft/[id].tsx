import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Celebrate from '../../components/Celebrate';
import NoRampButton from '../../components/NoRampButton/NoRampButton';
import { NORAMP_APP_ID, NORAMP_URL } from '../../config/config';
import { useNft } from '../../hooks/useNft';
import { createPriceForNft } from '../../lib/api';
import NftCard from '../../components/NftCard';
import LoadingOverlay from '../../components/LoadingOverlay';

const NftPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isWorking, setIsWorking] = useState(false);

  const {
    data: nft,
    isLoading,
    error: queryError,
  } = useNft(router.query.id as string);

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
      setIsWorking(true);

      const newPrice = await createPriceForNft(nft.token_id);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.initializeNoRamp({
        appId: NORAMP_APP_ID,
        priceId: newPrice.id,
        testnet: true,
        auth: true,

        onSuccess: async (data) => {
          console.log('success', data);
          // setSuccess(true);
          setIsWorking(false);
        },
        onFailure: (err) => {
          console.error(err);
          if (err?.message) {
            alert(err?.message);
          }
        },
        onClose: (data) => {
          console.log('closed', data);
          setIsWorking(false);
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
      setIsWorking(false);
    }
  }, [nft?.token_id]);

  const renderContent = () => {
    if (queryError) {
      return (
        <div
          className="flex flex-col gap-2 p-4 mt-20 text-sm text-red-700 bg-red-100 border-red-500 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <div className="flex items-center">
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <span>{queryError.message}</span>
          </div>
        </div>
      );
    }
    return <NoRampButton onClick={handleBuy} loading={isWorking} />;
  };

  if (isLoading) return <LoadingOverlay />;

  return (
    <div className="container flex flex-col items-center justify-center gap-8 px-4 mx-auto md:flex-row">
      {nft && (
        <div className="flex-1 w-11/12 max-w-xs md:max-w-md">
          <NftCard nft={nft} />
        </div>
      )}

      <div className="flex flex-col items-center justify-center flex-1 gap-10">
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
