import React from 'react';
import Modal from 'react-modal';
import { CreateCounter } from './index';
import { ImageListType } from 'react-images-uploading';
import ImageUpload from '../ImageUpload';

interface AddCounterModalProps {
    isOpen: boolean
    closeModal: () => void;
    confirmCreateCounter: ({ counter }: { counter: CreateCounter}) => void;
}

const customStyles = {
    content: {
      borderRadius: '0',
      border: 'none',
      background: 'rgb(219 39 119)',
      width: '100%',
      height: '100%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const AddCounterModal: React.FC<AddCounterModalProps> = ({ isOpen, closeModal, confirmCreateCounter }) => {
    const [counter, setCounter] = React.useState<CreateCounter>({ maxCycles: 1, cycle: 0, name: '', image: ''});

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCounter({...counter, name: event.currentTarget.value})
    }

    const handleChangeMaxCycles = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCounter({...counter, maxCycles: parseInt(event.currentTarget.value)})
    }

    const handleChangeCycles = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCounter({...counter, cycle: parseInt(event.currentTarget.value)})
    }


    const onCloseModal = () => {
        setCounter({ maxCycles: 1, cycle: 0, name: '', image: ''});
        closeModal();
    }

    const onConfirm = () => {
        if (counter.maxCycles >= 1 && counter.name.length >= 1) {
            confirmCreateCounter({counter: 
                { 
                    maxCycles: counter.maxCycles,
                    name: counter.name,
                    cycle: counter.cycle
                }
            });
            setCounter({ maxCycles: 1, cycle: 0, name: '', image: ''});
            closeModal();
        }
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onCloseModal} style={customStyles} ariaHideApp={true}>
            <div className='w-full h-full text-white flex flex-col justify-between'>
                <div>
                    <h1 className='text-2xl font-medium'>Læg til en ny tæller</h1>
                    
                    <div className='my-2'>
                        <label htmlFor="counterName" className="block mb-2 text-lg font-medium text-white">*Navn:</label>
                        <input onChange={handleChangeName} value={counter?.name} type="text" id="name" className="text-pink-600 text-md focus:outline-none text-sm font-medium block w-full p-2.5 placeholder-pink-400" placeholder="Navn.." required />
                    </div>
                    <div className='my-2'>
                        <label htmlFor="counterMaxCycles" className="block mb-2 text-lg font-medium text-white">*Maks antal i tælleren:</label>
                        <input onChange={handleChangeMaxCycles} min={1} value={counter?.maxCycles} type="number" id="name" className="text-pink-600 text-md focus:outline-none text-sm font-medium block w-full p-2.5 placeholder-pink-400" placeholder="Beskrivelse.." required />
                    </div>
                    <div className='my-2'>
                        <label htmlFor="cycle" className="block mb-2 text-lg font-medium text-white">(?) Start Værdi:</label>
                        <input onChange={handleChangeCycles} min={0} value={counter?.cycle} type="number" id="name" className="text-pink-600 text-md focus:outline-none text-sm font-medium block w-full p-2.5 placeholder-pink-400" placeholder="Beskrivelse.." required />
                    </div>

                </div>
                <div className='flex flex-row justify-between mb-6'>
                    <button onClick={onConfirm} className='bg-pink-500 px-4 py-2 rounded-md'>Bekreft</button>
                    <button onClick={onCloseModal} className='px-4 py-2'>Luk</button>
                </div>

            </div>
        </Modal>
    )
}

export default AddCounterModal;