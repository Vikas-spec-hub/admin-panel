import ComingSoon from '@/components/ComingSoon';
import PageLayout from '@/layouts/PageLayout';

/**
 * Work Page
 * @returns {JSX.Element}
 */
export default function Work(): JSX.Element {
  return (
    <PageLayout title={'Work'} element={<></>}>
      <div>
        <ComingSoon />
      </div>
    </PageLayout>
  );
}
