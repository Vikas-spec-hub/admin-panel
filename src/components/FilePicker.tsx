import { HardDriveUploadIcon } from 'lucide-react';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { SOMETHING_WENT_WRONG } from '@/constants/snackbarMessage';
import { useFirebaseStorage } from '@/hooks/useFirebaseStorage';

interface IFilePicker extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileChange: (url: string) => void;
  path: string;
  errorMessage?: string;
  existingImageUrl?: string;
}

/**
 * Custom File picker with preview and also it upload image on firebase storage
 * so if you add image it will upload in firebase storage and provide a image url
 * @param {IFilePicker}
 * @returns
 */
const FilePicker = ({
  onFileChange,
  errorMessage,
  path,
  existingImageUrl,
  ...inputProps
}: IFilePicker) => {
  const { uploadMedia } = useFirebaseStorage();
  const { enqueueSnackbar } = useSnackbar();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImages, setPreviewImages] = useState(
    existingImageUrl ? [existingImageUrl] : [],
  );
  const { setValue, trigger } = useFormContext();

  // Initialize form field with existing image URL on component load
  useEffect(() => {
    if (existingImageUrl) {
      setValue('image', existingImageUrl);
      trigger('image');
    }
  }, [existingImageUrl, setValue, trigger]);

  /**
   * Handle Change run when we add image in filepicker
   * @param  {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      const filesArray = Array.from(event.target.files);
      const imagePreviews = filesArray?.map((file) =>
        URL.createObjectURL(file),
      );
      setPreviewImages(imagePreviews);

      if (onFileChange) {
        try {
          const res = await uploadMedia(
            event?.target?.files?.[0],
            `/${path}/${event?.target?.files?.[0]?.name}`,
          );
          if (res) {
            onFileChange(res);
          }
        } catch (error) {
          console.error(
            'error: occured in file picker ',
            JSON.stringify(error),
          );
          enqueueSnackbar(SOMETHING_WENT_WRONG, { variant: 'error' });
        }
      }
    }
  };

  /**
   * On Drag over in file
   * @param {React.DragEvent<HTMLDivElement>} event
   */
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  /**
   * handle Drop
   * @param {React.DragEvent<HTMLDivElement>}event
   */
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      // Directly call handleChange with the files
      const files = event.dataTransfer.files;
      const newEvent = {
        target: { files }, // Creating a mock event
      } as React.ChangeEvent<HTMLInputElement>;

      handleChange(newEvent);
    }
  };

  return (
    <>
      <div>
        <div
          className={`w-full relative h-28 border border-dashed ${errorMessage?.length ? 'border-red-600 ' : 'border-gray-300 '} mt-4 cursor-pointer`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()} // Triggers the hidden input using ref
        >
          <input
            type="file"
            ref={fileInputRef}
            {...inputProps}
            className="hidden"
            onChange={handleChange}
            accept="image/*" // Accepts only image files
          />
          {!previewImages.length && (
            <div className="w-full h-full flex flex-col items-center justify-center absolute top-0 left-0">
              <HardDriveUploadIcon className="text-[#777] h-10 w-10" />
              <p className="text-center text-textGray">
                Drag and drop or click to upload
              </p>
            </div>
          )}
          {/* Preview Section */}
          <div className="mt-4 w-full absolute">
            {previewImages?.map((imageSrc: string, index: number) => (
              <div key={index} className="relative">
                <img
                  src={imageSrc}
                  alt={`Preview ${index + 1}`}
                  className="object-cover h-20 w-full rounded-md"
                />
                <button
                  className="absolute top-0 right-1 py-1 px-4 text-red-500"
                  onClick={(event) => {
                    event.stopPropagation();
                    const newImages = [...previewImages];
                    newImages.splice(index, 1); // Remove the clicked image
                    setPreviewImages(newImages);
                    onFileChange('');
                  }}
                >
                  &times; {/* Close icon */}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default FilePicker;
