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
			
			
			var $ctx = this.$ctx
				, $label = $('.item-label', this.$ctx)
				, $checkbox = $('.item-checkbox', this.$ctx)
				, $editInputHtml = $('.edit-inputfield', this.$ctx)
				, skinNameEdit = 'skin-todo-item-edit'
				, skinNameChecked = 'skin-todo-item-checked'
				;
			 
			// Toggle item state
			$checkbox.on('click', function (ev) {

				$ctx.toggleClass(skinNameChecked);
			});
			console.log($label);
			
			// Start Editing: Replace Label with Inputfield
			
			$label.on('dblclick', function () {
					console.log('dblc');
				if ($ctx.hasClass(skinNameChecked)) return;

				$ctx.addClass(skinNameEdit);

				$label.hide();

				$editInputHtml
					.val($label.text())
					.show()
					.select()
				;


			});

			// Edit abbrechen mit ESC
			$(document).keyup(function (e) {
				
				if($ctx.hasClass(skinNameEdit) == false) return;
				
				if (e.keyCode == 27) {
					$editInputHtml.focusout();
				}  
			});

			// Stop Editing: Replace Inputfield with Label
			$editInputHtml.on('focusout', function (ev) {

				var val = $editInputHtml.val();

				$editInputHtml.hide();
				$label.html(val).show();

				$ctx.removeClass(skinNameEdit);
			});

			var $list = $(".mod-todo-list");
			$list.sortable();
			$list.disableSelection();
			
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