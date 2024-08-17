import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';

const AddStaff = () => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Add Staff" />

        <div className="flex justify-center items-center  bg-gray-100">
  <div className="bg-white p-6  rounded-lg shadow-lg w-full max-w-xl">
  <h3 className="font-medium text-black dark:text-white  border-b border-stroke dark:border-gray-700 pb-2">
      Staff's Details
    </h3>    <form action="#" className="w-full">
                <div className="p-6.5 ">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        First name<span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your first name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Last name<span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your last name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-4.5  w-full flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Email <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Phone Number <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your phone Number"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Joining date
                      </label>
                      <input
                        type="text"
                        placeholder="Enter JoiningDate"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        UserName
                      </label>
                      <input
                        type="text"
                        placeholder="Enter UserName"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <button className="btn-grad w-full py-3" onClick={() => {}}>
        Submit
      </button> 
                </div>
              </form>
            </div>
          </div>
   
      </DefaultLayout>
    </>
  );
};
export default AddStaff;
