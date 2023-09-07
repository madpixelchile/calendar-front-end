import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onEditEvent, onLoadEvents, onSetActiveEvent } from "../store/slices/calendarSlice";
import { calendarApi } from "../api";
import { convertEventsToDateEvent } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const { user } = useSelector((state) => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {

        try {

            if (calendarEvent.id) {
                //Editando
                // startEditingEvent( calendarEvent );
                const { data } = await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onEditEvent({ ...calendarEvent }))
                return;
            }

            //Creando
            // console.log('creando');
            const { data } = await calendarApi.post('/events/add', calendarEvent);
            // console.log('DATA:', data.event.id);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }))

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data?.msg, 'error');
        }

    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events');
            // console.log('DATA EVENTS ORIGINAL:', data);

            const events = convertEventsToDateEvent(data.events);
            // console.log(events);
            dispatch(onLoadEvents(events))

            // console.log('EVENTS:', events);


        } catch (error) {
            console.log(error);
        }
    }

    const startDeleting = async (calendarEvent) => {
        try{
            if (calendarEvent.id) {

                await calendarApi.delete(`/events/delete/${ calendarEvent.id }`);
                dispatch(onDeleteEvent({ ...calendarEvent }));
            }
        }catch(error){
            console.log(error);
        }
    }

    // const startEditingEvent = async( calendarEvent )=>{
    //     dispatch( onEditEvent({ ...calendarEvent }) )
    // }

    return {
        //Properties
        events,
        activeEvent,
        //Methods
        startLoadingEvents,
        setActiveEvent,
        startSavingEvent,
        startDeleting,
    }
}
