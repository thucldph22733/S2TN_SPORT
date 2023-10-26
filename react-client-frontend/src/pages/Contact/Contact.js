import { Fragment } from 'react';
import './Contact.css';

// Icon
import { PiMapPinLine } from 'react-icons/pi';
import { SiMinutemailer } from 'react-icons/si';
import { AiOutlinePhone, AiOutlineMail, AiOutlineFieldTime } from 'react-icons/ai';
function Contact() {
    return (
        <Fragment>
            <div className="map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5579.432544361822!2d105.73108875762416!3d21.03970654515736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345550b525aa03%3A0x3fdefc40f69a023a!2zQ2FvIMSR4bqzbmcgRlBUIFBo4buRIFRy4buLbmggVsSDbiBCw7QgLCBQaMaw4budbmcgUGjGsMahbmcgQ2FuaCAsIHF14bqtbiBU4burIExpw6pt!5e0!3m2!1svi!2s!4v1697621128802!5m2!1svi!2s"
                    allowFullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <section className="contact spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="contact__text">
                                <div className="section-title">
                                    <span>Thông tin</span>
                                    <h6>Cửa hàng S2TN SPORT</h6>
                                    <p>Hân hạnh được phục vụ quý khách!</p>
                                </div>
                                <p>
                                    <PiMapPinLine className="contact_icon" />: Tòa nhà FPT Polytechnic, 13 phố Trịnh Văn
                                    Bô, phường Phương Canh, quận Nam Từ Liêm, TP Hà Nội
                                </p>
                                <p>
                                    <AiOutlinePhone className="contact_icon" />: 024 7300 1955
                                </p>
                                <p>
                                    <AiOutlineMail className="contact_icon" />: caodang@fpt.edu.vn
                                </p>
                                <p>
                                    <AiOutlineFieldTime className="contact_icon" />: 8h sáng đến 8h tối từ thứ 2 đến thứ
                                    7, Chủ Nhật shop nghỉ.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="contact__form">
                                <form action="#">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <input type="text" placeholder="Họ và tên" />
                                        </div>
                                        <div className="col-lg-6">
                                            <input type="text" placeholder="Email" />
                                        </div>
                                        <div className="col-lg-12">
                                            <textarea placeholder="Nội dung"></textarea>
                                            <button type="submit" className="site-btn">
                                                <SiMinutemailer className="contact_icon_btn" /> Gửi thông báo
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default Contact;
