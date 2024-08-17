import { EyeIcon, PencilIcon, Trash2 } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { useNavigate } from 'react-router-dom';

const IncidenetsList = () => {
    const supportTickets = [
        {
          id: '001',
          subject: 'Server Down',
          location: 'New York Data Center',
          createdAt: '2024-08-15T09:30:00Z',
          description: 'The main server is down and needs immediate attention. Multiple services are affected.',
        },
        {
          id: '002',
          subject: 'Email Issues',
          location: 'Los Angeles Office',
          createdAt: '2024-08-14T14:45:00Z',
          description: 'Users are experiencing issues with receiving emails. The mail server might be down.',
        },
        {
          id: '003',
          subject: 'Network Latency',
          location: 'Chicago Branch',
          createdAt: '2024-08-13T11:15:00Z',
          description: 'High network latency has been observed during peak hours. Investigation required.',
        },
        {
          id: '004',
          subject: 'Software Update Failure',
          location: 'San Francisco Office',
          createdAt: '2024-08-12T08:20:00Z',
          description: 'The latest software update failed to install on multiple workstations. Rollback needed.',
        },
        {
          id: '005',
          subject: 'Database Backup Error',
          location: 'Miami Data Center',
          createdAt: '2024-08-11T07:50:00Z',
          description: 'Scheduled database backup failed last night. Data integrity needs to be checked.',
        },
        {
          id: '006',
          subject: 'Security Breach',
          location: 'Dallas Headquarters',
          createdAt: '2024-08-10T18:10:00Z',
          description: 'A potential security breach was detected in the main system. Immediate action required.',
        },
        {
          id: '007',
          subject: 'Printer Malfunction',
          location: 'Boston Office',
          createdAt: '2024-08-09T10:30:00Z',
          description: 'The main office printer is malfunctioning, causing delays in document processing.',
        },
        {
          id: '008',
          subject: 'Power Outage',
          location: 'Seattle Data Center',
          createdAt: '2024-08-08T13:00:00Z',
          description: 'A power outage occurred, affecting all servers in the Seattle Data Center.',
        },
      ];
      

  const navigation = useNavigate();
  return (
    <>
      <DefaultLayout>
        <div className="flex items-center justify-between">
          <h2 className="text-title-md2 font-semibold text-primary dark:text-white">
            Incident's List
          </h2>

        </div>


<div className="overflow-x-auto mt-10">
  <div className="p-7 grid grid-cols-1 gap-4">
    {supportTickets.map((ticket) => (
      <div
        key={ticket.id}
        className="rounded-lg p-6 shadow-lg bg-white dark:bg-meta-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
        onClick={() => navigation(`/ticketdetails/${ticket.id}`)}
      >
        <div className="flex justify-between items-center mb-3">
          <div>
            <h4 className="text-xl font-semibold text-black dark:text-white">
              {ticket.subject}
            </h4>
            <p className="text-base text-gray-600 dark:text-gray-300">
              Location: {ticket.location}
            </p>
            <p className="text-base text-gray-600 dark:text-gray-300">
              Date & Time: {ticket.createdAt}
            </p>
          </div>
          <EyeIcon className="text-gray-500 dark:text-gray-400 text-2xl ml-4" />
        </div>
        <div className="text-gray-500 dark:text-gray-400">
          <p className="text-sm">{ticket.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>

      </DefaultLayout>
    </>
  );
};
export default IncidenetsList;
