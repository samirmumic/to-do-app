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
			
			this.itemsdata = [];

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
			
			localStorage.setItem('itemsdata', this.itemsdata);
			
		},
		
		getLocalStorageData: function() {
			this.itemsdata = localStorage.getItem('itemsdata');
			
			var i,
				l = this.itemsdata.length
			;
			for(i = 0; i < l; i++) {
				var datum = this.itemsdata[i];
				this.createItemInView(datum);
			}
			
			
//			// Check localstorage support via modernizr
//			if($('html').hasClass('localstorage')) {									
//				
//				var $todoItems = $(localStorage.getItem('todoitems'));
//				
//				if ($todoItems !== null) {
//					this.$ctx.html($todoItems);	
//					this.sandbox.addModules($todoItems.wrap('<div></div>').parent());
//				}
//				
//				
//			} else {
//				
//				console.log(false);
//			}
//			
		},
		
		
		//
		// Listener for adding a new To do item

		onAddTodo: function (data) {
			
			//var  $newItem = $('.skin-todo-item-template', this.$ctx).clone();
			
			var datum = {
				title: data.text,
				id: this.genId()
				
			};
			
			this.itemsdata.push(datum);

			this.createItemInView(datum);

			this.setLocalStorageData();
		},

		/**
		 * Hook function to trigger your events.
		 *
		 * @method after
		 * @return void
		 */
		after: function () {
		},
		
		genId: function() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			    return v.toString(16);
			});
		},
		
		createItemInView: function(datum) {
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
		}

	});
})(Tc.$);