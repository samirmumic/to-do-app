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
			
//			var  $label = $('.item-label', $template)
//				,$checkbox = $('.inputcheck', $template)
//			;
			
			
			//
			// Toggle Done / Not Done
			
			this.$ctx.on('click','.mod-to-do-item', function(ev) {
				
				var $item = $(ev.target);
				
				if($item.hasClass('mod-to-do-item') == false) {
					$item = $item.closest('.mod-to-do-item'); 
				}
				
				$item.toggleClass('skin-to-do-item-template-checked');
								
				var checkboxState = $item.find('.inputcheck').attr('checked');
				
				if(checkboxState == true) {
					$checkbox.attr('checked', false); 	
				} else {
					$checkbox.attr('checked', true);
				}
				
				
			});
		
			
			//
			// Rename Todo
			
//			$label.on('dblclick', function () {
//				
//				var $inputfield = $('<input class="edit-inputfield" />');
//				
//				$label
//					.hide()	
//				    .after($inputfield)
//				;
//				
//				$inputfield.val($label.text());
//						
//			});

			callback();
		},
		
		
		//
		// Listener for adding a new todo item

		onAddTodo: function (data) {

			// Template suchen per jQuery & clonen
			var  $template = $('.mod-to-do-item-template', this.$ctx).clone()
				,$label = $('.item-label', $template)				
			;

			// Rename class because it is not a templste anymore
			$template.attr('class', 'mod-to-do-item');

			// Wert einfügen in das Template
			$label.html(data.text);

			// Template anzeigen auf der Seite
			$template.prependTo(this.$ctx).fadeIn();
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