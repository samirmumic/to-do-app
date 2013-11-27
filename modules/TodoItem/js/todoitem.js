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
				,$editInputHtml = $('<input class="edit-inputfield" />')
			;

			// Toggle item state
			$ctx.on('click', function() {				

				$ctx.toggleClass('skin-todo-item-checked');																	

				// TODO: This doesn't work. Try to figure out a way to toggle the checkboy state chcked / unchecked
				$checkbox.attr('checked', !$checkbox.attr('checked'));
			});		
			
			//
			// Rename Todo
			
			$label.on('dblclick', function() {

				$label
					.hide()	
				    .after($editInputHtml)
				;
				
				$editInputHtml
					.val($label.text())
					.focus()
				;					
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