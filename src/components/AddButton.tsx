import { FC } from 'react';
import { PlusCircleIcon } from 'lucide-react';

interface IAddButtonProps {
  title: string;
  onClick: () => void;
}

/**
 * Add button for the page
 * @param {IAddButtonProps}
 * @returns {JSX.Element}
 */
export const AddButton: FC<IAddButtonProps> = ({
  title,
  onClick,
}: IAddButtonProps): JSX.Element => {
  return (
    <>
      <div onClick={onClick} className="flex mr-4 items-center cursor-pointer">
        <PlusCircleIcon className="size-4 mr-1" />
        <span className="text-sm font-semibold">{title}</span>
      </div>
    </>
  );
};

export default AddButton;
