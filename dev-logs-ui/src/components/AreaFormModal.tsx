import { useEffect, useState } from 'react';
import type { AreaInfo, CreateAreaRequestBody, UpdateAreaRequestBody } from '../types';
import { createArea, updateArea } from '../services/AreaService';
import { FaTimes } from 'react-icons/fa';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

type AreaFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  area: AreaInfo | null;
};

function AreaFormModal({ open, onClose, onSuccess, area }: AreaFormModalProps) {
  const [isAddingArea, setIsAddingArea] = useState(true);

  const validation = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm<CreateAreaRequestBody>({ resolver: yupResolver(validation), defaultValues: { title: '', description: '' } });

  const handleCreateArea = async (form: CreateAreaRequestBody) => {
    let res;

    if (area) {
      const updateForm = form as UpdateAreaRequestBody;
      updateForm.id = area.id;
      res = await updateArea(updateForm);
    } else {
      res = await createArea(form);
    }

    if (res && res.status === 200) {
      clearForm();
      onSuccess();
    }
  };

  const clearForm = () => {
    reset(
      { title: '', description: '' },
      {
        keepErrors: false,
        keepDirty: false,
        keepTouched: false,
      }
    );
  };

  const handleCloseDialog = () => {
    clearForm();
    onClose();
  };

  useEffect(() => {
    setIsAddingArea(area ? false : true);

    if (area) {
      reset({ title: area.title, description: area.description });
    } else {
      reset({ title: '', description: '' });
      clearForm();
    }
  }, [area]);

  return (
    <dialog open={open} className="modal">
      <div className="modal-box bg-gray-100 dark:bg-gray-900 relative">
        <FaTimes className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleCloseDialog} />

        <h2 className="font-bold text-3xl text-center mt-4 mb-8">{isAddingArea ? 'Add Area' : 'Edit Area'}</h2>

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleCreateArea)}>
          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              {...register('title')}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                         focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.title && touchedFields.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <textarea
              rows={4}
              id="description"
              placeholder="Description"
              {...register('description')}
              className="resize-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                         focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.description && touchedFields.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>

          <div className="flex items-center gap-4 mx-20">
            <button
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-primary-700 
                         focus:ring-4 focus:outline-none focus:ring-primary-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                         dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {isAddingArea ? 'Add' : 'Edit'}
            </button>
            <button
              type="button"
              onClick={handleCloseDialog}
              className="w-full text-white bg-gray-500 hover:bg-primary-700 
                         focus:ring-4 focus:outline-none focus:ring-primary-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                         dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default AreaFormModal;
