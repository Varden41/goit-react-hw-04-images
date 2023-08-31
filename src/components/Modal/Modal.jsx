import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalBox } from './Modal.styled';

function Modal({ photo, onCloseModal }) {
  const handleClose = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const clickEscape = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    document.addEventListener('keydown', clickEscape);
    return () => {
      document.removeEventListener('keydown', clickEscape);
    };
  }, [onCloseModal]);

  return createPortal(
    <Overlay onClick={handleClose}>
      <ModalBox>
        <img src={photo.largeImageURL} alt={photo.tags} />
      </ModalBox>
    </Overlay>,
    document.body
  );
}

Modal.propTypes = {
  photo: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
export default Modal;
