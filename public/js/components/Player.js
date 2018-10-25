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

		console.log(this.props.info);

        for (var key in this.props.info) {
            if (this.props.info.hasOwnProperty(key)) {
            	console.log(key);
            	console.log(this.props.info[key]);
				table.push(<tr><td>{key}</td><td>{this.props.info[key]}</td></tr>);
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
