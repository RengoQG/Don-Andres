import React, { useState,useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


const ContactSection = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessageShown, setErrorMessageShown] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!errorMessageShown && isSubmitting) {
          setIsSubmitting(false);
        }
      }, [errorMessageShown, isSubmitting]);

    const handleSubmit = async (e) => {

        if (isSubmitting || errorMessageShown) {
            return;
          }

        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch('http://localhost:6001/contactenos/contactenos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.error);
                setErrorMessageShown(true);
            } else {
                toast.success("Mensaje envíado correctamente 😊")
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Tu JSX existente */}

            <section className="section section-sm section-last bg-default text-left form-contact" id="contacts">
                <ToastContainer
                    onClose={() => setErrorMessageShown(false)}
                    onExited={() => setErrorMessageShown(false)}
                />                <div className="ml-3">
                    <article className="title-classic">
                        <div className="title-classic-title">
                            <h3>Contactanos</h3>
                        </div>
                        <div className="title-classic-text">
                            <p></p>
                        </div>
                    </article>
                    <form className="rd-form rd-form-variant-2 rd-mailform" onSubmit={handleSubmit}>
                        {/* Tu formulario existente */}
                        {/* Agrega el evento onChange a cada input para actualizar el estado */}
                        <div className="row row-14 gutters-14">
                            {/* Input para nombre */}
                            <div className="col-md-4">
                                <div className="form-wrap">
                                    <input className="form-input" id="contact-your-name-2" type="text" name="name" value={formData.name} onChange={handleChange} />
                                    <label className="form-label" htmlFor="contact-your-name-2">Tu nombre</label>
                                </div>
                            </div>
                            {/* Input para correo */}
                            <div className="col-md-4">
                                <div className="form-wrap">
                                    <input className="form-input" id="contact-email-2" type="email" name="email" value={formData.email} onChange={handleChange} />
                                    <label className="form-label" htmlFor="contact-email-2">Correo</label>
                                </div>
                            </div>
                            {/* Input para celular */}
                            <div className="col-md-4">
                                <div className="form-wrap">
                                    <input className="form-input" id="contact-phone-2" type="text" name="phone" value={formData.phone} onChange={handleChange} />
                                    <label className="form-label" htmlFor="contact-phone-2">Celular</label>
                                </div>
                            </div>
                            {/* Textarea para mensaje */}
                            <div className="col-12">
                                <div className="form-wrap">
                                    <label className="form-label" htmlFor="contact-message-2">Mensaje</label>
                                    <textarea className="form-input textarea-lg" id="contact-message-2" name="message" value={formData.message} onChange={handleChange}></textarea>
                                </div>
                            </div>
                        </div>
                        {/* Botón de envío */}
                        <button className='mt-3 btn-contact btn-info' type="submit" disabled={loading}>
                            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Enviar'}
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default ContactSection;
