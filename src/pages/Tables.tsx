import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import React, { useEffect, useState } from 'react';

import { ActivityDataTable } from '../components/activity/data-table';
import DefaultLayout from '../layout/DefaultLayout';
import { Card, CardContent, Badge } from '../components/ui';
import { EyeIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import {
  Form,
  Select,
  Input,
  Tabs,
  Modal,
  Flex,
  Button,
  message,
  Dropdown,
  Space,
} from 'antd';
const dummyData = [
  {
    ID: 'Batch#ABC',
    name: 'Lorem ipsum dolor sit amet',
    date: '2024-05-03',
    email: 'Urgent',
    status: 'Pending',
    action: '',
  },
  {
    ID: 'Batch#ABC',
    name: 'Consectetur adipiscing elit',
    date: '2024-05-02',
    email: 'Normal',
    status: 'completed',
    action: '',
  },
  {
    ID: 'Batch#ABC',
    name: 'Sed do eiusmod tempor incididunt',
    date: '2024-05-01',
    email: 'Normal',
    status: 'rejected',
    action: '',
  },
  // Add more dummy data as needed
];

const RecentMobile = (data: any) => {
  const list = data.data;
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to track if the dialog is open
  const [isView, setIsView] = useState('block');
  const [show, setIsShow] = useState(false);
  const [isDialogShow, setIsDialogShow] = useState(false); // State to track if the dialog is open

  const handleClick = () => {
    console.log('sss');

    setIsOpen(true);
    setIsDialogOpen(true);
  };

  const handleClickDriver = () => {
    setIsShow(true);
    setIsDialogShow(true);
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
          placeholder="Search for Batch..."
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
      {list.length === 0 ? (
        <p>No Batch available.</p>
      ) : (
        list.map((item, i) => (
          <Card
            key={i}
            className="mt-2 bg-white shadow-lg rounded-lg border border-white"
          >
            <div className="flex flex-row justify-between p-4">
              <p className="font-light text-md font-black">{'Batch#123'}</p>
              <Status status={'pending'} />
            </div>
            <div className="flex flex-row justify-between pl-4 pb-2">
              <p className="font-semibold text-xl">{item.name}</p>
            </div>
            <CardContent className="px-4">
              <div className="space-y-2">
                <div
                  className="flex flex-row"
                  style={{ fontFamily: 'Santoshi, sans-serif' }}
                >
                  <p>Order Type </p>
                  <p className="ml-4 font-bold">{item.type}</p>
                </div>
                <div
                  className="flex flex-row"
                  style={{ fontFamily: 'Santoshi, sans-serif' }}
                >
                  <p>Date </p>
                  <p className="ml-4 font-bold">{item.date}</p>
                </div>
                <div
                  className="flex flex-row"
                  style={{ fontFamily: 'Santoshi, sans-serif' }}
                >
                  <p>Delivery Time </p>
                  <p className="ml-4 font-bold">{item.deliveryTime}</p>
                </div>
                <div className="flex items-center justify-between">
                  <EyeIcon onClick={handleClick} />
                  <Badge
                    className="bg-[#00ace6] text-white"
                    onClick={handleClickDriver}
                  >
                    Assign
                  </Badge>
                </div>
                {/* Modal Content in eye click  */}
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
                      <p className="text-bold font-medium text-lg">Batch#123</p>
                      <p className="font-medium text-lg">Pending</p>
                    </div>
                    <div>
                      <div className="mb-3 pl-10 pr-10 flex flex-row items-center justify-between">
                        <div>
                          <p>Order ID</p>
                          <p className="text-bold font-medium text-lg">
                            1234567
                          </p>
                        </div>

                        <div>
                          <p>Order Type</p>
                          <p className="text-bold font-medium text-lg">
                            Normal
                          </p>
                        </div>
                      </div>

                      <div className="mb-3 pl-10 pr-10 flex flex-row items-center justify-between">
                        <div>
                          <p>Asign to </p>
                          <p className="text-bold font-medium text-lg">
                            john Deo
                          </p>
                        </div>

                        <div>
                          <p>Deadline Date</p>
                          <p className="text-bold font-medium text-lg">
                            17 may 2024
                          </p>
                        </div>
                      </div>

                      <div className="pl-10 pr-10 flex flex-row items-center justify-between">
                        <div>
                          <p>Delivery Time </p>
                          <p className="text-bold font-medium text-lg">
                            1 to 4 pm
                          </p>
                        </div>

                        <div>
                          <p>Order ID</p>
                          <p className="text-bold font-medium text-lg">
                            1234567
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
                {/* Modal Content in assign click  */}

                <Modal
                  open={show}
                  onCancel={() => setIsShow(false)}
                  footer={[
                    <Button
                      key="back"
                      className={` mr-4 text-white bg-green-500 hover:bg-green-600 `}
                    >
                      {/* Initiate */}
                      {isView === 'block' ? 'Assign' : 'Ok'}
                    </Button>,
                    <Button
                      className=" mr-10 text-black bg-white border border-gray-100 hover:bg-gray-100"
                      key="back"
                      onClick={() => setIsShow(false)}
                    >
                      Cancel
                    </Button>,
                  ]}
                >
                  <div>
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-bold font-medium text-lg">
                        Select Driver
                      </p>
                      <select
                        name="deliveryTime"
                        className="p-3 m-3 rounded border-[1.5px] border-stroke bg-transparent text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        <option value="">Select Driver</option>
                        <option value="9 to 12 am">John Deo </option>
                        <option value="12 to 3 pm">Alex Leo</option>
                        <option value="3 to 6 pm">Gerry merry</option>
                        {/* Add more options as needed */}
                      </select>
                    </div>
                  </div>
                </Modal>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
const Tables = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [isView, setIsView] = useState(false);

  const orders = location.state?.orders || []; // Use optional chaining and a default value
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Batches" />

      <div className="flex flex-col gap-10">
        <div className="hidden md:block">
          {/* {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : ( */}
          <ActivityDataTable data={orders} />
          {/* //)} */}
          {/* <Recent /> */}
        </div>
        {/* Recent Activity - Mobile */}
        <div className="block md:hidden">
          {/* {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : ( */}
          <RecentMobile data={orders} />
          {/* // )} */}
        </div>
      </div>
      <div>
        <Modal
          open={showModal}
          style={{ width: '' }}
          onCancel={() => setShowModal(false)}
          footer={[
            isView ? (
              <>
                <Button key="back" onClick={() => setShowModal(false)}>
                  Ok
                </Button>
              </>
            ) : (
              <>
                <Button key="back">Initiate</Button>

                <Button key="back" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
              </>
            ),
          ]}
        >
          <div className="modalHeading"></div>
          <div className="modalDetailsSec">
            <div className="modalDetails">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '0.5rem',
                }}
              >
                <p>Paid To</p>
                {/* <span>{record.userName}</span> */}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '0.5rem',
                }}
              >
                <p>Request Date</p>
                {/* <span>{record.requestDate}</span> */}
              </div>
            </div>

            <div className="modalDetails">
              <div>
                <p>Method</p>
                {/* <span>{record.method}</span> */}
              </div>
            </div>

            <div className="modalDetails"></div>
            <div className="modalDetails">
              <div>
                <p>Payment Date</p>
                <span>
                  <fieldset></fieldset>
                </span>
              </div>
              <div>
                <p>Status</p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </DefaultLayout>
  );
};

export default Tables;
