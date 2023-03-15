import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from 'components/Modal/Modal.module.css';

const ModalRoot = document.querySelector('#ModalRoot');

export const Modal = ({ onClose, image }) => {
    useEffect(() => {
        const keyDown = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', keyDown);

        return () => {
            window.removeEventListener('keydown', keyDown);
        }
    }, [onClose])

    const onOverlayClose = e => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };

    const { largeImageURL } = image;
    return createPortal(
        <div onClick={onOverlayClose} className={css.Overlay}>
            <div className={css.Modal}>
                <img src={largeImageURL} alt="img" />
            </div>
        </div>,
        ModalRoot
    );
}

Modal.propTypes = {
    onClose: PropTypes.func,
    image: PropTypes.object,
};
