import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { EyeIcon, Pencil, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useSnackbar } from 'notistack';

import AddButton from '@/components/AddButton';
import FilterButton from '@/components/FilterButton';
import { CustomTable } from '@/components/customTable';
import Modal from '@/components/modal';
import { useFirestore } from '@/hooks/useFireStore';
import PageLayout from '@/layouts/PageLayout';

import { useModal } from '@/hooks/useModal';
import {
  ADD_EDIT_EVENT,
  DELETE_EVENT_CONFIRMATION_MODEL,
  EVENT_PREVIEW,
} from '@/constants/modelId';
import DeleteConfirmationModel from '@/components/DeleteConfirmationModel';
import { DELETED_SUCCESSFULLY } from '@/constants/snackbarMessage';

import AddEvent from './components/AddEvent';
import EventPreview from './components/EventPreview';
import { formatDateWithTimestamp } from '@/lib/utils';

export interface IEventColumnProps {
  id: string;
  name: string;
  cost: string;
  date: Timestamp;
  image: string;
  location: string;
  more_info_link: string;
}

/**
 * Event Page
 * @returns {JSX.Element}
 */
export default function Event(): JSX.Element {
  // React states
  const [data, setEventData] = useState<IEventColumnProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [deleteId, setDeleteId] = useState<string>('');
  const [previewId, setPreviewId] = useState<string>('');
  const [totalCount, setTotalCount] = useState(0);
  const [lastVisibleSnapshots, setLastVisibleSnapshots] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]); // Track lastVisible for each page

  // Hooks
  const { getDocuments, deleteDocument } = useFirestore();
  const { openModal, setData, setIsEdit, isEdit, modalId, closeModal } =
    useModal();
  const { enqueueSnackbar } = useSnackbar();
  const limitPerPage = 5;

  const handlEdit = useCallback((data: IEventColumnProps) => {
    setIsEdit(true);
    setData(data);
    openModal(ADD_EDIT_EVENT);
  }, []);

  /**
   * on click of save button in confirmation model
   * @param {string} id
   */
  const handleDelete = useCallback((id: string) => {
    deleteDocument('events', id);
    enqueueSnackbar(DELETED_SUCCESSFULLY, { variant: 'success' });
    closeModal();
  }, []);

  /**
   * Open the event preview
   * @param {string} id
   */
  const handlePreview = (id: string) => {
    openModal(EVENT_PREVIEW);
    setPreviewId(id);
  };

  // coloumn data for the table
  const columns: ColumnDef<IEventColumnProps>[] = [
    {
      accessorKey: 'name',
      header: () => <p className="text-sm font-semibold">Name</p>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <div className="ml-2  text-ellipsis max-w-[200px]  overflow-hidden">
              {row.getValue('name')}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'location',
      header: () => <p className="text-sm font-semibold">Location</p>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="max-w-[200px] text-ellipsis overflow-hidden">
              {row.getValue('location')}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'date',
      header: () => <p className="text-sm font-semibold">Event Date</p>,
      cell: ({ row }) => {
        return <div>{formatDateWithTimestamp(row.getValue('date'))}</div>;
      },
    },
    {
      accessorKey: 'cost',
      header: () => <p className="text-sm font-semibold">Cost</p>,
      cell: ({ row }) => {
        return <div>${row.getValue('cost')}</div>;
      },
    },
    {
      id: 'actions',
      header: () => <p className="text-sm font-semibold">Actions</p>,
      enableHiding: false,
      cell: ({ row }) => {
        const userData = row.original;

        return (
          <div className="flex">
            <EyeIcon
              onClick={() => handlePreview(userData?.id)}
              className="cursor-pointer size-4 mr-2"
            />
            <Pencil
              onClick={() => handlEdit(userData)}
              className="cursor-pointer size-4 mr-2"
            />
            <Trash2
              onClick={() => {
                openModal(DELETE_EVENT_CONFIRMATION_MODEL);
                setDeleteId(userData?.id);
              }}
              className="cursor-pointer size-4 mr-2"
            />
          </div>
        );
      },
    },
  ];

  /**
   * Fetch Data for the page
   * @param {number} pageNumber
   */
  const fetchData = async (pageNumber: number) => {
    setLoading(true);

    const { documents, lastVisible, totalCount } =
      await getDocuments<IEventColumnProps>(
        'events', // Collection name
        pageNumber, // Current page number
        limitPerPage, // Limit per page
        lastVisibleSnapshots, // Snapshot tracker
        'name', // Field to order by
      );

    if (lastVisible) {
      setLastVisibleSnapshots((prev) => {
        const updatedSnapshots = [...prev];
        updatedSnapshots[pageNumber - 1] = lastVisible;
        return updatedSnapshots;
      });
    }

    setEventData(documents);
    setTotalCount(totalCount);
    setLoading(false);
  };

  // Run when page load
  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Run when page load
  useEffect(() => {
    if (modalId == '') {
      fetchData(page);
    }
  }, [modalId]);

  /**
   * To the next page of table
   */
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number
  };

  /**
   * To the previous page of table
   */
  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1); // Decrement page number
  };

  const table = useReactTable<IEventColumnProps>({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <PageLayout
      title={'Events'}
      element={
        <div className="flex">
          <AddButton
            title="Add Event"
            onClick={() => openModal(ADD_EDIT_EVENT)}
          />
          <FilterButton
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
      }
    >
      <CustomTable<IEventColumnProps>
        hasData={Boolean(data.length)}
        table={table}
        isLoading={loading}
        currentPage={page}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        totalCount={totalCount}
        limit={limitPerPage}
      />
      <Modal title={isEdit ? 'Edit Event' : 'Add Event'}>
        {modalId === ADD_EDIT_EVENT && <AddEvent />}
      </Modal>

      {modalId === DELETE_EVENT_CONFIRMATION_MODEL && (
        <DeleteConfirmationModel
          model_id={DELETE_EVENT_CONFIRMATION_MODEL}
          handleDelete={() => handleDelete(deleteId)}
        />
      )}
      {modalId === EVENT_PREVIEW && (
        <EventPreview
          model_id={EVENT_PREVIEW}
          data={data.find((value: IEventColumnProps) => value.id === previewId)}
        />
      )}
    </PageLayout>
  );
}
