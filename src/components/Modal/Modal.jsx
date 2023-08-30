import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalBox } from './Modal.styled';

function Modal({ photo, onCloseModal }) {
  const modalRef = useRef();

  useEffect(() => {
    modalRef.current.focus();
  }, []);

  const handleClose = e => {
    if (
      (e.currentTarget === e.target && e.type === 'click') ||
      e.code === 'Escape'
    ) {
      onCloseModal();
    }
  };

  return createPortal(
    <Overlay
      onClick={handleClose}
      onKeyDown={handleClose}
      ref={modalRef}
      tabIndex="-1"
    >
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
