/*global Ext */

Ext.define('NotesApp.view.NotesList', {
    extend: 'Ext.Container',
    requires: ['Ext.TitleBar', 'Ext.dataview.List'],
    alias: 'widget.noteslistview',

    config: {
        layout: {
            type: 'fit'
        },
        items: [{
            //title bar
            xtype: 'titlebar',
            title: 'My Notes',
            docked: 'top',
            items: [
                //new note button
                {
                    xtype: 'button',
                    text: 'New',
                    ui: 'action',
                    itemId: 'newButton',
                    align: 'right'
                }
            ]
        }, {
            //list of notes
            xtype: 'list',
            store: 'Notes',
            itemId: 'notesList',
            itemCls: 'list-item-custom',
            loadingText: 'Loading Notes...',
            emptyText: '<div class="notes-list-empty-text">No notes found.</div>',
            onItemDisclosure: true,
            grouped: true,
            itemTpl: '<div class="list-item-title">{title}</div><div class="list-item-narrative">{narrative}</div>'
        }],
        listeners: [{
            delegate: '#newButton',
            event: 'tap',
            fn: 'onNewButtonTap'
        }, {
            delegate: '#notesList',
            event: 'disclose',
            fn: 'onNotesListDisclose'
        }]
    },
    onNewButtonTap: function () {
        "use strict";
        this.fireEvent('newNoteCommand', this);
    },
    onNotesListDisclose: function (list, record) {
        "use strict";
        this.fireEvent('editNoteCommand', record, list);
    }
});
