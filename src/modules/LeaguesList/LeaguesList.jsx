import React, { useEffect, useState } from 'react';
import { LeagueLine } from '../../components/LeagueLine/LeagueLine';
import './LeaguesList.scss';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { useBoolean } from '../../utils/customHooks/UseBoolean';
import { LeagueForm } from '../../modules/Forms/LeagueForm/LeagueForm';
import { useSelector } from 'react-redux';
import { leaguesRequest, addLeagueRequest } from "../../api/repository"

export function LeaguesList() {
	const [isAddLeagueOpen, toggleAddLeagueOpen] = useBoolean();
	const token = useSelector((state) => state.session.token);
	const [leagues, setLeagues] = useState({})

	useEffect(() => {
		leaguesRequest({
			token: token
		})
			.then((response) => {
				if (response.error) {
					console.log(response.error)
				} else {
					setLeagues(response)
					console.log(response)
				}
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(toggleAddLeagueOpen())
	}, []);

	const addLeague = (league) => {
		addLeagueRequest(league)
        .then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log(error)
		})
	}

	return (
		<>
			<div className="leagues-intro">
				<h1>Leagues</h1>
				<Button onClick={toggleAddLeagueOpen}>Add league</Button>
			</div>

			{leagues.length > 0 && (
				<ul>
					{leagues.map((league) => (
						<li key={league.id} className={`league-line ${league.surface}`}>
							<LeagueLine league={league} />
						</li>
					))}
				</ul>
			)}

			{isAddLeagueOpen && (
				<Modal>
					<div className="modal-content">
						<div className="modal-header">
							<p>Add league</p>
							<button className="close" onClick={toggleAddLeagueOpen}>
								&#10005;
							</button>
						</div>
						<div className="modal-content">
							<LeagueForm title="Add league" onSubmit={addLeague}/>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
}
