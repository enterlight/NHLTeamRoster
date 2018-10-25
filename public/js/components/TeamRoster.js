import TeamList from './TeamList'
import Player from './Player'

var TeamRoster = React.createClass({

	getInitialState : function() {
        return {
            allPlayers : [],
            playerInfo: {}
        };
	},


    getRoster : function(teamId) {

        // NHL API
        var url = `https://statsapi.web.nhl.com/api/v1/teams/${teamId}/roster`;

        // Arrow functions don't create new functional context and use context of a calling function.
        // So here 'this' is really the parent this, therefore our component
        $.get(url,
            result => {
                console.log(result);

                let allPlayers = []

                result.roster.map((player) => {

                    allPlayers.push({
                        fullName : player.person.fullName,
                        id: player.person.id,
                        position: player.position.name,
                    })
                });

                this.setState({allPlayers});

            });

    },



    getPlayer : function(playerId) {


	    console.log(playerId);

        if ( this.state.playerInfo.id == playerId ) {
	        return;
        }

        // NHL API
        var url = `https://statsapi.web.nhl.com/api/v1/people/${playerId}`;

        $.get(url,
            result => {

                console.log(result);
                this.setState({playerInfo : result.people[0]});

            });

    },

    getPlayerClass : function(playerId) {
        if ( this.state.playerInfo.id == playerId ) {
            return 'active';
        }
        return 'normal';
	},


	remove : function() {

	},

	render: function() {

        let items = this.state.allPlayers.sort((a,b) => {
            return (a.position  > b.position  ? 1 : a.position  < b.position ? -1 : 0);
        })
        .map((player) =>
                <li onClick={() => { this.getPlayer(player.id)}}  className={this.getPlayerClass(player.id)} >{player.fullName} - {player.position}</li>
        );
		return (

            <div>
                <h1>Team Roster </h1>

                <TeamList onGetRoster={this.getRoster} />
                <ul>
                    {items}
                </ul>
                <Player info={this.state.playerInfo}></Player>
            </div>
		);
	}
});




export default TeamRoster;
