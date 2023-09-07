
export const CalendarEventBox = ( { event } ) => {

    // console.log( event );
    const { title, user, start } = event;

    return (
        <>  
            <span>{ title }</span>
            <span>{ user.name }</span>
        </>
    )
}