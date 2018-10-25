(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


/*.active {*/
    /*color: purple;*/
/*}*/
},{}],2:[function(require,module,exports){
'use strict';

var _TeamRoster = require('./components/TeamRoster');

var _TeamRoster2 = _interopRequireDefault(_TeamRoster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

React.render(React.createElement(_TeamRoster2.default, null), document.querySelector('#app'));

},{"./components/TeamRoster":5}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Player = React.createClass({
	displayName: "Player",


	getInitialState: function getInitialState() {
		return {};
	},

	getDefaultProps: function getDefaultProps() {

		return {
			info: {}
		};
	},

	remove: function remove() {},

	render: function render() {
		var table = [];

		console.log(this.props.info);

		for (var key in this.props.info) {
			if (this.props.info.hasOwnProperty(key)) {
				console.log(key);
				console.log(this.props.info[key]);
				table.push(React.createElement(
					"tr",
					null,
					React.createElement(
						"td",
						null,
						key
					),
					React.createElement(
						"td",
						null,
						this.props.info[key]
					)
				));
			}
		}

		return React.createElement(
			"table",
			null,
			table
		);
	}
});

exports.default = Player;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});


var TeamList = React.createClass({
	displayName: "TeamList",


	getInitialState: function getInitialState() {
		return {
			allTeams: []
		};
	},

	getDefaultProps: function getDefaultProps() {},

	componentDidMount: function componentDidMount() {
		var _this = this;

		var url = "https://statsapi.web.nhl.com/api/v1/teams";

		// Arrow functions don't create new functional context and use context of a calling function.
		// So here 'this' is really the parent this, therefore our component
		$.get(url, function (result) {
			//console.log(result);
			var allTeams = [];
			result.teams.map(function (team) {
				allTeams.push({
					name: team.name,
					id: team.id,
					abbreviation: team.abbreviation
				});
			});
			_this.setState({ allTeams: allTeams });
		});
	},


	remove: function remove() {},

	onChange: function onChange(e) {
		this.props.onGetRoster(e.target.value);
	},

	render: function render() {

		var options = this.state.allTeams.map(function (team) {
			return React.createElement(
				"option",
				{ value: team.id },
				team.name,
				" : ",
				team.abbreviation,
				" "
			);
		});

		return React.createElement(
			"div",
			null,
			React.createElement(
				"form",
				null,
				React.createElement(
					"select",
					{ placeholder: "Select a Team", onChange: this.onChange },
					options
				)
			)
		);
	}
});

exports.default = TeamList;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _TeamList = require('./TeamList');

var _TeamList2 = _interopRequireDefault(_TeamList);

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

require('../../css/styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TeamRoster = React.createClass({
    displayName: 'TeamRoster',


    getInitialState: function getInitialState() {
        return {
            allPlayers: [],
            playerInfo: {}
        };
    },

    getRoster: function getRoster(teamId) {
        var _this = this;

        // NHL API
        var url = 'https://statsapi.web.nhl.com/api/v1/teams/' + teamId + '/roster';

        // Arrow functions don't create new functional context and use context of a calling function.
        // So here 'this' is really the parent this, therefore our component
        $.get(url, function (result) {
            console.log(result);

            var allPlayers = [];

            result.roster.map(function (player) {

                allPlayers.push({
                    fullName: player.person.fullName,
                    id: player.person.id,
                    position: player.position.name
                });
            });

            _this.setState({ allPlayers: allPlayers });
        });
    },

    getPlayer: function getPlayer(playerId) {
        var _this2 = this;

        console.log(playerId);

        if (this.state.playerInfo.id == playerId) {
            return;
        }

        // NHL API
        var url = 'https://statsapi.web.nhl.com/api/v1/people/' + playerId;

        $.get(url, function (result) {

            console.log(result);
            _this2.setState({ playerInfo: result.people[0] });
        });
    },

    getPlayerClass: function getPlayerClass(playerId) {
        if (this.state.playerInfo.id == playerId) {
            return 'active';
        }
        return '';
    },

    remove: function remove() {},

    render: function render() {
        var _this3 = this;

        var items = this.state.allPlayers.map(function (player) {
            return React.createElement(
                'li',
                { onClick: function onClick() {
                        _this3.getPlayer(player.id);
                    }, className: _this3.getPlayerClass(player.id) },
                player.fullName,
                ' - ',
                player.position
            );
        });
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                'Team Roster '
            ),
            React.createElement(_TeamList2.default, { onGetRoster: this.getRoster }),
            React.createElement(
                'ul',
                null,
                items
            ),
            React.createElement(_Player2.default, { info: this.state.playerInfo })
        );
    }
});

exports.default = TeamRoster;

},{"../../css/styles.css":1,"./Player":3,"./TeamList":4}]},{},[2]);
