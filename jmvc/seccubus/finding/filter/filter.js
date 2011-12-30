steal(	'jquery/controller',
	'jquery/view/ejs',
	'jquery/controller/view',
	'seccubus/models' )
.then(	'./views/init.ejs',
	'./views/error.ejs',
function($){

/**
 * @class Seccubus.Finding.Filter
 */
$.Controller('Seccubus.Finding.Filter',
/** @Static */
{
	defaults : {
		workspace	: -1,
		scans		: null,
		status		: 1,
		host		: "*",
		hostName	: "*",
		port		: "*",
		plugin		: "*",
		onChange 	: function(filter) { },
		updateOnChange	: true,
	}
},
/** @Prototype */
{
	init : function(){
		this.updateView();
	},
	'.filter change' : function(el) {
		this.options[el.attr("filter")] = el.val();
		this.options.onChange({
			host		: this.options.host,
			hostName	: this.options.hostName,
			port		: this.options.port,
			plugin		: this.options.plugin,
		});
		if ( this.options.updateOnChange ) {
			this.updateView();
		}
	},
	updateView : function() {
		if ( this.options.workspace < 0  ) {
			this.element.html(
				this.view('error', {sStatus : this.options.status})
			);
		} else if ( this.options.scans == null ) {
			this.element.html(
				this.view('error', {sStatus : this.options.status})
			);
		} else {
			this.element.html(
				this.view(
					'init',
					Seccubus.Models.Finding.findAll(), {
						fScans : this.options.scans,
						fStatus : this.options.status,
						fHost : this.options.host,
						fHostName : this.options.hostName,
						fPort : this.options.port,
						fPlugin : this.options.plugin,
					}
				)
			);
		}
	},
	update : function(options){
		this._super(options);
		this.updateView();
	},
	getStatus : function() {
		return this.options.status;
	}
}) // Controller

}); // Steal