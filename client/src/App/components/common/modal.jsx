import React from 'react'
import PropTypes from 'prop-types'

const Modal = ({modalTitle, desc, buttonLabel, onCloseClick, onAcceptClick}) => {
    const modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    }

    return (
        <div className="modal" style={modalStyle} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{modalTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onCloseClick}/>
                    </div>
                    <div className="modal-body">
                        <p>{desc}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onCloseClick}>Close</button>
                        <button type="button" className="btn btn-success" onClick={onAcceptClick}>{buttonLabel}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    modalTitle: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onAcceptClick: PropTypes.func.isRequired
}

export default Modal
