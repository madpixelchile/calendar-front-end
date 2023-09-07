
import { Calendar } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { NavBar } from "../../components/NavBar/NavBar"
import { getMessages, localizer } from '../../helpers';
import { CalendarEventBox } from '../components/CalendarEventBox/CalendarEventBox';
import { useEffect, useState } from 'react';
import { CalendarModal } from '../components/CalendarModal/CalendarModal';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';
import { FabAddNew } from '../components/FabAddNew/FabAddNew';

// const events = [{
//     title: 'Cumpleaños Juan',
//     notes: 'Hay que comprar el regalo',
//     start: new Date(),
//     end: addHours( new Date(), 2),
//     bgColor: '#fafafa',
//     user: {
//         _id: '123',
//         name: 'Juan'
//     }
// }]

export const CalendarPage = () => {

    const { openDateModal } = useUiStore();
    const { user } = useAuthStore(); 
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

    const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week' );

    const eventStyleGetter = ( event, start, end, isSelected )=>{
        // console.log({ event, start, end, isSelected  });
        // console.log(event);
        const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid) 

        const style = {
            backgroundColor : isMyEvent ? "#51afff" : '#464660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        };

    }

    const onDoubleClick = ( e )=>{
        console.log({ doubleClick: e });
        openDateModal()
    }

    const onSelect = ( e )=>{
        // console.log({ click: e });
        setActiveEvent( e );
    }

    const onViewChange = ( e )=>{
        localStorage.setItem('lastView', e);
        setLastView(e);
        // console.log({ onViewChange: e });
    }

    useEffect(()=>{
        startLoadingEvents();
    },[])

    return (
        <>
            <NavBar />
            <Calendar
                culture={'es'}
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc( 100vh - 80px )' }}
                messages={ getMessages() }
                eventPropGetter={ eventStyleGetter }
                components={{
                    event: CalendarEventBox
                }}
                defaultView={'month'}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChange }
            />
            <CalendarModal/>

            <FabAddNew/>
        </>
    )
}