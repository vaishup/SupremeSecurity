import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { ActivityDataTable } from '../components/DriverListTable/data-table';
import DefaultLayout from '../layout/DefaultLayout';
import { Card, CardContent, Badge } from '../components/ui';
import { EyeIcon } from 'lucide-react';
import { Modal ,  Button,} from 'antd';
import React, { useEffect, useState } from 'react';

const dummyData = [
  {
    ID: 'Batch#ABC',
    name: 'John Deo',
    date: '2024-05-03',
    email: 'john@gmail,com',
    status: 'Pending',
    action: '',
  },
  {
    ID: 'Batch#ABC',
    name: 'Alex Ballt',
    date: '2024-05-02',
    email: 'Alex@gmail,com',
    status: 'completed',
    action: '',
  },
  {
    ID: 'Batch#ABC',
    name: 'Gerry soak',
    date: '2024-05-01',
    email: 'gerry@gmail.con',
    status: 'rejected',
    action: '',
  },
  // Add more dummy data as needed
];

const RecentMobile = (data: any) => {
  const list = data.data;

  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const handleClick = () => {
    console.log("sss");
    
    setIsOpen(true);
    setIsDialogOpen(true);
  };
  // Get Status
  const Status = ({ status }) => {
    const normalizedStatus = status.toLowerCase();
    return (
      <>
        {normalizedStatus === 'pending' && (
          <Badge className="bg-[#F09432] text-white">Pending</Badge>
        )}
        {normalizedStatus === 'completed' && (
          <Badge className="bg-[#8BBA8F] text-white">Completed</Badge>
        )}
        {normalizedStatus === 'success' && (
          <Badge className="bg-[#8BBA8F] text-white">Success</Badge>
        )}

        {normalizedStatus === 'failed' && (
          <Badge className="bg-[#dc3545] text-white">Failed</Badge>
        )}

        {normalizedStatus === 'rejected' && (
          <Badge className="bg-[#dc3545] text-white">Rejected</Badge>
        )}
        {normalizedStatus !== 'pending' &&
          normalizedStatus !== 'success' &&
          normalizedStatus !== 'failed' &&
          normalizedStatus !== 'rejected' &&
          normalizedStatus !== 'completed' && (
            <Badge variant="outline">N/A</Badge>
          )}
      </>
    );
  };

  return (
    <div>
      <div className="relative w-[300px]">
            <input
              type="text"
              placeholder="Search for Driver..."
              className="w-full pl-10 pr-2 py-1 rounded-full  bg-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute inset-y-0 left-1 flex items-center pl-2">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m1.2-4.95a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                />
              </svg>
            </span>
          </div>
      {list.map((item: any, i: number) => (


<Card key={i} className="mt-2 bg-white shadow-lg rounded-lg border border-white">
<div className="flex flex-row justify-between p-4">
            <p className="font-semibold text-xl">{item.ID}</p>

            <Status status={item.status} />
          </div>
          <div className="flex flex-row justify-between pl-4">
            <p className="font-semibold text-xl">{item.name}</p>
          </div>
          <CardContent className="px-4">
            <div className="space-y-2">
              <p className="font-bold">{item.email}</p>
              <p className="text-xs font-light">{item.date}</p>
              <div className="flex items-center justify-between">
            
                <EyeIcon  onClick={handleClick}/>
    
                <Modal
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            footer={[
              // <Button key="back">
              //   {/* Initiate */}
              //   {isView === 'block' ? 'Initiate' : 'Ok'}
              // </Button>,
              <Button
                className="text-black bg-white border-gray"
                key="back"
                onClick={() => setIsOpen(false)}
              >
                OK
              </Button>,
            ]}
          >
            <div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-bold font-medium text-lg">Driver's Details</p>
                <p className="font-medium text-lg">Pending</p>
              </div>
              <div>
                <div className="mb-3 pl-10 pr-10 flex flex-row items-center justify-between">
                  <div>
                    <p>Driver ID</p>
                    <p className="text-bold font-medium text-lg">1234567</p>
                  </div>

                  <div>
                    <p>Driver's Email</p>
                    <p className="text-bold font-medium text-lg">abc@gmail.com</p>
                  </div>
                </div>

                <div className="mb-3 pl-10 pr-10 flex flex-row items-center justify-between">
                  <div className='justify-between'>
                    <p>Driver's Joining Date</p>
                    <p className="text-bold font-medium text-lg">17 may 2024o</p>
                  </div>

                  <div className=''>
                    <p>Driver's Address</p>
                    <p className="text-bold font-medium text-lg">Abc drive  vaughn Ontario</p>
                  </div>
                </div>


                <div className="pl-10 pr-10 flex flex-row items-center justify-between">
                  <div>
                    <p>Delivery Availability </p>
                    <p className="text-bold font-medium text-lg">1 to 4 pm</p>
                  </div>

                  {/* <div>
                    <p>Order ID</p>
                    <p className="text-bold font-medium text-lg">1234567</p>
                  </div> */}
                </div>
              </div>
            </div>
          </Modal>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
const DriverList = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Drivers" />
     <div className="flex flex-col gap-10">
        <div className="hidden md:block">
          <ActivityDataTable data={dummyData} />
    {/* <Recent /> */}
        </div>
        {/* Recent Activity - Mobile */}
        <div className="block md:hidden">
          <RecentMobile data={dummyData} />
        </div>
        {/* 
        <TableOne />
        <TableTwo />
        <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default DriverList;
