(function ($) {
	/**
	 * Default module implementation.
	 *
	 * @author Remo Brunschwiler
	 * @namespace Tc.Module
	 * @class Default
	 * @extends Tc.Module
	 */
	Tc.Module.CreateToDoBox = Tc.Module.extend({

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
			
			this.sandbox.subscribe('myTodoChannel', this); // subscribe to the VIP channel
		},

		/**
		 * Hook function to do all of your module stuff.
		 *
		 * @method on
		 * @param {Function} callback function
		 * @return void
		 */
		on: function (callback) {
			
			

			var mod = this,
				$button = $('.inputcreate', this.$ctx),
				$inputtxt = $('.inputtxt', this.$ctx),
				$todobox = $('.mod-to-do-item-template'),
				$inputcheck = $('.inputcheck');

		
			
			$button.on('click', function (e) {
				
				e.preventDefault();
				
				// Die Variable valofinput wird mit dem Value vom Inputfeld abgefüllt
				var valInput = $inputtxt.val();
				
				// fire event to another module
				mod.fire('addTodo', { text : valInput }, ['myTodoChannel'], function() { 
					
					console.log('Fired!'); 
				
				});
				
				
				console.log(valInput);
				$todobox.clone().prependTo(".mod-to-do-box").addClass("show").append(valInput);
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