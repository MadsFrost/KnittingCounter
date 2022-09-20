import React from 'react';
import { KnitProject } from '../../types';
import { AiFillDelete, AiFillEdit, AiFillBook } from 'react-icons/ai'
import { FcOk, FcCancel } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

interface ProjectBaseProps {
    project: KnitProject;
    handleDelete: (projectId: number) => void;
    handleEdit: (projectId: number) => void;
}

const ProjectBase: React.FC<ProjectBaseProps>= (props) => {
    const navigate = useNavigate();
    const { project, handleDelete, handleEdit } = props;
    const { id, name, description, image } = project;
    const [askDelete, setAskDelete] = React.useState(false);
    const imageClass = `flex justify-center items-center flex-col bg-pink-300 w-full h-[200px] bg-cover`;

    const goToProject = () => {
        navigate(`/${id}`)
    }
    const confirmDelete = () => {
        setAskDelete(false);
        handleDelete(id);
    }

    const cancelDelete = () => {
        setAskDelete(false);
    }

    const onDelete = () => {
        setAskDelete(true);
    }

    const onEdit = () => {
        handleEdit(id);
    }
    return (
        <div style={{
            backgroundImage: `url('${image}')`
        }} className={imageClass}>

            <div className=' 
            bg-black
            bg-opacity-40
            cursor-pointer
            w-full h-full
            flex
            flex-col
            justify-center
            items-center
            font-medium 
            text-xl
            text-white 
            margin-0
            '>
                {name}
                <div className='relative top-10 flex flex-row'>
                    {askDelete ? <>
                        <div className='flex flex-row'>
                        <FcOk onClick={confirmDelete} size='25px' className='mx-2 fill-white'  />
                        <FcCancel onClick={cancelDelete} size='25px' className='mx-2 fill-white'  />
                      </div>
                    </>
                    : <>
                        <AiFillBook onClick={goToProject} className='mt-[3px] fill-white' />
                        <AiFillDelete onClick={onDelete} size='25px' className='mx-2 fill-white' />
                        <AiFillEdit onClick={onEdit} size='25px' className='fill-white' /> 
                    </>}
                </div>
            </div>
        </div>
    )
}

export default ProjectBase;