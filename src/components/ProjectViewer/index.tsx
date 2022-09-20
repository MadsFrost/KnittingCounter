import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { KnitProject, KnitCounter } from '../../types';
import { addKnitCounterToProject, updateKnitCounterInProject, deleteKnitCounterFromProject } from '../../features/KnitProject';
import CounterWrapper from './CounterWrapper';
import Counter from './Counter';
import AddCounterModal from './AddCounterModal';

export type CreateCounter = {
    maxCycles: number;
    cycle: number;
    name: string;
    image?: string;
}
const ProjectViewer = () => {
    const [project, setProject] = React.useState<KnitProject>()
    const [modalOpen, setModalOpen] = React.useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allProjects = useSelector((state: RootState) => state.knitProject.projects);

    React.useEffect(() => {
        setProject(allProjects.find((project) => String(project.id) === params.id));
    }, [allProjects])

    const goToProjects = () => {
        navigate('/')
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }
    
    const onUpdateKnitCounter = (knitCounter: KnitCounter) => {
        if (project !== undefined) {
            dispatch(updateKnitCounterInProject({ knitProject: project, knitCounter: knitCounter }))
        }
    }
    const confirmCreateCounter = ({ counter }: { counter: CreateCounter }) => {
        const { cycle, maxCycles, name, image } = counter;
        project !== undefined && dispatch(addKnitCounterToProject({
            knitCounter: {
                cycle: cycle,
                id: project?.knitCounters?.length + 1,
                maxCycle: maxCycles,
                minCycle: 0,
                name: name,
                image: image
            },
            knitProject: project
        }))
    }

    const onDelete = (counter: KnitCounter) => {
        project !== undefined && dispatch(deleteKnitCounterFromProject({
            knitCounter: counter,
            knitProject: project
        }))
    }
    return (
        <div className='bg-pink-300 w-full h-full flex flex-col'>
            <AddCounterModal confirmCreateCounter={confirmCreateCounter} closeModal={toggleModal} isOpen={modalOpen}/>
            <span className='text-white font-medium text-3xl'>Projekt: {project?.name}</span>
            <span className='text-white'>{project?.description}</span>
            <div className='w-full flex flex-row'>
                <button 
                    className='w-[200px] my-2 px-2 py-1 bg-pink-400 hover:bg-pink-500 text-white rounded font-medium text-lg'
                    onClick={goToProjects}>
                        Gå tilbage
                </button>
                <button onClick={toggleModal} className=
                'w-[200px] mx-2 my-2 px-2 py-1 bg-pink-500 hover:bg-pink-600 text-white rounded font-medium text-lg'>
                    Ny tæller
                </button>
            </div>
            <CounterWrapper>
                {project?.knitCounters.map((counter, idx) => {
                return <Counter onDelete={onDelete} onUpdate={onUpdateKnitCounter} knitCounter={counter} key={`${counter.id}-idx-${idx}`}/>
                })}
            </CounterWrapper>

        </div>
    );
}

export default ProjectViewer;