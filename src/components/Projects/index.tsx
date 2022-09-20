import React from 'react';
import type { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux'
import { deleteKnitProject, updateKnitProject } from '../../features/KnitProject';
import ProjectBase from './ProjectBase';
import AddProject from './AddProject';
const Projects = () => {
    const projects = useSelector((state: RootState) => state.knitProject.projects);
    const dispatch = useDispatch();

    const handleDelete = (projectId: number) => {
        dispatch(deleteKnitProject(projectId));
    }

    const handleEdit = (projectId: number) => {
        alert('Editing');
    }
    return (
        <div className='grid grid-cols-2 gap-8'>
            <AddProject />
            {projects.map((project, idx) => {
                return <ProjectBase
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    project={project} 
                    key={`${project.name}-${idx}`}
                />
            })}
        </div>    
    )
}

export default Projects;