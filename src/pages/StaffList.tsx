import { PencilIcon, Trash2 } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { useNavigate } from 'react-router-dom';

const StaffList = () => {
  const employees = [
    {
      id: '001',
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice.smith@example.com',
      phone: '123-456-7890',
      joiningDate: '2024-01-15',
    },
    {
      id: '002',
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@example.com',
      phone: '234-567-8901',
      joiningDate: '2024-02-10',
    },
    {
      id: '003',
      firstName: 'Charlie',
      lastName: 'Brown',
      email: 'charlie.brown@example.com',
      phone: '345-678-9012',
      joiningDate: '2024-03-05',
    },
    {
      id: '004',
      firstName: 'Diana',
      lastName: 'Prince',
      email: 'diana.prince@example.com',
      phone: '456-789-0123',
      joiningDate: '2024-04-20',
    },
    {
      id: '005',
      firstName: 'Eve',
      lastName: 'Adams',
      email: 'eve.adams@example.com',
      phone: '567-890-1234',
      joiningDate: '2024-05-15',
    },
    {
      id: '006',
      firstName: 'Frank',
      lastName: 'Wright',
      email: 'frank.wright@example.com',
      phone: '678-901-2345',
      joiningDate: '2024-06-10',
    },
    {
      id: '007',
      firstName: 'Grace',
      lastName: 'Hopper',
      email: 'grace.hopper@example.com',
      phone: '789-012-3456',
      joiningDate: '2024-07-05',
    },
    {
      id: '008',
      firstName: 'Hank',
      lastName: 'Green',
      email: 'hank.green@example.com',
      phone: '890-123-4567',
      joiningDate: '2024-08-01',
    },
    {
      id: '009',
      firstName: 'Ivy',
      lastName: 'Clarkson',
      email: 'ivy.clarkson@example.com',
      phone: '901-234-5678',
      joiningDate: '2024-08-25',
    },
    {
      id: '010',
      firstName: 'Jack',
      lastName: 'Daniels',
      email: 'jack.daniels@example.com',
      phone: '012-345-6789',
      joiningDate: '2024-09-15',
    },
  ];
  
  const navigation = useNavigate();
  return (
    <>
      <DefaultLayout>

        <div className="flex items-center justify-between">
          <h2 className="text-title-md2 font-semibold text-primary dark:text-white">
            Staff List
          </h2>

          <button className="btn-grad w-[180px] pr-20"onClick={() =>{
            navigation('/addstaff')
          }}>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            Add New Staff
          </button>
        </div>

        <div className="overflow-x-auto mt-10">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-gradient-to-r from-[#7a2828] to-[#a73737]">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
First Name                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                Email
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
               Phone Number
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
               Joining date
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
             Action
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                    {order.firstName}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                    
                      {order.email}
                   
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                    {order.phone}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                    {order.joiningDate}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm flex-row">
                    <div className='flex flex-row'>
                    <PencilIcon onClick={() =>{
                      console.log(order.id);
                      
                    }}   className="mr-5 inline-block transition duration-300 ease-in-out transform hover:text-red-600 hover:scale-110"
                    color='black' size={20}/>
                    <Trash2 onClick={() =>{
                      console.log(order.id);
                      
                    }}     className="inline-block transition duration-300 ease-in-out transform hover:text-red-600 hover:scale-110"
                    color='black' size={20}/>
                    </div>
             
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DefaultLayout>
    </>
  );
};
export default StaffList;
