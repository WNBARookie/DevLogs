import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect, useRef } from 'react';
import type { CreateItemRequestBody, ItemInfo, UpdateItemRequestBody } from '../types';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { updateItem, createItem } from '../services/ItemService';
import { FaTimes } from 'react-icons/fa';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css'; // You might need to import the base styles for DayPicker

type ItemFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  item: ItemInfo | null;
  projectId: string;
};

const ItemFormModal = ({ open, onClose, onSuccess, item, projectId }: ItemFormModalProps) => {
  const [isAddingItem, setIsAddingItem] = useState(true);
  const [showDayPicker, setShowDayPicker] = useState(false);
  const dayPickerRef = useRef<HTMLDivElement | null>(null);

  const validation = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    whatWentWell: Yup.string().required('What went well is required'),
    whatDidNotGoWell: Yup.string().required('What did not go well is required'),
    lessonsLearned: Yup.string().required('Lessons Learned is required'),
    dateCompleted: Yup.date().required('Date completed is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, touchedFields },
  } = useForm<CreateItemRequestBody>({
    resolver: yupResolver(validation),
    defaultValues: { title: '', description: '', whatWentWell: '', whatDidNotGoWell: '', lessonsLearned: '', dateCompleted: new Date() },
  });

  const dateCompleted = watch('dateCompleted');

  const handleCreateItem = async (form: CreateItemRequestBody) => {
    let res;
    form.projectId = projectId;

    if (item) {
      const updateForm = form as UpdateItemRequestBody;
      updateForm.id = item.id;
      res = await updateItem(updateForm);
    } else {
      res = await createItem(form);
    }

    if (res && res.status === 200) {
      clearForm();
      onSuccess();
    }
  };

  const clearForm = () => {
    reset(
      { title: '', description: '', whatWentWell: '', whatDidNotGoWell: '', lessonsLearned: '', dateCompleted: new Date() },
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
    setIsAddingItem(!item);

    if (item) {
      reset({
        title: item.title,
        description: item.description,
        whatWentWell: item.whatWentWell,
        whatDidNotGoWell: item.whatDidNotGoWell,
        lessonsLearned: item.lessonsLearned,
        dateCompleted: new Date(item.dateCompleted),
      });
    } else {
      reset({ title: '', description: '', whatWentWell: '', whatDidNotGoWell: '', lessonsLearned: '', dateCompleted: new Date() });
      clearForm();
    }
  }, [item]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dayPickerRef.current && !dayPickerRef.current.contains(event.target as Node)) {
        setShowDayPicker(false);
      }
    }

    if (showDayPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDayPicker]);

  return (
    <dialog open={open} className="modal">
      <div className="modal-box bg-gray-100 relative rounded-lg">
        <FaTimes className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4" onClick={handleCloseDialog} />

        <h2 className="font-bold text-3xl text-center my-2">{isAddingItem ? 'Add Item' : 'Edit Item'}</h2>

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleCreateItem)}>
          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              {...register('title')}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                             focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            {errors.title && touchedFields.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
              Description
            </label>
            <textarea
              rows={2}
              id="description"
              placeholder="Description"
              {...register('description')}
              className="resize-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                             focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            {errors.description && touchedFields.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>

          <div>
            <label htmlFor="whatWentWell" className="block mb-2 text-sm font-medium text-gray-900">
              What Went Well
            </label>
            <input
              type="text"
              id="whatWentWell"
              placeholder="What Went Well"
              {...register('whatWentWell')}
              className="resize-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                             focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            {errors.whatWentWell && touchedFields.whatWentWell && <p className="text-red-500">{errors.whatWentWell.message}</p>}
          </div>

          <div>
            <label htmlFor="whatDidNotGoWell" className="block mb-2 text-sm font-medium text-gray-900">
              What Did Not Go Well
            </label>
            <input
              type="text"
              id="whatDidNotGoWell"
              placeholder="What Did Not Go Well"
              {...register('whatDidNotGoWell')}
              className="resize-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                             focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            {errors.whatDidNotGoWell && touchedFields.whatDidNotGoWell && <p className="text-red-500">{errors.whatDidNotGoWell.message}</p>}
          </div>

          <div>
            <label htmlFor="lessonsLearned" className="block mb-2 text-sm font-medium text-gray-900">
              Lessons Learned
            </label>
            <input
              type="text"
              id="lessonsLearned"
              placeholder="Lessons Learned"
              {...register('lessonsLearned')}
              className="resize-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                             focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            {errors.lessonsLearned && touchedFields.lessonsLearned && <p className="text-red-500">{errors.lessonsLearned.message}</p>}
          </div>

          <div className="relative">
            <label htmlFor="dateCompleted" className="block mb-2 text-sm font-medium text-gray-900">
              Date Completed
            </label>
            <input
              type="text"
              id="dateCompleted"
              readOnly
              value={
                dateCompleted
                  ? new Date(dateCompleted).toLocaleDateString('en-US', {
                      month: '2-digit',
                      day: '2-digit',
                      year: 'numeric',
                    })
                  : ''
              }
              onFocus={() => setShowDayPicker(true)}
              {...register('dateCompleted')}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
               focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />

            {showDayPicker && (
              <div ref={dayPickerRef} className="absolute left-0 bottom-full mb-2 flex items-center justify-center bg-white shadow-lg rounded-lg py-4 px-6 z-50">
                <DayPicker
                  mode="single"
                  selected={dateCompleted ? new Date(dateCompleted) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      setValue('dateCompleted', date, { shouldValidate: true });
                    }
                    setShowDayPicker(false);
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mx-20">
            <button
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-blue-700 
                             focus:ring-4 focus:outline-none focus:ring-primary-300 
                             font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {isAddingItem ? 'Add' : 'Edit'}
            </button>
            <button
              type="button"
              onClick={handleCloseDialog}
              className="w-full text-white bg-gray-500 hover:bg-primary-700 
                             focus:ring-4 focus:outline-none focus:ring-primary-300 
                             font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ItemFormModal;
