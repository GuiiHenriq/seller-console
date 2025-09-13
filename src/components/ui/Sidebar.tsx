import { Link, useLocation } from 'react-router-dom';
import { useMobile } from '../../hooks/useMobile';
import { UserGroupIcon, ChartBarIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

const navigation = [
  { name: 'Leads', href: '/leads', icon: UserGroupIcon },
  { name: 'Opportunities', href: '/opportunities', icon: ChartBarIcon },
];

export function Sidebar() {
  const location = useLocation();
  const isMobile = useMobile();

  // Desktop navigation
  const DesktopSidebar = () => (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
        <span className="ml-2 text-xl font-semibold text-gray-900">Seller Console</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={clsx(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              )}
            >
              <item.icon
                className={clsx(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500',
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  // Mobile navigation
  const MobileNavigation = () => (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 py-3">
        <div className="flex items-center mb-4">
          <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-lg font-semibold text-gray-900">Seller Console</span>
        </div>

        <nav className="flex space-x-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                )}
              >
                <item.icon
                  className={clsx(
                    'mr-2 h-4 w-4 flex-shrink-0',
                    isActive ? 'text-blue-500' : 'text-gray-400',
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );

  if (isMobile) {
    return <MobileNavigation />;
  }

  return <DesktopSidebar />;
}
