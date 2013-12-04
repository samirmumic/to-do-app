(function ($) {
	/**
	 * Default module implementation.
	 *
	 * @author Remo Brunschwiler
	 * @namespace Tc.Module
	 * @class Default
	 * @extends Tc.Module
	 */
	Tc.Module.TodoList = Tc.Module.extend({

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
			this.tmplItem = doT.template($('#todoitem').text());
			
			this.getLocalStorageData();

			callback();
		},
		
		
		setLocalStorageData: function() {
			
			var $items = $('.mod-todo-list').html();
			localStorage.setItem('todoitems', $items);
			
		},
		
		getLocalStorageData: function() {
								
			// Check localstorage support via modernizr
			if($('html').hasClass('localstorage')) {									
				
				var todoItems = localStorage.getItem('todoitems');
				
				if(todoItems !== null) {
					this.$ctx.html(todoItems);	
				}
				
				
			} else {
				
				console.log(false);
			}
			
		},
		
		
		//
		// Listener for adding a new To do item

		onAddTodo: function (data) {
			
			//var  $newItem = $('.skin-todo-item-template', this.$ctx).clone();
			
			var datum = {
				title: data.text
			};
			var html = this.tmplItem(datum);
			
			var $newItem = $(html);
			
			
			console.log(datum);
			
			// Prepend new To do item
			$newItem.prependTo(this.$ctx).fadeIn();
			
			// Remove Template Class
			$newItem.removeClass('skin-todo-item-template');

			// Start module			
			this.sandbox.addModules($newItem.wrap('<div></div>').parent());

			$newItem.unwrap();
			
			this.setLocalStorageData();
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