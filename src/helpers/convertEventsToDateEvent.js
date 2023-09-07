import { parseISO } from "date-fns";


export const convertEventsToDateEvent = ( events = [] )=>{

    return events.map(( item )=>{

        item.start = parseISO( item.start );
        item.end = parseISO( item.end );

        return item;
    })

}