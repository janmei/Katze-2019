import React, { Component, Fragment } from 'react';
import { Calendar, globalizeLocalizer } from 'react-big-calendar';
import globalize from 'globalize';
import moment from 'moment';
import events from './events';
import './Titelblob.css';
require('globalize/lib/cultures/globalize.culture.de-DE');

const localizer = globalizeLocalizer(globalize);

class Titelblob extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: {
        head: '',
        sub: '',
      },
      countdown: '',
      countdown_active: false,
      animation: '',
      team_layer: {},
    };
    this.myRef = React.createRef();

    this.todayStart = new Date();
    this.todayStart.setHours(10);
    this.todayStart.setMinutes(0);
    this.todayStart.setSeconds(0);

    this.todayEnd = new Date();
    this.todayEnd.setHours(18);
    this.todayEnd.setMinutes(0);
    this.todayEnd.setSeconds(0);
  }

  componentDidUpdate() {
    if (this.state.animation === 'sponsors') {
      var stage = document.getElementById('sponsors');
      var fadeComplete = function(e) {
        stage.appendChild(arr[0]);
      };
      var arr = stage.getElementsByTagName('div');

      for (var i = 0; i < arr.length; i++) {
        arr[i].addEventListener('animationend', fadeComplete, false);
      }
    }
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
      team_layer: next.data.team_layer,
    });
    if (this.state.countdown_active) {
      // setCountdown(this.state.content.countdown);
    }
  }

  render() {
    return (
      <div className="InfoLayer">
        <div className="WelcomeLayer">
          {this.state.animation === 'sponsors' && (
            <div class="SponsorsLayer">
              <div id="sponsors" ref="this.myRef">
                <div>
                  <img src={require('../../assets/sponsors/3spin.jpg')} />
                </div>
                <div>
                  <img src={require('../../assets/sponsors/Asta_h_da.png')} />
                </div>
                <div>
                  <img
                    src={require('../../assets/sponsors/Designerdock.png')}
                  />
                </div>
                <div>
                  <img src={require('../../assets/sponsors/Honda.png')} />
                </div>
                <div>
                  <img src={require('../../assets/sponsors/Hype.png')} />
                </div>
                <div>
                  <img src={require('../../assets/sponsors/Merck.png')} />
                </div>
                <div>
                  <img src={require('../../assets/sponsors/Meso.png')} />
                </div>
                <div>
                  <img src={require('../../assets/sponsors/Qundg.png')} />
                </div>
                <div>
                  <img src={require('../../assets/sponsors/Schumacher.png')} />
                </div>
                <div>
                  <img
                    src={require('../../assets/sponsors/Sparkasse_da.png')}
                  />
                </div>
                <div>
                  <img
                    src={require('../../assets/sponsors/Voba_Solutions.png')}
                  />
                </div>
                <div>
                  <img src={require('../../assets/sponsors/Zdf.png')} />
                </div>
              </div>
            </div>
          )}
          {/* TIMETABLE */}
          {this.state.animation === 'timetable' && (
            <div className="calendar">
              <Calendar
                localizer={localizer}
                events={events}
                step={60}
                timeslots={2}
                defaultView={'day'}
                views={['day']}
                toolbar={false}
                min={new Date(2019, 7, 6, 8)}
                max={new Date(2019, 7, 6, 21)}
                scrollToTime={moment('2019-07-06 11:00').toDate()}
                culture={'de-DE'}
                getNow={() =>
                  moment('2019-07-06 8:00')
                    .add(1, 'h')
                    .toDate()
                }
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Titelblob;
