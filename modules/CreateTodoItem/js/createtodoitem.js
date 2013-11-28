(function ($) {
	/**
	 * Default module implementation.
	 *
	 * @author Remo Brunschwiler
	 * @namespace Tc.Module
	 * @class Default
	 * @extends Tc.Module
	 */
	Tc.Module.CreateTodoItem = Tc.Module.extend({

		/**
		 * Initializes the Default module.
		 *
		 * @method init
		 * @constructor
		 * @param {jQuery|Zepto} $ctx the jquery context
		 * @param {Sandbox} sandbox the sandbox to get the resources from
		 * @param {String} modId the unique module id
		 */
		init: function ($ctx, sandbox, modId) {
			// call base constructor
			this._super($ctx, sandbox, modId);
			
			// subscribe to the channel
			this.sandbox.subscribe('myTodoChannel', this);
		},

		/**
		 * Hook function to do all of your module stuff.
		 *
		 * @method on
		 * @param {Function} callback function
		 * @return void
		 */
		on: function (callback) {

			var  mod = this,
				$btn = $('.btn', this.$ctx),
				$input = $('.input', this.$ctx)
			;

			$btn.on('click', function (ev) {
				
				ev.preventDefault();
				
				// fire event to another module
				mod.fire('addTodo', { text : $input.val() }, ['myTodoChannel'], function() { 					
					console.log('Fired!');
				});							   
			});			

			callback();
		},

		/**
		 * Hook function to trigger your events.
		 *
		 * @method after
		 * @return void
		 */
		after: function () {	
			
		}
	});
})(Tc.$);