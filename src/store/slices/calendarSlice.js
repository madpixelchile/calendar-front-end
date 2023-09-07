import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";


// const tempEvent = {
//     id: new Date().getTime(),
//     title: 'Cumpleaños Juan',
//     notes: 'Hay que comprar el regalo',
//     start: new Date(),
//     end: addHours( new Date(), 2),
//     bgColor: '#fafafa',
//     user: {
//         id: '123',
//         name: 'Juan'
//     }
// }

export const calendarSlice = createSlice({

    name: 'calendar',
    initialState: {
        // events: [ tempEvent ],
        isLoadingEvents: true,
        events: [],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {

            state.events.push(payload);
            state.activeEvent = null;
        },
        onEditEvent: (state, { payload }) => {
            //Primera forma de hacerlo con findIndex
            // const selectedEvent = state.events.findIndex(( item )=> item.id === payload.id );
            // state.events[ selectedEvent ] = payload;

            //Segunda forma de hacerlo, es recorriendo y reemplazando al encontrar
            state.events = state.events.map((item) => {
                if (item.id === payload.id) {
                    return payload
                }
                return item;
            })
        },
        onDeleteEvent: (state) => {
            state.events = state.events.filter((item) => {
                return item.id !== state.activeEvent.id
            })
            state.activeEvent = null;
        },
        onLoadEvents: (state, { payload }) => {
            state.isLoadingEvents = false;
            payload.forEach(item => {
                const exist = state.events.some(dbEvent => dbEvent.id === item.id);
                if (!exist) {
                    state.events.push(item);
                }
            });
            // state.events = payload;
        },
        onLogoutCalendar: (state) => {
            state.isLoadingEvents = true;
            state.events = [];
            state.activeEvent = null;
        }
    }

})

export const {
    onSetActiveEvent,
    onAddNewEvent,
    onEditEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar
} = calendarSlice.actions;