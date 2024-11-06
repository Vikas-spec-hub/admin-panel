import React, { FC } from 'react';
import { Filter } from 'lucide-react';

interface IFilterButtonProps {
  onClick: () => void;
}

/**
 * Filter Button for the table data
 * @param {IFilterButtonProps}
 * @returns
 */
const FilterButton: FC<IFilterButtonProps> = ({
  onClick,
}: IFilterButtonProps) => {
  return (
    <>
      <div onClick={onClick} className="flex cursor-pointer">
        <p className="flex items-center">
          <Filter className="size-4 mr-1" />
          <span className="text-base font-semibold">Filter</span>
        </p>
      </div>
    </>
  );
};

export default FilterButton;
