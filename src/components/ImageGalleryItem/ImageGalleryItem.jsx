import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image }) => {
    const [shownModal, setShownModal] = useState(false)

    const onModal = () => {
        setShownModal(prevState => !prevState);
    };

    const { id, webformatURL, user } = image;
    return <li className={css.ImageGalleryItem}>
        <img
            className={css.ImageGalleryItemImage}
            id={id}
            src={webformatURL}
            alt={user}
            onClick={onModal} />
        {shownModal && <Modal onClose={onModal} image={image} />}
    </li>
};

ImageGalleryItem.propTypes = {
    item: PropTypes.object,
};