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

    const goToBigProject = () => {
        navigate(`/${id}`)
    }
    const goToProject = (e: React.MouseEvent<SVGElement | HTMLDivElement>) => {
        e.stopPropagation();
        navigate(`/${id}`)
    }
    const confirmDelete = (e: React.MouseEvent<SVGElement>) => {
        e.stopPropagation();
        setAskDelete(false);
        handleDelete(id);
    }

    const cancelDelete = (e: React.MouseEvent<SVGElement>) => {
        e.stopPropagation();
        setAskDelete(false);
    }

    const onDelete = (e: React.MouseEvent<SVGElement>) => {
        e.stopPropagation();
        setAskDelete(true);
    }

    const onEdit = (e: React.MouseEvent<SVGElement>) => {
        e.stopPropagation();
        handleEdit(id);
    }
    return (
        <div style={{
            backgroundImage: `url('${image}')`
        }}
        onClick={goToBigProject} 
        className={imageClass}>

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
            z-0
            '>
                {name}
                <div className='relative top-10 flex flex-row z-10'>
                    {askDelete ? <>
                        <div className='flex flex-row'>
                        <FcOk onClick={(e) => confirmDelete(e)} size='25px' className='mx-2 fill-white'  />
                        <FcCancel onClick={(e) => cancelDelete(e)} size='25px' className='mx-2 fill-white'  />
                      </div>
                    </>
                    : <>
                        <AiFillBook onClick={(e) => goToProject(e)} className='mt-[3px] fill-white z-100' />
                        <AiFillDelete onClick={(e) => onDelete(e)} size='25px' className='mx-2 fill-white z-100' />
                        <AiFillEdit onClick={(e) => onEdit(e)} size='25px' className='fill-white z-100' /> 
                    </>}
                </div>
            </div>
        </div>
    )
}

export default ProjectBase;