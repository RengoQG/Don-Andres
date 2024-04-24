import React from 'react';

const ContactSection = () => {
    return (
        <>
            {/* Sección de información de contacto */}
            <section className="section section-sm bg-default">
                <div className="m-3">
                    <div className="row row-30 justify-content-center">
                        <div className="col-sm-8 col-md-6 col-lg-4">
                            <article className="box-contacts">
                                <div className="box-contacts-body">
                                    <div className="box-contacts-icon fl-bigmug-line-cellphone55"></div>
                                    <div className="box-contacts-decor"></div>
                                    <p className="box-contacts-link"><a href="tel:#">+1 323-913-4688</a></p>
                                    <p className="box-contacts-link"><a href="tel:#">+1 323-888-4554</a></p>
                                </div>
                            </article>
                        </div>
                        <div className="col-sm-8 col-md-6 col-lg-4">
                            <article className="box-contacts">
                                <div className="box-contacts-body">
                                    <div className="box-contacts-icon fl-bigmug-line-up104"></div>
                                    <div className="box-contacts-decor"></div>
                                    <p className="box-contacts-link"><a href="#">4730  calle cristal, Los Angeles, CA 90027</a></p>
                                </div>
                            </article>
                        </div>
                        <div className="col-sm-8 col-md-6 col-lg-4">
                            <article className="box-contacts">
                                <div className="box-contacts-body">
                                    <div className="box-contacts-icon fl-bigmug-line-chat55"></div>
                                    <div className="box-contacts-decor"></div>
                                    <p className="box-contacts-link"><a href="mailto:#">johangrisales@gmail.com</a></p>
                                    <p className="box-contacts-link"><a href="mailto:#">johangrisales@gmail.com2</a></p>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section section-sm section-last bg-default text-left form-contact" id="contacts">
                <div className="ml-3">
                    <article className="title-classic">
                        <div className="title-classic-title">
                            <h3>Contactanos</h3>
                        </div>
                        <div className="title-classic-text">
                            <p></p>
                        </div>
                    </article>
                    <form className="rd-form rd-form-variant-2 rd-mailform" method="post" >
                        <div className="row row-14 gutters-14">
                            <div className="col-md-4">
                                <div className="form-wrap">
                                    <input className="form-input" id="contact-your-name-2" type="text" name="name" />
                                    <label className="form-label" htmlFor="contact-your-name-2">Tu nombre</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-wrap">
                                    <input className="form-input" id="contact-email-2" type="email" name="email" />
                                    <label className="form-label" htmlFor="contact-email-2">Correo</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-wrap">
                                    <input className="form-input" id="contact-phone-2" type="text" name="phone"  />
                                    <label className="form-label" htmlFor="contact-phone-2">Celular</label>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-wrap">
                                    <label className="form-label" htmlFor="contact-message-2">Mensaje</label>
                                    <textarea className="form-input textarea-lg" id="contact-message-2" name="message" ></textarea>
                                </div>
                            </div>
                        </div>
                        {/* <button className="button button-primary button-pipaluk" type="submit">Enviar mensaje</button> */}
                        <button className='mt-3 btn btn-info'>Enviar</button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default ContactSection;
