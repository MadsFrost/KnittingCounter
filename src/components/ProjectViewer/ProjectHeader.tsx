import React from 'react';
import { KnitProject } from '../../types';
interface ProjectHeaderProps {
    project: KnitProject | undefined
}
const ProjectHeader: React.FC<ProjectHeaderProps>= ({ project }) => {
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div 
            style={{ backgroundImage: `url('${project?.image}')`}} 
            className='w-full border-8 border-pink-200 bg-cover h-[400px] rounded-lg'>
            </div>
        </div>
    )
}

export default ProjectHeader;