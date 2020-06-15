import React from 'react';
import { Modal } from './Modal';

export function ConfirmModal({ title, toggleModal, onClick }) {
	return (
		<Modal>
			<div className="modal-content confirm-modal">
				<div className="modal-header">
					<p>{title}</p>
					<button className="close" onClick={toggleModal}>
						&#10005;
					</button>
				</div>
				<div className="modal-actions">
					<button className="btn btn-default" onClick={onClick}>
						Yes
					</button>
					<button className="btn btn-inverse" onClick={toggleModal}>
						No
					</button>
				</div>
			</div>
		</Modal>
	);
}
