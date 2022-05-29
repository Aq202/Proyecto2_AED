import React from 'react';

function NotificationBody({ image, alt = "", title, text }) {
    return (
        <div className="notification">
            <img src={image} alt={alt} />
            {title ? <h2>{title}</h2> : null}
            {text ? <p>{text}</p> : null}
        </div>
    );
}

export default NotificationBody;