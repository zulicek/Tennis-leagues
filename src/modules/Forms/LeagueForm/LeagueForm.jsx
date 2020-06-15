import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import '../Form.scss';
import './LeagueForm.scss';
import { Button } from '../../../components/Button/Button';
import { Input } from '../../../components/Input/Input';
import { Label } from '../../../components/Label/Label';
import { useBoolean } from '../../../utils/customHooks/UseBoolean';
import { isObjectEmpty } from './../../../utils/helpers.js';
import { Loader } from '../../../components/Loader/Loader';
import { validateLeague } from '../../../utils/validations/validateLeague';

export const LeagueForm = ({ title, league = {}, onSubmit }) => {
	const [newLegaue, setLeague] = useState(league);
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useBoolean(false);

	const handleChange = useCallback((field) => (newValue) => setLeague((prev) => ({ ...prev, [field]: newValue })));

	const onAction = (e) => {
		e.preventDefault();
		const errs = validateLeague(newLegaue);
		setErrors(errs);

		if (isObjectEmpty(errs)) {
			onSubmit(newLegaue);
		}
	};

	return (
		<>
			{isLoading && <Loader />}
			<div className="form-wrapper league-form">
				<form onSubmit={onAction}>
					<div className="form-field">
						<Input
							name="Name"
							icon="fa fa-trophy"
							type="text"
							onChange={handleChange('name')}
							value={league && league.name}
							error={errors.name}
						/>
					</div>

					<div className="form-field">
						<Input
							name="Date"
							icon="fa fa-calendar"
							type="date"
							onChange={handleChange('startDate')}
							value={league && league.startDate}
							error={errors.startDate}
						/>
					</div>

					<div className="form-group">
						<Input
							name="Type"
							icon="fa fa-user"
							type="radio"
							value="single"
							onChange={handleChange('type')}
							checked={newLegaue.type === 'single'}
						/>
						<Input
							name="Type"
							icon="fa fa-users"
							type="radio"
							value="double"
							onChange={handleChange('type')}
							checked={newLegaue.type === 'double'}
						/>

						{errors.type && <div className="error">{errors.type}</div>}
					</div>

					<div className="form-group multiple-inputs location">
						<Label icon="fa fa-map-marker" name="Location" />

						<Input
							name="Club name"
							type="text"
							onChange={handleChange('clubName')}
							value={league && league.clubName}
							error={errors.clubName}
						/>

						<Input
							name="Address"
							type="text"
							onChange={handleChange('address')}
							value={league && league.address}
							error={errors.address}
						/>

						<Input
							name="Telephone"
							type="tel"
							onChange={handleChange('tel')}
							value={league && league.tel}
							error={errors.tel}
						/>
					</div>

					<div className="form-group multiple-inputs surface">
						<Label icon="fa fa-area-chart" name="Surface" />

						<div className="form-field">
							<Input
								name="Surface"
								type="radio"
								value="clay"
								onChange={handleChange('surface')}
								checked={newLegaue.surface === 'clay'}
							/>

							<Input
								name="Surface"
								type="radio"
								value="grass"
								onChange={handleChange('surface')}
								checked={newLegaue.surface === 'grass'}
							/>

							<Input
								name="Surface"
								type="radio"
								value="hard"
								onChange={handleChange('surface')}
								checked={newLegaue.surface === 'hard'}
							/>

							<Input
								name="Surface"
								type="radio"
								value="carpet"
								onChange={handleChange('surface')}
								checked={newLegaue.surface === 'carpet'}
							/>
						</div>

						{errors.surface && <div className="error">{errors.surface}</div>}
					</div>

					<div className="form-group">
						<Label icon="fa fa-venus-mars" name="Gender" />

						<Input
							name="Gender"
							type="radio"
							value="male"
							onChange={handleChange('gender')}
							checked={newLegaue.gender === 'male'}
						/>
						<Input
							name="Gender"
							type="radio"
							value="female"
							onChange={handleChange('gender')}
							checked={newLegaue.gender === 'female'}
						/>

						{errors.gender && <div className="error">{errors.gender}</div>}
					</div>

					{/* <div className="error-wrapper">
						<div className="error">{errors && errors.league}</div>
					</div> */}
					<Button>{title}</Button>
				</form>
			</div>
		</>
	);
};
