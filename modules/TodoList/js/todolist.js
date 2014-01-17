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

			this.$todoList = $ctx.find('.todolist');
			this.$deletedList = $ctx.find('.deletedlist');

			this.itemsDataKey = 'todoitems';
			this.itemsData = [];

			this.restoreData();

			// subscribe to the channel
			this.sandbox.subscribe('myTodoChannel', this);

			this.statusMask = {
				done: parseInt('100', 2),
				deleted: parseInt('010', 2),
				starred: parseInt('001', 2)
			};

			this.onClearTrash = $.proxy(this.onClearTrash, this);
		},

		/**
		 * Hook function to do all of your module stuff.
		 *
		 * @method on
		 * @param {Function} callback function
		 * @return void
		 */
		on: function (callback) {
			// Find and compile template
			this.tmplItem = doT.template($('#todoitem').text());

			this.renderAllItems();
			this.renderDeletedItems();
			this.updateTrashCounter();

			$('.clearlistbutton').on('click', this.onClearTrash);


			callback();
		},

		/**
		 * Listener for adding a new To do item
		 *
		 * @param data
		 */
		onAddTodo: function (data) {
			var item = this.itemFactory(data.text);
			this.addItem(item);

			this.renderItem(item, this.$todoList);
		},
		onClearTrash: function () {
			this.removeDeletedList();
			this.clearTrash();
		},
		onToggleItemDone: function (data) {
			var item = this.getItem(data.id);
			this.toggleItemDone(item);
		},

		onToggleItemStarred: function (data) {
			var item = this.getItem(data.id);
			this.toggleItemStarred(item);
		},

		onSetItemDeleted: function (data) {
			var item = this.getItem(data.id);
			this.setItemDeleted(item);

			this.renderItem(item, this.$deletedList);
		},

		onToggleDeletedList: function () {
			var $deletedlistcon = $('.deletedlistcontainer');
			$deletedlistcon.toggleClass('hide');
		},
		onUpdateTrashCounter: function () {
			this.updateTrashCounter();
		},

		onToggleItemDeleted: function (data) {

			var item = this.getItem(data.id),
				$item = $(data.ev.currentTarget).closest('.mod-todo-item')
				;


			this.toggleItemDeleted(item);

			if (!this.isItemDeleted(item)) {
				this.renderItem(item, this.$todoList);
			} else {
				this.renderItem(item, this.$deletedList);
			}

			$item.remove();

		},

		/**
		 * Hook function to trigger your events.
		 *
		 * @method after
		 * @return void
		 */
		after: function () {
			this.$todoList.sortable();
			this.$todoList.disableSelection();
		},

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		saveData: function () {
			localStorage.setItem(this.itemsDataKey, JSON.stringify(this.itemsData));
		},

		restoreData: function () {
			var data = JSON.parse(localStorage.getItem(this.itemsDataKey));
			if (data !== null) {
				this.itemsData = data;
			}
		},

		addItem: function (item) {
			this.itemsData.push(item);
			this.saveData();
		},

		deleteItem: function (id) {
			this.itemsData.splice(id, 1);
		},

		/**
		 * Find entry and return
		 * @param id
		 * @returns {*}
		 */
		getItem: function (id) {
			var i,
				l = this.itemsData.length
				;
			for (i = 0; i < l; i++) {
				var item = this.itemsData[i];
				if (item.id === id) {
					return item;
				}
			}
		},

		itemFactory: function (title) {
			return {
				title: title,
				id: this.generateUUID(),
				status: 0
			};
		},

		isItemDone: function (item) {
			return this.isItemStatus(item, 'done');
		},

		setItemDone: function (item) {
			this.setItemStatus(item, 'done');
		},

		unsetItemDone: function (item) {
			this.unsetItemStatus(item, 'done');
		},

		toggleItemDone: function (item) {
			this.flipItemStatus(item, 'done');
		},

		isItemStarred: function (item) {
			return this.isItemStatus(item, 'starred');
		},

		setItemStarred: function (item) {
			this.setItemStatus(item, 'starred');
		},

		unsetItemStarred: function (item) {
			this.unsetItemStatus(item, 'starred');
		},

		toggleItemStarred: function (item) {
			this.flipItemStatus(item, 'starred');
		},

		isItemDeleted: function (item) {
			return this.isItemStatus(item, 'deleted');
		},

		setItemDeleted: function (item) {

			this.setItemStatus(item, 'deleted');
		},

		unsetItemDeleted: function (item) {
			this.unsetItemStatus(item, 'deleted');
		},

		toggleItemDeleted: function (item) {
			this.flipItemStatus(item, 'deleted');
		},

		clearTrash: function () {
			var i = 0,
				current,
				dataLen = this.itemsData.length,
				cloneData = []
				;

			for (i; i < dataLen; i++) {

				current = this.itemsData[i];

				if (current && !this.isItemDeleted(current)) {
					cloneData.push(this.itemsData[i]);
				}
			}
			this.itemsData = cloneData;
			this.saveData();
		},

		removeDeletedList: function () {
			$('.deletedlist .mod-todo-item').remove();
		},

		getTrashAmount: function () {
			var i = 0,
				current,
				dataLen = this.itemsData.length,
				deletedItems = 0
				;

			for (i; i < dataLen; i++) {

				current = this.itemsData[i];

				if (current && this.isItemDeleted(current)) {
					deletedItems++;
				}
			}
			
			return deletedItems;
		},


		updateTrashCounter: function () {
			var deletedItems = this.getTrashAmount();
			this.fire('setCounter', { amount: deletedItems }, ['myTodoChannel']);
		},

		isItemStatus: function (item, statusName) {
			return (item.status & this.statusMask[statusName]) ? true : false;
		},

		setItemStatus: function (item, statusName) {
			console.log(item);
			item.status = (item.status | this.statusMask[statusName]);
			this.saveData();
		},

		unsetItemStatus: function (item, statusName) {
			item.status = (item.status & ~this.statusMask[statusName]);
			this.saveData();
		},

		flipItemStatus: function (item, statusName) {
			item.status = (item.status ^ this.statusMask[statusName]);
			this.saveData();
		},


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/**
		 * @param item
		 * @param $list List to add item (todolist or deleted list)
		 */
		renderItem: function (item, $list) {
			var tmplData = {
				title: item.title,
				id: item.id
			};

			// Run template
			var html = this.tmplItem(tmplData),
				$newItem = $(html)
				;

			// Prepend new To do item
			$newItem.prependTo($list).fadeIn();

			// Initialize as Terrific module
			this.sandbox.addModules($newItem.wrap('<div></div>').parent());

			$newItem.unwrap();
		},

		renderAllItems: function () {
			var i,
				l = this.itemsData.length
				;
			for (i = 0; i < l; i++) {
				var item = this.itemsData[i];
				if (!this.isItemDeleted(item)) {
					this.renderItem(item, this.$todoList);
				}

			}
		},
		renderDeletedItems: function () {
			var i,
				l = this.itemsData.length
				;
			for (i = 0; i < l; i++) {
				var item = this.itemsData[i];
				if (this.isItemDeleted(item)) {
					this.renderItem(item, this.$deletedList);
				}

			}
		},

		/**
		 * Generates and returns rfc4122 version 4 compliant UUID.
		 *
		 * @returns {string}
		 */
		generateUUID: function () {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		}
	});
})(Tc.$);
