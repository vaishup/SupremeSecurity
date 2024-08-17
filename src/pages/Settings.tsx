import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import userThree from '../images/user/user-03.png';
import { useState, useEffect } from 'react';

import DefaultLayout from '../layout/DefaultLayout';
import { Card, CardContent, Badge } from '../components/ui';
import { EyeIcon } from 'lucide-react';
import flatpickr from 'flatpickr';

import { ActivityDataTable } from '../components/PatientsListTable/data-table';
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
      {list.map((item: any, i: number) => (
        <Card key={i} className="mt-2">
          <div className="flex flex-row justify-between p-4">
            <p className="font-semibold text-xl">{"1"}</p>

            <Status status={"pending"} /> 

          </div>
          <div className="flex flex-row justify-between p-4">
            <p className="font-semibold text-xl">{item.name}</p>
          </div>
          <CardContent className="px-4">
            <div className="space-y-2">
              <p className="font-bold">{item.email}</p>
            <p className="text-xs font-light">{item.phoneNumber}</p> 
              <div className="flex items-center justify-between">
            
                <EyeIcon />
                <Badge className="bg-[#00ace6] text-white">Assign</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
const Settings = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    dateofbirth:''
  });
  const [patient, setPatients] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      date: selectedDate,
    };
    setPatients((prevOrders) => [...prevOrders, updatedFormData]);
    setFormData({
      name: '',
      address: '',
      phoneNumber: '',
      dateofbirth:''
    });

    console.log(patient);

  };
  useEffect(() => {
    // Init flatpickr
    flatpickr('.form-datepicker', {
      mode: 'single',
      static: true,
      monthSelectorType: 'static',
      dateFormat: 'j/m/Y',
      prevArrow:
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
      nextArrow:
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
      onChange: (selectedDates, dateStr, instance) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          date: dateStr,
        }));
      },
    });
  }, []);
  return (
    <DefaultLayout>
      <div className="w-full">
        <Breadcrumb pageName="Add Patients" />

        <div className="grid grid-cols-5 gap-8 ">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Patient's Information
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          id="fullName"
                          placeholder="Devid Jhon"
                          defaultValue="Devid Jhon"
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Phone Number
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}                        
                        id="phoneNumber"
                        placeholder="+990 3343 7865"
                        defaultValue="+990 3343 7865"
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                       Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        id="emailAddress"
                        placeholder="devidjond45@gmail.com"
                        defaultValue="devidjond45@gmail.com"
                      />
                    </div>
                  </div>

                 <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                    Date OF Birth
                    </label>
                    <input
                     value={formData.dateofbirth}
                     onChange={handleChange}
                      className="text-black form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      placeholder="mm/dd/yyyy"
                      data-class="flatpickr-right"
                    />
                  </div> 


                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-[#50abe3] py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>

          
            </div>
           
          </div>
          
        </div>
        <div className="flex flex-col gap-10 mt-10 w-full">
        <div className="hidden md:block">
          <ActivityDataTable data={patient} />
    {/* <Recent /> */}
        </div>
        {/* Recent Activity - Mobile */}
        <div className="block md:hidden">
          <RecentMobile data={patient} />
        </div>
        {/* 
        <TableOne />
        <TableTwo />
        <TableThree /> */}
      </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
