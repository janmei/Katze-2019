import React, { Component, Fragment } from 'react';
import { Calendar, globalizeLocalizer } from 'react-big-calendar'
import globalize from 'globalize'
import moment from 'moment'
import events from './events';
import './Titelblob.css';
import Countdown from 'react-countdown-now';
require('globalize/lib/cultures/globalize.culture.de-DE')


const renderer = ({ hours, minutes, seconds, completed }) => {
	return (
		<span>
			{minutes}:{seconds}
		</span>
	);
};

const localizer = globalizeLocalizer(globalize)

class Titelblob extends Component {
	constructor(props) {
		super(props);

		this.state = {
			content: {
				head: '',
				sub: ''
			},
			countdown: '',
			countdown_active: false,
			animation: 'timetable',
			team_layer: {}
		};

		this.todayStart = new Date()
		this.todayStart.setHours(10)
		this.todayStart.setMinutes(0)
		this.todayStart.setSeconds(0)

		this.todayEnd = new Date()
		this.todayEnd.setHours(18)
		this.todayEnd.setMinutes(0)
		this.todayEnd.setSeconds(0)
	}

	componentWillReceiveProps(next) {
		this.setState({
			content: {
				head: next.data.content.head,
				sub: next.data.content.sub,
			},
			countdown: next.data.content.countdown,
			countdown_active: next.data.content.countdown_active,
			animation: next.data.animation,
			team_layer: next.data.team_layer
		});
		if (this.state.countdown_active) {
			// setCountdown(this.state.content.countdown);
		}
	}

	checkTime(delta) {
		// console.log(delta);
		// check if remaining time is 10 sendonds
		if (delta.total === 10000) {
			//trigger something
		}
	}

	getModDate = () => {
		const current = new Date();
		const newDate = new Date().setHours(current.getHours() + 1);
		return newDate
	}

	render() {
		return (
			<div className="InfoLayer">
				{this.state.countdown_active && (
					<Countdown
						date={this.state.countdown}
						onTick={this.checkTime}
						renderer={renderer}
					/>
                )}
                
                <div className="WelcomeLayer">

				{/* CUSTOM TEXT */}
				{this.state.animation === 'text' && (
                                    <div className="TextLayer">
                                    <h1>{this.state.content.head}</h1>
                                    <h6>{this.state.content.sub}</h6>
                                </div>
				)}
				{/* TEAM  */}
				{this.state.animation === 'teams' && (
                                    <div className="TextLayer">
                                    <h1>{this.state.team_layer.name}</h1>
                                    <h6>{this.state.team_layer.persons.join(', ')}</h6>
                                </div>  

				)}
				{/* COUNTDOWN */}
				{this.state.animation === 'countdown' && (
					<div class="TextLayer">
						<h1>{this.state.team_layer.name}</h1>
						<h6>{this.state.team_layer.persons.join(', ')}</h6>
					</div>

				)}
				{/* TIMETABLE */}
					{this.state.animation === 'timetable' && (
						<div className="calendar">
							<Calendar
								localizer={localizer}
								events={events}
								step={60}
								timeslots={1}
								defaultView={'day'}
								views={['day']}
								toolbar={false}
								min={new Date(2019, 7, 6, 8)}
								max={new Date(2019, 7, 6, 21)}
								scrollToTime={moment().toDate()}
								culture={'de-DE'}
								getNow={() => moment().add(1, 'h').toDate()}
							/>
						</div>
							
				)}
					


                    <svg id="blob" 
                        viewBox="394 220 1675 1638"
                        fill="none"
                    >
                        <g>
                        <path fill="#FFFFFF">
                            <animate
                                repeatCount="indefinite"
                                fill="freeze"
                                attributeName="d"
                                dur="50s"
                                values="
                                M70.8998929,220 C154.565052,-36.0625058 396.890032,-69.7275672 496,128 C595.109968,325.727567 451.972067,493.190106 600.359922,674.113896 C748.747777,855.037687 1094.48014,680.401031 1278.10653,787.173978 C1461.73293,893.946925 1326.1885,991.191558 1428.31619,1134.99136 C1530.44389,1278.79115 1739.51501,1584.24386 1317.55056,1630.24032 C895.586119,1676.23677 525.755245,1667.16723 223.997344,1385.79648 C-77.760558,1104.42573 -12.7652658,476.062506 70.8998929,220 Z;M70.8998929,219 C154.565052,-37.0625058 473.818123,-69.7275672 572.928092,128 C672.03806,325.727567 409.333804,545.030849 557.721659,725.95464 C706.109513,906.87843 999.981594,600.540448 1183.60799,707.313395 C1367.23438,814.086342 1215.42287,994.252595 1317.55056,1138.05239 C1419.67826,1281.85219 1739.51501,1583.24386 1317.55056,1629.24032 C895.586119,1675.23677 525.755245,1666.16723 223.997344,1384.79648 C-77.760558,1103.42573 -12.7652658,475.062506 70.8998929,219 Z;M64.1595798,270.734254 C147.824738,14.6717486 568.097856,-96.5046673 667.207824,101.2229 C766.317793,298.950467 448.929519,366.59712 597.317374,547.520911 C745.705229,728.444701 1034.81179,554.426573 1218.43819,661.19952 C1402.06458,767.972466 1143.40228,945.70478 1245.52998,1089.50458 C1347.65767,1233.30438 1640.40263,1506.1834 1218.43819,1552.17986 C796.473742,1598.17632 533.755245,1568.16723 231.997344,1286.79648 C-69.760558,1005.42573 -19.5055789,526.79676 64.1595798,270.734254 Z;M64.1595798,270.734254 C147.824738,14.6717486 568.097856,-96.5046673 667.207824,101.2229 C766.317793,298.950467 518.819969,390.07621 667.207824,571 C815.595679,751.92379 937.397357,583.588349 1121.02375,690.361296 C1304.65014,797.134242 1244.55861,807.686779 1346.68631,951.486577 C1448.81401,1095.28637 1640.40263,1506.1834 1218.43819,1552.17986 C796.473742,1598.17632 533.755245,1568.16723 231.997344,1286.79648 C-69.760558,1005.42573 -19.5055789,526.79676 64.1595798,270.734254 Z;M70.8998929,220 C154.565052,-36.0625058 396.890032,-69.7275672 496,128 C595.109968,325.727567 451.972067,493.190106 600.359922,674.113896 C748.747777,855.037687 1094.48014,680.401031 1278.10653,787.173978 C1461.73293,893.946925 1326.1885,991.191558 1428.31619,1134.99136 C1530.44389,1278.79115 1739.51501,1584.24386 1317.55056,1630.24032 C895.586119,1676.23677 525.755245,1667.16723 223.997344,1385.79648 C-77.760558,1104.42573 -12.7652658,476.062506 70.8998929,220 Z;"
                            />
                        </path>
                        </g>
                    </svg>
                </div>
            </div>
		);
	}
}

export default Titelblob;
