import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { Outlet } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const PublicLayout = () => {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between overflow-x-hidden">
      <SiteHeader />
      <main className="flex-1 w-full pt-28 pb-16 flex flex-col">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <SiteFooter />
    </div>
  );
};

export default PublicLayout;
