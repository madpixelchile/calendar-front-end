

import { addHours } from 'date-fns';
import '../../../assets/styles/sass/fabActionButton.scss';
import { useCalendarStore, useUiStore } from '../../../hooks';

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleOpenModal = () => {
        openDateModal();
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Juan'
            }
        })
    }

    return (
        <>
            <button
                onClick={handleOpenModal}
                className={'btn btn-primary fab'}
            >
                <i className='fas fa-plus'></i>
            </button>
        </>
    )
}