(function ($) {
	/**
	 * Default module implementation.
	 *
	 * @author Remo Brunschwiler
	 * @namespace Tc.Module
	 * @class Default
	 * @extends Tc.Module
	 */
	Tc.Module.ToDoBox = Tc.Module.extend({

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

			callback();
		},

		onAddTodo: function (data) {

			// Template suchen per jQuery & clonen
			var $template = $('.mod-to-do-item-template', this.$ctx).clone()
				, $label = $('.item-label', $template)
				, $box = $('.mod-to-do-item')
				, $checkbox = $('.inputcheck', $template)
				;

			$template.attr('class', 'mod-to-do-item');

			// Wert einfügen in das Template
			$label.html(data.text);

			// Template anzeigen auf der Seite
			$template.prependTo(this.$ctx).fadeIn();

			$checkbox.on('click', function () {
				$(this).closest(".mod-to-do-item").toggleClass("skin-to-do-item-template-checked");

			});
			$label.on('click', function () {
				$(this).closest(".mod-to-do-item").toggleClass("skin-to-do-item-template-checked");

			});

		},

		// 1. Debugge Add Todo

		// 2. Remove Todo

		// 3. Bearbeiten


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