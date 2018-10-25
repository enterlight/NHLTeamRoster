

var TeamList = React.createClass({

	getInitialState : function() {
		return {
			allTeams : [],
		};
	},


	getDefaultProps: function() {

	},

    componentDidMount() {

        var url = `https://statsapi.web.nhl.com/api/v1/teams`;

        // Arrow functions don't create new functional context and use context of a calling function.
        // So here 'this' is really the parent this, therefore our component
        $.get(url,
            result => {
                //console.log(result);
				let allTeams = [];
                result.teams.map(team => {
					allTeams.push({
						name: team.name,
						id: team.id,
						abbreviation: team.abbreviation
                    });
				});
                this.setState({allTeams});
			});
    },

	remove : function() {

	},



	onChange: function(e) {
        this.props.onGetRoster(e.target.value);
	},

	render: function() {

        let options = this.state.allTeams.map((team) =>
            <option value={team.id}>{team.name} : {team.abbreviation} </option>
   		 );

		return (
			<div>
				<form>
					<select placeholder="Select a Team" onChange={this.onChange}>
						{options}
					</select>
				</form>
        	</div>

		);
	}
});

export default TeamList;
