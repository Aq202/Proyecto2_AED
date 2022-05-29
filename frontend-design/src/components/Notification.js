import React from 'react';
import NotificationBody from './NotificationBody';
import PopUp from './PopUp';
import PropTypes from 'prop-types';
import '../styles/notification.css';

function Notification({ close, image, alt, title, text }) {
    return (
        <PopUp close={close} maxWidth={370}>
            <NotificationBody image={image} alt={alt} title={title} text={text} />
        </PopUp>
    );
}

Notification.propTypes = {
    close: PropTypes.func.isRequired
}


export default Notification;