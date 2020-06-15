import React, { useEffect} from 'react';
import './League.scss';
import { Button } from '../../components/Button/Button';
import { Icon } from '../../components/Icon/Icon';
import { LeagueForm } from '../Forms/LeagueForm/LeagueForm';
import { useBoolean } from '../../utils/customHooks/UseBoolean';
import { Modal } from '../../components/Modal/Modal';
import { ConfirmModal } from '../../components/Modal/ConfirmModal';
import { useParams } from "react-router-dom";

export function League(league) {
	const [isEditLeagueOpen, toggleEditLeagueOpen] = useBoolean();
	const [isDeleteLeagueOpen, toggleDeleteLeagueOpen] = useBoolean();
	let params = useParams();

	
	useEffect( () => {
		
	  }, [])

	const deleteLeague = (e) => {};

	return (
		<>	
		{console.log(params)}
			<h2 className="title">{league.name}</h2>

			<div className="actions">
				<Button type="action" onClick={toggleEditLeagueOpen}>
					<i className="fa fa-pencil" aria-hidden="true"></i>
				</Button>
				<Button type="action" onClick={toggleDeleteLeagueOpen}>
					<i className="fa fa-trash" aria-hidden="true"></i>
				</Button>
			</div>

			<time>{league.startDate}</time>

			{league.type === 'double' && league.gender === 'male' && (
				<div>
					<Icon iconClass="fa fa-male" title={`Surface: ${league.surface}`} />
					<Icon iconClass="fa fa-male" title={`Surface: ${league.surface}`} />
				</div>
			)}

			{league.type === 'double' && league.gender === 'female' && (
				<div>
					<Icon iconClass="fa fa-female" title={`Surface: ${league.surface}`} />
					<Icon iconClass="fa fa-female" title={`Surface: ${league.surface}`} />
				</div>
			)}

			{league.type === 'double' && league.gender === 'mix' && (
				<div>
					<Icon iconClass="fa fa-female" title={`Surface: ${league.surface}`} />
					<Icon iconClass="fa fa-male" title={`Surface: ${league.surface}`} />
				</div>
			)}

			{league.type === 'single' && league.gender === 'male' && (
				<div>
					<Icon iconClass="fa fa-male" title={`Surface: ${league.surface}`} />
				</div>
			)}

			{league.type === 'single' && league.gender === 'female' && (
				<div>
					<Icon iconClass="fa fa-female" title={`Surface: ${league.surface}`} />
				</div>
			)}

			<div>{league.clubName}</div>

			{isEditLeagueOpen && (
				<Modal>
					<div className="modal-content">
						<div className="modal-header">
							<p>Edit league</p>
							<button className="close" onClick={toggleEditLeagueOpen}>
								&#10005;
							</button>
						</div>
						<div className="modal-content">
							<LeagueForm title="Save changes" onSubmit={toggleEditLeagueOpen} league={league} />
						</div>
					</div>
				</Modal>
			)}

			{isDeleteLeagueOpen && (
				<ConfirmModal
					title="Are you sure you want to delete this league?"
					toggleModal={toggleDeleteLeagueOpen}
					onClick={deleteLeague}
				/>
			)}
		</>
	);
}
