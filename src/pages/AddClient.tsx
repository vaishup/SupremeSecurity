import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { ArrowUpFromLine } from 'lucide-react';

const AddClient = () => {
  const [name, setName] = useState();
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 10); // Limit to 10 files
    setFiles(selectedFiles);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const renderFilePreview = (file) => {
    if (file.type.startsWith('image/')) {
      return <ArrowUpFromLine className="text-2xl text-blue-500" />;
    } else {
      return <ArrowUpFromLine className="text-2xl text-gray-500" />;
    }
  };
  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const filePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setFile(filePreviews);
  };
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Add Client" />

        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Client's information
                </h3>
              </div>
              <form action="#">
                <div className="p-6.5 ">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Name <span className="text-meta-1">*</span>
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Update the state with the new value
                        type="text"
                        placeholder="Enter your first Name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Phone Number <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your   Phone Number"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Business Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your  Business Name"
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
                        Contact Person phone{' '}
                        <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your  Contact Person phone"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Address <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Address"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      File Upload (Upload upto 10 imgaes )
                    </label>
                    {/* <input
        type="file"
        multiple
        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
        onChange={handleFileChange}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      /> */}

                    <input
                      type="file"
                      multiple
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <div className="mt-4 space-y-4">
                      {file.map((file, index) => (
                        <img
                          key={index}
                          className="m-3"
                          width={120}
                          height={120}
                          src={file}
                          alt={`Preview ${index}`}
                        />
                      ))}
                    </div>
                    <div className="mt-4 space-y-4">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 border rounded-lg border-stroke dark:border-form-strokedark"
                        >
                          <div className="flex items-center gap-2">
                            {renderFilePreview(file)}
                            <span className="text-sm text-black dark:text-white">
                              {file.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="text-red-500 text-sm hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Note
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Type your Note"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    ></textarea>
                  </div>

                  {/* <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Submit
                  </button> */}
                  <button className="btn-grad w-full pr-20" onClick={() =>{
            
          }}>
           
           Submit
          </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};
export default AddClient;
