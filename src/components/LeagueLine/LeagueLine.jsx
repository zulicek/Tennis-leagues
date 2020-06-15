import React from 'react';
import './LeagueLine.scss';
import { Icon } from '../Icon/Icon';
import { NavLink } from 'react-router-dom';
import {Button} from "../Button/Button";

export function LeagueLine({ league }) {
	return (
		<NavLink to={`/leagues/${league.id}`}>

            <h2 className="title">{league.name}</h2>

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

            {/* <div className="actions">
              <Button type="action">
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </Button>
              <Button type="action">
                <i className="fa fa-trash" aria-hidden="true"></i>
              </Button>
            </div> */}
		</NavLink>
	);
}
