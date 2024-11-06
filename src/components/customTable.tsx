import { flexRender, Table } from '@tanstack/react-table';

import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getPaginationStatus } from '@/lib/utils';

import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import Loading from './Loading';
import NoDataFound from './NoDataFound';

interface ICustomTableProps<T> {
  hasData: boolean;
  table: Table<T>;
  isLoading: boolean;
  totalCount: number;
  currentPage: number;
  limit: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

/**
 * Custom Table
 * @param { ICustomTableProps<T>}
 * @returns {JSX.Element}
 */
export const CustomTable = <T,>({
  hasData,
  table,
  isLoading,
  totalCount,
  limit,
  currentPage,
  handlePreviousPage,
  handleNextPage,
}: ICustomTableProps<T>): JSX.Element => {
  return isLoading && !hasData ? (
    <div className="w-full h-80 items-center flex justify-center">
      <Loading />
    </div>
  ) : (
    <div className="w-full max-h-fit">
      {!hasData && !isLoading ? (
        <NoDataFound />
      ) : (
        <>
          <div className="rounded-md border w-full relative overflow">
            <ShadcnTable>
              <TableHeader className="sticky top-0 left-0 right-0 w-full z-[10]  p-1">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="py-4">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="py-3 max-w-[100px] truncate"
                      >
                        {isLoading ? (
                          <Skeleton className="h-8 py-2" />
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </ShadcnTable>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="mr-2 text-sm font-semibold">
              {`Page: ${currentPage}/${Math.ceil(totalCount / limit)}`}
            </div>
            <div className="space-x-2">
              <Button
                className="text-black rounded-sm"
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={
                  getPaginationStatus(totalCount, limit, currentPage)
                    .isNextDisabled
                }
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
