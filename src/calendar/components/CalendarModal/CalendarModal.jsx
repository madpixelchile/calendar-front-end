import { useEffect, useMemo, useState } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import Modal from 'react-modal';
import "react-datepicker/dist/react-datepicker.css";
import '../../../assets/styles/sass/modal.scss';
import { addHours, differenceInSeconds } from 'date-fns';
import { es } from 'date-fns/locale';
import Swal from 'sweetalert2';
import { useUiStore } from '../../../hooks/useUiStore';
import { useCalendarStore } from '../../../hooks';

registerLocale('es', es);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');
export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();

    const { activeEvent, startSavingEvent, startDeleting } = useCalendarStore();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: 'Juan',
        notes: 'Escudero',
        start: new Date(),
        end: addHours(new Date(), 2)
    });

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return (formValues.title.length > 0) ? 'is-valid' : 'is-invalid'

    }, [formValues.title, formSubmitted])

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const [startDate, setStartDate] = useState(new Date());

    const onDateChange = (event, changin) => {
        setFormValues({
            ...formValues,
            [changin]: event
        });
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function handleCloseModal() {
        closeDateModal();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const difference = differenceInSeconds(formValues.end, formValues.start);

        if (isNaN(difference) || difference < 0) {
            Swal.fire('Fechas incorrectas', 'Vuelve a intentarlo', 'error');
            // console.log('Error en fechas');
            return;
        }

        if (formValues.title.length <= 0) return;

        setFormSubmitted(true);

        // console.log(difference);
        // console.log(formValues);

        //Guardamos los cambios del estado
        await startSavingEvent(formValues);
        closeDateModal();

    }

    const handleDelete = async () => {
        await startDeleting(formValues);
        closeDateModal();
    }

    useEffect(() => {
        if (activeEvent !== null) {
            // console.log('hola', activeEvent);
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent]);

    return (
        <>
            <Modal
                isOpen={isDateModalOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={handleCloseModal}
                style={customStyles}
                contentLabel="Example Modal"
                className={'modal'}
                overlayClassName={'modal-fondo'}
                closeTimeoutMS={200}
            >

                <button onClick={handleCloseModal}>close</button>

                <h1> Nuevo evento </h1>
                <hr />
                <form className="container" onSubmit={handleSubmit}>

                    <div className="form-group mb-2">
                        <label>Fecha y hora inicio</label>
                        <DatePicker
                            selected={formValues.start}
                            onChange={(event) => onDateChange(event, 'start')}
                            className={'form-control'}
                            dateFormat={'Pp'}
                            showTimeSelect
                            locale={'es'}
                        />
                        {/* <input className="form-control" placeholder="Fecha inicio" /> */}
                    </div>

                    <div className="form-group mb-2">
                        <label>Fecha y hora fin</label>
                        <DatePicker
                            minDate={formValues.start}
                            selected={formValues.end}
                            onChange={(event) => onDateChange(event, 'end')}
                            className={'form-control'}
                            dateFormat={'Pp'}
                            showTimeSelect
                            locale={'es'}
                        />
                        {/* <input className="form-control" placeholder="Fecha inicio" /> */}
                    </div>

                    <hr />
                    <div className="form-group mb-2">
                        <label>Titulo y notas</label>
                        <input
                            type="text"
                            className={`form-control ${titleClass}`}
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                            value={formValues.title}
                            onChange={handleChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                    </div>

                    <div className="form-group mb-2">
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            value={formValues.notes}
                            onChange={handleChange}
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>

                    {
                        formValues.id
                            ?
                            <button style={{ marginLeft: '10px' }} className='btn btn-danger' onClick={ handleDelete }>
                                <i className='fas fa-trash-alt'></i>
                                &nbsp;
                                Borrar
                            </button>
                            :
                            ''
                    }

                </form>

            </Modal>
        </>
    )
}

