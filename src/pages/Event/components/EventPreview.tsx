import React, { useState } from 'react';

import Modal from '@/components/modal';
import { useModal } from '@/hooks/useModal';
import { formatFirestoreTimestampForPreview } from '@/lib/utils';

import { IEventColumnProps } from '..';
import { Skeleton } from '@/components/ui/skeleton';
import BrokenImage from '@/assets/images/broken-image.png';

interface IEventPreviewProps {
  model_id: string;
  data: IEventColumnProps | undefined;
}

/**
 * Event Preview
 * @param {IEventPreviewProps}
 * @returns
 */
export const EventPreview = ({ model_id, data }: IEventPreviewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { modalId } = useModal();
  const [hasError, setHasError] = useState(false);

  return (
    <>
      <Modal title={'Event Preview'}>
        {modalId === model_id && (
          <div>
            <div className="w-full mb-4 p-4">
              {isLoading && <Skeleton className="h-52 py-2" />}
              <img
                className={`w-full h-[200px] object-cover ${isLoading ? 'hidden' : 'block'}`}
                width={400}
                alt="Preview Image"
                height={200}
                src={hasError ? BrokenImage : data?.image}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setHasError(true);
                }}
              />
            </div>
            <div className="mb-4">
              <p>
                {data?.date && formatFirestoreTimestampForPreview(data?.date)}
              </p>
              <p className="break-words">{data?.location}</p>
            </div>
            <div>
              <p>{data?.name}</p>
              <p>Cost: ${data?.cost}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
export default EventPreview;
