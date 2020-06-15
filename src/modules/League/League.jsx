import React, { useEffect, useState } from 'react';
import './League.scss';
import { Button } from '../../components/Button/Button';
import { Icon } from '../../components/Icon/Icon';
import { LeagueForm } from '../Forms/LeagueForm/LeagueForm';
import { useBoolean } from '../../utils/customHooks/UseBoolean';
import { Modal } from '../../components/Modal/Modal';
import { ConfirmModal } from '../../components/Modal/ConfirmModal';
import { useParams } from 'react-router-dom';
import { leagueRequest, editLeagueRequest, deleteLeagueRequest } from '../../api/repository';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export function League() {
	const [isEditLeagueOpen, toggleEditLeagueOpen] = useBoolean();
	const [isDeleteLeagueOpen, toggleDeleteLeagueOpen] = useBoolean();
	const [league, setLeague] = useState({});
	const token = useSelector((state) => state.session.token);
	let params = useParams();
	const history = useHistory();
	const [activeCompetitors, setActiveCompetitors] = useState(true);

	useEffect(() => {
		leagueRequest(token, params.id)
			.then((response) => {
				if (response.error) {
					console.log(response.error);
				} else {
					setLeague(response);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const editLeague = (league) => {
		editLeagueRequest(token, { ...league, id: params.id })
			.then((response) => {
				if (response.error) {
					console.log(response.error);
				} else {
					setLeague(league);
					toggleEditLeagueOpen();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const deleteLeague = (e) => {
		deleteLeagueRequest(token, league.id)
			.then((response) => {
				if (response.error) {
					console.log(response.error);
				} else {
					history.push('/');
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<div className="leagues-intro">
				<h1>{league.name}</h1>

				<div className="actions">
					<Button type="action" onClick={toggleEditLeagueOpen}>
						<i className="fa fa-pencil" aria-hidden="true"></i>
					</Button>
					<Button type="action" onClick={toggleDeleteLeagueOpen}>
						<i className="fa fa-trash" aria-hidden="true"></i>
					</Button>
				</div>
			</div>

			<div className="league-info">
				<div className="info-col">
					<div className="info-row">
						<label>Type</label>
						{league.type === 'double' && league.gender === 'male' && (
							<div>
								<Icon iconClass="fa fa-male" title={`Surface: ${league.surface}`} />
								<Icon iconClass="fa fa-male" title={`Surface: ${league.surface}`} />
								Men double
							</div>
						)}

						{league.type === 'double' && league.gender === 'female' && (
							<div>
								<Icon iconClass="fa fa-female" title={`Surface: ${league.surface}`} />
								<Icon iconClass="fa fa-female" title={`Surface: ${league.surface}`} />
								Women double
							</div>
						)}

						{league.type === 'double' && league.gender === 'mix' && (
							<div>
								<Icon iconClass="fa fa-female" title={`Surface: ${league.surface}`} />
								<Icon iconClass="fa fa-male" title={`Surface: ${league.surface}`} />
								Mix double
							</div>
						)}

						{league.type === 'single' && league.gender === 'male' && (
							<div>
								<Icon iconClass="fa fa-male" title={`Surface: ${league.surface}`} />
								Man single
							</div>
						)}

						{league.type === 'single' && league.gender === 'female' && (
							<div>
								<Icon iconClass="fa fa-female" title={`Surface: ${league.surface}`} />
								Woman single
							</div>
						)}
					</div>

					<div className="info-row">
						<label>Start date</label>
						<time>{league.startDate}</time>
					</div>

					<div className="info-row">
						<label>Surface</label>
						<time>{league.surface}</time>
					</div>
				</div>
				<div className="info-col">
					<div className="info-row">
						<label>Club name</label>
						<time>{league.clubName}</time>
					</div>

					<div className="info-row">
						<label>Address</label>
						<time>{league.address}</time>
					</div>

					<div className="info-row">
						<label>Telephone</label>
						<time>{league.tel}</time>
					</div>
				</div>
			</div>

			<div>
				<div className="tabs">
					<div
						className={`${activeCompetitors ? 'active ' : ''}tab`}
						onClick={() => setActiveCompetitors(true)}
					>
						Competitors
					</div>
					<div
						className={`${!activeCompetitors ? 'active ' : ''}tab`}
						onClick={() => setActiveCompetitors(false)}
					>
						Events
					</div>
				</div>
				<div className={`${activeCompetitors ? 'active ' : ''}tab-content`}>
					<Button type="action">
						<i className="fa fa-plus" aria-hidden="true"></i>
					</Button>
					lista sudionika
				</div>
				<div className={`${!activeCompetitors ? 'active ' : ''}tab-content`}>
					<Button type="action">
						<i className="fa fa-plus" aria-hidden="true"></i>
					</Button>
					lista evenata
				</div>
			</div>

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
							<LeagueForm title="Save changes" onSubmit={editLeague} league={league} />
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
