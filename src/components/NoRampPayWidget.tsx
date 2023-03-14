import { useEffect, useState } from 'react';
import { NORAMP_URL, NORAMP_APP_ID } from '../config/config';
import Celebrate from './Celebrate';

const NoRampPayWidget = ({ price }) => {
  const [success, setSuccess] = useState(false);

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

  if (!price) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center">
      <iframe
        src={`${NORAMP_URL}/embed/payments/${NORAMP_APP_ID}?device=desktop&theme=dark&price_id=${price.id}&auth=true`}
        height="280"
        width="450"
        allow="clipboard-write"
      />
      {success && <Celebrate />}
    </div>
  );
};

export default NoRampPayWidget;
