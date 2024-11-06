import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import AddButton from '@/components/AddButton';
import { CustomTable } from '@/components/customTable';
import Image from '@/components/ui/image';
import { useFirestore } from '@/hooks/useFireStore';
import PageLayout from '@/layouts/PageLayout';
import { formatDateWithISOString } from '@/lib/utils';

interface IUserColumnProps {
  id: string;
  email: string;
  username: string;
  profilePicture: string;
  createdAt: string; // You can also use Date if you want to handle it as a Date object
}

/**
 * User Page
 * @returns {JSX.Element}
 */
export default function User(): JSX.Element {
  // React states
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [lastVisibleSnapshots, setLastVisibleSnapshots] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]); // Track lastVisible for each page
  const [totalCount, setTotalCount] = useState(0);

  const { getDocuments } = useFirestore();
  const limitPerPage = 5;

  const columns: ColumnDef<IUserColumnProps>[] = [
    {
      accessorKey: 'username',
      header: () => (
        <div className="flex">
          <p>User</p>
        </div>
      ),
      cell: ({ row }) => {
        const userData = row.original;
        return (
          <div className="flex items-center">
            <Image
              className="w-6 h-6 rounded-full"
              src={userData.profilePicture}
              alt={''}
            />
            <div className="ml-2">{userData.username}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => {
        return (
          <div>
            <span>{row.getValue('email')}</span>
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
            <Pencil className="size-4 mr-2" />
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

    const { documents, lastVisible, totalCount } = await getDocuments<any>(
      'users', // Collection name
      pageNumber, // Current page number
      limitPerPage, // Limit per page
      lastVisibleSnapshots, // Snapshot tracker
      'createdAt', // Field to order by
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

  const table = useReactTable<IUserColumnProps>({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <PageLayout
      title={'Users'}
      element={
        <div>
          <AddButton title="Add User" onClick={() => {}} />
        </div>
      }
    >
      <div>
        <CustomTable<IUserColumnProps>
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
