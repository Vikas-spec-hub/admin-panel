import { ReactElement, ReactNode } from 'react';

import { Separator } from '@/components/ui/separator';

interface IPageLayoutProps {
  children: ReactNode;
  title: string;
  element: ReactElement;
}

/**
 * Main Page Layout
 * @returns {JSX.Element}
 */
export default function PageLayout({
  children,
  title,
  element,
}: IPageLayoutProps): JSX.Element {
  return (
    <>
      <div className="flex justify-between">
        <div className="text-[#202224] font-semibold text-3xl">{title}</div>
        <div>{element}</div>
      </div>
      <div className="my-5">
        <Separator />
      </div>
      <div>{children}</div>
    </>
  );
}
