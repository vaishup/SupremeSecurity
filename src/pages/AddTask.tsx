import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';

const AddTask = () => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Add Task" />

        <div className="flex justify-center items-center  bg-gray-100">
  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
    <h3 className="font-medium text-black dark:text-white mb-6">Task's Details</h3>
    <form action="#" className="w-full">
      <div className="mb-4">
        <label className="mb-2.5 block text-black dark:text-white">
          Title
        </label>
        <input
          type="text"
          placeholder="Enter Title"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2.5 block text-black dark:text-white">
          Description
        </label>
        <textarea
          rows={3}
          placeholder="Enter Description"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        ></textarea>
      </div>

      <div className="mb-6">
        <label className="mb-2.5 block text-black dark:text-white">
          Frequency
        </label>
        <input
          type="text"
          placeholder="Enter Frequency"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>

      <button className="btn-grad w-full py-3" onClick={() => {}}>
        Submit
      </button>
    </form>
  </div>
</div>


      </DefaultLayout>
    </>
  );
};
export default AddTask;
