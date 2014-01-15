(function ($) {
	/**
	 * Default module implementation.
	 *
	 * @author Remo Brunschwiler
	 * @namespace Tc.Module
	 * @class Default
	 * @extends Tc.Module
	 */
	Tc.Module.Trash = Tc.Module.extend({

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

			var _this = this,
				$deletedList = $('.deletedlist'),
				$title = $('.h3masked');

			// Delete item 
			$('#trash').sortable({

				update: function (event, ui) {
					ui.item.hide();

					// Remove from the HTML
					//$('.mod-todo-item', this).remove();

					// Fire Status
					//var id = $ctx.data('item-id');
					var id = ui.item.data('item-id');
					_this.fire('setItemDeleted', { id: id }, ['myTodoChannel']);
				}
			});

			

			$('.todolist').sortable({
				cursor: 'move',
				connectWith: '#trash'
			});

			$('#trash').on('click', function () {
				$deletedList.removeClass('hide');
				$title.removeClass('hide');
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