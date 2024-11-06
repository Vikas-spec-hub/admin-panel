import ComingSoon from '@/components/ComingSoon';
import PageLayout from '@/layouts/PageLayout';

/**
 * Dashboard Page
 * @returns {JSX.Element}
 */
export default function Dashboard(): JSX.Element {
  return (
    <PageLayout title={'Dashboard'} element={<></>}>
      <div>
        <ComingSoon />
      </div>
    </PageLayout>
  );
}
