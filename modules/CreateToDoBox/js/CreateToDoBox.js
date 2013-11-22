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
		},

		/**
		 * Hook function to do all of your module stuff.
		 *
		 * @method on
		 * @param {Function} callback function
		 * @return void
		 */
		on: function (callback) {

			// Per jQuery Button Selektieren
			// On Click Event abfangen
			// console.log(text aus dem inputfeld)

			var $button = $(".inputcreate"),
				$inputval = $('.inputtxt'),
				$todobox = $('.mod-to-do-item-template'),
				$inputcheck = $('.inputcheck');


			$button.on('click', function (e) {
				e.preventDefault();
				// Die Variable valofinput wird mit dem Value vom Inputfeld abgefüllt
				var $valofinput = $inputval.val();
				console.log($valofinput);
				$todobox.clone().prependTo(".mod-to-do-box").addClass("show").append($valofinput);
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