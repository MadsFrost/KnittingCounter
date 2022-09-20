import React from 'react';
import { useDispatch } from 'react-redux'
import { addKnitProject } from '../../features/KnitProject';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { KnitProject } from '../../types';
import { ImageListType } from 'react-images-uploading';
import ImageUpload from '../ImageUpload';
/*
id: number;
    name: string;
    date: Date;
    knitCounters: KnitCounter[];
    image?: string;
    description?: string;
*/
interface NewProjectState {
    name: string;
    description?: string;
    image?: string;
}
const AddProject = () => {
    const dispatch = useDispatch();
    const projects = useSelector((state: RootState) => state.knitProject.projects);
    const [internalProjects, setProjects] = React.useState<KnitProject[]>(projects);
    const [active, setActive] = React.useState<boolean>();
    const [values, setValues] = React.useState<NewProjectState>({ name: '', description: '', image: ''});
    const [image, setImage] = React.useState<ImageListType>([]);

    const handleActive = () => {
        setActive(!active);
    }

    const onChangeImage = (image: ImageListType) => {
        if (image) {
            setImage(image);
        };
    }

    const handleAddProject = () => {
        const newProject = {
            date: new Date().toDateString(),
            id: internalProjects.length + 1,
            knitCounters: [],
            name: values.name,
            description: values.description ?? 'Ingen beskrivelse.',
            image: values?.image?.length !== 0 ? values.image : 'https://previews.123rf.com/images/rashevskiy/rashevskiy1505/rashevskiy150500260/41212788-group-of-pink-woolen-yarn-and-knitting-needles-on-white-wooden-background.jpg'

        };
        dispatch(addKnitProject(newProject));
        setProjects([...internalProjects, newProject]);
        handleActive();
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, name: event.currentTarget.value})
    }

    const handleChangeDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, description: event.currentTarget.value})
    }

    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, image: event.currentTarget.value})
    }

    React.useEffect(() => {
        setProjects(projects);
    }, [projects]);

    React.useEffect(() => {
        image && image[0]?.dataURL && setValues({...values, image: image[0].dataURL});
    }, [image])

    React.useEffect(() => {
        if (!active) {
            setImage([]);
            setValues({name: '', description: '', image: ''})
        }
    }, [active])
    return (
        <div>
            {!active && <button 
                className='w-full h-full bg-pink-400 hover:bg-pink-500 text-white rounded font-medium text-lg'
                onClick={handleActive}>
                    Nyt projekt?
            </button>}
            {active && 
            <div className='text-white rounded-sm md:max-w-[500px]'>
                <div className='my-2'>
                    <label htmlFor="projectName" className="block mb-2 text-lg font-medium text-white">*Navn:</label>
                    <input onChange={handleChangeName} value={values?.name} type="text" id="name" className="text-pink-600 text-md focus:outline-none text-sm font-medium block w-full p-2.5 placeholder-pink-400" placeholder="Navn.." required />
                </div>
                <div className='my-2'>
                    <label htmlFor="projectDescription" className="block mb-2 text-lg font-medium text-white">Beskrivelse:</label>
                    <input onChange={handleChangeDesc} value={values?.description} type="text" id="name" className="text-pink-600 text-md focus:outline-none text-sm font-medium block w-full p-2.5 placeholder-pink-400" placeholder="Beskrivelse.." required />
                </div>
                {!image[0]?.dataURL ? <ImageUpload image={image} onChange={onChangeImage}/> : <img src={image[0].dataURL} />}
                <div>
                    <button 
                        className='mr-4 my-2 bg-pink-500 hover:bg-pink-600 text-white py-2 px-8 rounded font-medium text-lg'
                        onClick={handleAddProject}>
                            Opret
                    </button>
                    <button 
                        className='bg-pink-700 hover:bg-pink-800 text-white py-2 px-8 rounded font-medium text-lg'
                        onClick={handleActive}>
                            Aflys
                    </button>
                </div>
            </div>
            }
        </div>
    )
}

export default AddProject;