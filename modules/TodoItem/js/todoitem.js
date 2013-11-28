(function ($) {
	/**
	 * Default module implementation.
	 *
	 * @author Remo Brunschwiler
	 * @namespace Tc.Module
	 * @class Default
	 * @extends Tc.Module
	 */
	Tc.Module.TodoItem = Tc.Module.extend({

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

			var  self = this
				,$ctx = this.$ctx
				,$label = $('.item-label', this.$ctx)
				,$checkbox = $('.item-checkbox', this.$ctx)
				,$editInputHtml = $('.edit-inputfield')
			;

			// Toggle item state
			$checkbox.on('click', function (ev) {
				$ctx.toggleClass('skin-todo-item-checked');
			});


			//
			// Rename To do Item

			// Start Editing: Replace Label with Inputfield
			$label.on('dblclick', function () {
				
				if($ctx.hasClass('skin-todo-item-checked')) return;
				
				$ctx.addClass('skin-todo-item-edit');

				$label
					.hide()					
				;

				$editInputHtml
					.val($label.text())
					.show()
					.focus()
				;
			});

			// Stop Editing: Replace Inputfield with Label
			$editInputHtml.on('focusout', function () {

				var val = $editInputHtml.val();
				
				$editInputHtml.hide();
				$label.html(val).show();
				
				self.$ctx.removeClass('skin-todo-item-edit');
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