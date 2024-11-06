import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useSnackbar } from 'notistack';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import InputField from '@/components/CustomInutField';
import { useModal } from '@/hooks/useModal';
import { useFirestore } from '@/hooks/useFireStore';
import {
  ADDED_SUCCESSFULLY,
  UPDATED_SUCCESSFULLY,
} from '@/constants/snackbarMessage';
import FilePicker from '@/components/FilePicker';

export interface IEventForm {
  name: string;
  website: string;
  location: string;
  date: Date;
  cost: number;
  image: string;
}

/**
 * Add Event Form
 * @returns {JSX.Element}
 */
const AddEvent = (): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<IEventForm>({
    defaultValues: {
      date: new Date(), // Set the initial date here (e.g., today’s date)
    },
  });

  const { data, closeModal, isEdit } = useModal();
  const { setDocument, updateDocument } = useFirestore();
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm();
  // Get today's date
  const today = new Date();

  /**
   * To Reset the form state
   */
  const resetForm = () => {
    setValue('name', '');
    setValue('image', '');
    setValue('website', '');
    setValue('location', '');
    setValue('date', new Date());
    setValue('cost', 0);
  };

  /**
   * Handle Save form
   * @param { SubmitHandler<IEventForm>}
   */
  const handleSave: SubmitHandler<IEventForm> = (formData: IEventForm) => {
    if (isEdit) {
      updateDocument('events', data?.id, formData);
      enqueueSnackbar(UPDATED_SUCCESSFULLY, { variant: 'success' });
    } else {
      setDocument('events', formData);
      enqueueSnackbar(ADDED_SUCCESSFULLY, { variant: 'success' });
    }

    closeModal();
    resetForm;
  };

  // In Case of edit form we will prefill data by this useeffect
  useEffect(() => {
    if (isEdit && data) {
      setValue('name', data?.name);
      setValue('image', data?.image);
      setValue('website', data?.website);
      setValue('cost', data?.cost);
      setValue('date', new Date(data.date.seconds * 1000));
      setValue('location', data?.location);
      trigger('image');
    }
  }, [data, setValue]);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSave)}>
          <div className="flex w-full justify-between">
            <InputField
              type="string"
              label="Name*"
              placeholder="Event Name"
              register={register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
                maxLength: {
                  value: 50,
                  message: 'Name not more than 50 characters',
                },
              })}
              error={errors.name}
            />
          </div>
          <div className="mt-4">
            <InputField
              type="string"
              label="Website*"
              placeholder="Eventworld.com"
              register={register('website', {
                required: 'Website is required',
                pattern: {
                  value:
                    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})[/\w .-]*\/?$/,
                  message: 'Enter a valid URL',
                },
              })}
              error={errors.website}
            />
          </div>
          <div className="mt-4">
            <InputField
              type="string"
              label="Location*"
              className="h-20"
              placeholder="Enter address here"
              register={register('location', {
                required: 'Location is required',
                maxLength: {
                  value: 100,
                  message: 'Location not more than 100 characters',
                },
              })}
              error={errors.location}
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex flex-col">
              <span className="mb-1 font-semibold">Date*</span>
              <Controller
                control={control}
                name="date"
                rules={{ required: 'Date is required' }}
                render={({ field }) => (
                  <DatePicker
                    className={`bg-gray-50 rounded-[4px] p-2.5  border-gray-300 border ${errors.date ? 'border-red-600 focus-visible:border-red-600' : 'border-gray-300'}`}
                    selected={field.value}
                    minDate={today} // Prevents past dates
                    onChange={(date) => {
                      field.onChange(date);
                      trigger('date');
                    }}
                  />
                )}
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>
            <div>
              <InputField
                type="number"
                label="Cost*"
                placeholder="$650.00"
                register={register('cost', {
                  required: 'Cost is required',
                  min: { value: 0, message: 'Cost cannot be negative' },
                })}
                error={errors.cost}
              />
            </div>
          </div>
          <FilePicker
            existingImageUrl={data?.image ?? ''}
            errorMessage={errors.image?.message}
            path="events"
            {...register('image', {
              required: 'Image is required',
              validate: {
                fileType: (files) => {
                  if (typeof files === 'string') {
                    return true;
                  }
                },
              },
            })}
            onFileChange={(url) => {
              setValue('image', url);
              trigger('image');
            }}
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={closeModal}
              className="mr-2 px-4 py-2 bg-white border border-black rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2 bg-black text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
export default AddEvent;
