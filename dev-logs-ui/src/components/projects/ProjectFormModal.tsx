import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createProject, updateProject } from '../../services/ProjectService';
import type { CreateProjectRequestBody, ProjectInfo, UpdateProjectRequestBody } from '../../types';
import * as Yup from 'yup';
import { FaTimes } from 'react-icons/fa';

type ProjectFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  project: ProjectInfo | null;
  areaId: string;
};

const ProjectFormModal = ({ open, onClose, onSuccess, project, areaId }: ProjectFormModalProps) => {
  const [isAddingProject, setIsAddingProject] = useState(true);

  const validation = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, isValid },
  } = useForm<CreateProjectRequestBody>({ resolver: yupResolver(validation), defaultValues: { title: '', description: '' }, mode: 'onChange' });

  const handleCreateProject = async (form: CreateProjectRequestBody) => {
    let res;
    form.areaId = areaId;

    if (project) {
      const updateForm = form as UpdateProjectRequestBody;
      updateForm.id = project.id;
      res = await updateProject(updateForm);
    } else {
      res = await createProject(form);
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
    setIsAddingProject(!project);

    if (project) {
      reset({ title: project.title, description: project.description });
    } else {
      reset({ title: '', description: '' });
      clearForm();
    }
  }, [project]);

  return (
    <dialog open={open} className="modal" data-testid="dialog">
      <div className="modal-box bg-gray-100 relative rounded-lg">
        <FaTimes className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4" onClick={handleCloseDialog} data-testid="close-button" />

        <h2 className="font-bold text-3xl text-center my-2" data-testid="dialog-title">
          {isAddingProject ? 'Add Project' : 'Edit Project'}
        </h2>

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleCreateProject)}>
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
              data-testid="title-field"
            />
            {errors.title && touchedFields.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
              Description
            </label>
            <textarea
              rows={4}
              id="description"
              placeholder="Description"
              {...register('description')}
              className="resize-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                         focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              data-testid="description-field"
            />
            {errors.description && touchedFields.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>

          <div className="flex items-center gap-4 mx-20">
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center
                ${!isValid ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300'}`}
              data-testid="dialog-action-button"
            >
              {isAddingProject ? 'Add' : 'Edit'}
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

export default ProjectFormModal;
