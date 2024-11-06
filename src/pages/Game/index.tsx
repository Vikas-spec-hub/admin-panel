import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { CopyIcon, Play, Trash2 } from 'lucide-react';
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

import AddButton from '@/components/AddButton';
import FilterButton from '@/components/FilterButton';
import { CustomTable } from '@/components/customTable';
import { useFirestore } from '@/hooks/useFireStore';
import PageLayout from '@/layouts/PageLayout';
import { formatDateWithISOString } from '@/lib/utils';

interface IGameColumnProps {
  id: string;
  title: string;
  type: string;
  image: string;
  game_link: string;
}

/**
 * Game Page
 * @returns {JSX.Element}
 */
export default function Game(): JSX.Element {
  const [data, setData] = useState<IGameColumnProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [lastVisibleSnapshots, setLastVisibleSnapshots] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]); // Track lastVisible for each page
  const limitPerPage = 5;
  const { getDocuments } = useFirestore();
  const [totalCount, setTotalCount] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const columns: ColumnDef<IGameColumnProps>[] = [
    {
      accessorKey: 'title',
      header: () => (
        <div className="flex">
          <p>Title</p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <div className="ml-2">{row.getValue('title')}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'game_link',
      header: 'Game Link',
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="text-gray-500 max-w-[200px] overflow-hidden">
              {row.getValue('game_link')}
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
        return <div>{formatDateWithISOString(row.getValue('createdAt'))}</div>;
      },
    },

    {
      id: 'actions',
      header: 'Actions',
      enableHiding: false,
      cell: () => {
        return (
          <div className="flex">
            <Play className="size-4 mr-2" />
            <Trash2 className="size-4 mr-2" />
          </div>
        );
      },
    },
  ];

  /**
   * fetch Data
   * @param {number} pageNumber
   */
  const fetchData = async (pageNumber: number) => {
    setLoading(true);

    const { documents, lastVisible, totalCount } =
      await getDocuments<IGameColumnProps>(
        'games', // Collection name
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

  const table = useReactTable<IGameColumnProps>({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <PageLayout
      title={'Games'}
      element={
        <div className="flex">
          <AddButton title="Add Game" onClick={() => {}} />
          <FilterButton
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
      }
    >
      <div>
        <CustomTable<IGameColumnProps>
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
