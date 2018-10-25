var Player = React.createClass({

	getInitialState : function() {
        return {
        };
	},

	getDefaultProps: function() {

		return {
            info : {}
		};

	},

	remove : function() {

	},

	render: function() {
		let table = [];

        for (var key in this.props.info) {
            if (this.props.info.hasOwnProperty(key)) {
				table.push(<tr><td >{key}</td><td className="bold">{this.props.info[key]}</td></tr>);
            }
        }

		return (
			<table>
				{table}
			</table>
		);
	}
});


export default Player;
