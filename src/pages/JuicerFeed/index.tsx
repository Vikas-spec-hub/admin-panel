import ComingSoon from '@/components/ComingSoon';
import PageLayout from '@/layouts/PageLayout';

/**
 * JuicerFeed Page
 * @returns {JSX.Element}
 */
export default function JuicerFeed(): JSX.Element {
  return (
    <PageLayout title={'Juicer Feed'} element={<></>}>
      <div>
        <ComingSoon />
      </div>
    </PageLayout>
  );
}
