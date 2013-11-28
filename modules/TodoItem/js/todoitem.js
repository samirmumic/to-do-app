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
			$ctx.on('click', function(ev) {	

				$ctx.toggleClass('skin-todo-item-checked');																	

				// Check / Uncheck the Checkbox
				if($ctx.hasClass('skin-todo-item-checked')) {					
					$checkbox.prop('checked', true);
				} else {					
					$checkbox.prop('checked', false);
				}
			});		
			

			//
			// Rename To do Item
			
			// Start Editing: Replace Label with Inputfield
			$label.on('dblclick', function() {

				self.$ctx.addClass('edit-in-progress');

				$label
					.hide()	
				    .after($editInputHtml)
				;
				
				$editInputHtml
					.val($label.text())
					.focus()
				;					
			});

			// Stop Editing: Replace Inputfield with Label
			$editInputHtml.on('focusout', function() {

				self.$ctx.removeClass('edit-in-progress');
				
				// TODO: Stop Editing and show the new Item Title
							
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