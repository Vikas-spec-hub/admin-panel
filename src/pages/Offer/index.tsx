import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { CopyIcon, EyeIcon, Pencil, Trash2 } from 'lucide-react';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

import AddButton from '@/components/AddButton';
import FilterButton from '@/components/FilterButton';
import { CustomTable } from '@/components/customTable';
import { useFirestore } from '@/hooks/useFireStore';
import PageLayout from '@/layouts/PageLayout';
import { formatDateWithISOString } from '@/lib/utils';

interface IOfferColumnProps {
  id: string;
  title: string;
  shopUrl: string;
  altText: string;
  isRedeemed: boolean;
  isSuccessfullyRedeemed: boolean;
  isRedeemedWithStoreCode: boolean;
  offerImage: string;
}

/**
 * Offer Page
 * @returns {JSX.Element}
 */
export default function Offer(): JSX.Element {
  //React states
  const [data, setData] = useState<IOfferColumnProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [lastVisibleSnapshots, setLastVisibleSnapshots] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]); // Track lastVisible for each page
  const { getDocuments } = useFirestore();
  const [totalCount, setTotalCount] = useState(0);

  const { enqueueSnackbar } = useSnackbar();
  const limitPerPage = 5;

  const columns: ColumnDef<IOfferColumnProps>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <div className="ml-2">{row.getValue('title')}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'shopUrl',
      header: 'Shop Url',
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className=" max-w-[200px] overflow-hidden">
              {row.getValue('shopUrl')}
            </span>
            <div className="ml-2 cursor-pointer">
              <CopyIcon
                className="size-4"
                onClick={() => {
                  navigator.clipboard.writeText(row.getValue('game_link'));
                  enqueueSnackbar('Copied Successfully', {
                    variant: 'success',
                  });
                }}
              />
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: () => <div>Created at</div>,
      cell: ({ row }) => {
        return (
          <div>
            {row.getValue('createdAt')
              ? formatDateWithISOString(row.getValue('createdAt'))
              : '-:-'}
          </div>
        );
      },
    },

    {
      id: 'actions',
      header: 'Actions',
      enableHiding: false,
      cell: () => {
        return (
          <div className="flex">
            <EyeIcon className="size-4 mr-2" />
            <Pencil className="size-4 mr-2" />
            <Trash2 className="size-4 mr-2" />
          </div>
        );
      },
    },
  ];

  /**
   * Fetch data
   * @param {number} pageNumber
   */
  const fetchData = async (pageNumber: number) => {
    setLoading(true);

    const { documents, lastVisible, totalCount } =
      await getDocuments<IOfferColumnProps>(
        'offers', // Collection name
        pageNumber, // Current page number
        limitPerPage, // Limit per page
        lastVisibleSnapshots, // Snapshot tracker
        'title', // Field to order by
      );

    if (lastVisible) {
      setLastVisibleSnapshots((prev) => {
        const updatedSnapshots = [...prev];
        updatedSnapshots[pageNumber - 1] = lastVisible;
        return updatedSnapshots;
      });
    }

    setData(documents);
    setTotalCount(totalCount);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  /**
   * to go the next page of table
   */
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number
  };

  /**
   * to go the previous page of table
   */
  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1); // Decrement page number
  };

  const table = useReactTable<IOfferColumnProps>({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <PageLayout
      title={'Offers'}
      element={
        <div className="flex">
          <AddButton title="Add Offer" onClick={() => {}} />
          <FilterButton onClick={() => {}} />
        </div>
      }
    >
      <div>
        <CustomTable<IOfferColumnProps>
          hasData={Boolean(data.length)}
          table={table}
          isLoading={loading}
          currentPage={page}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          totalCount={totalCount}
          limit={limitPerPage}
        />
      </div>
    </PageLayout>
  );
}
