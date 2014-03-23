/*global Ext */
/*jslint sloppy: true */

Ext.define('NotesApp.controller.Notes', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            //look up views by xtype
            notesListView: 'noteslistview',
            noteEditorView: 'noteeditorview'
        },
        control: {
            notesListView: {
                //commands fired by notes list container
                newNoteCommand: 'onNewNoteCommand',
                editNoteCommand: 'onEditNoteCommand'
            },
            noteEditorView: {
                //commands fired by note editor
                saveNoteCommand: 'onSaveNoteCommand',
                deleteNoteCommand: 'onDeleteNoteCommand',
                backToHomeCommand: 'onBackToHomeCommand'
            }
        }
    },

    getRandomInt: function (min, max) {
        "use strict";
        //return a random int within inputted range
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    activateNoteEditor: function (record) {
        "use strict";

        var noteEditorView = this.getNoteEditorView();

        //set inputted record as current NoteEditor record
        noteEditorView.setRecord(record); /* load() is deprecated. */

        //set NoteEditor as active item in Viewport
        Ext.Viewport.setActiveItem(noteEditorView);
    },

    activateNotesList: function () {
        "use strict";
        //set NotesList as active item in Viewport
        Ext.Viewport.setActiveItem(this.getNotesListView());
    },

    onNewNoteCommand: function () {
        "use strict";

        var now = new Date(),
            newNote = Ext.create('NotesApp.model.Note', {
                dateCreated: now,
                title: '',
                narrative: ''
            });

        //call activateNoteEditor with blank note
        this.activateNoteEditor(newNote);

    },

    onEditNoteCommand: function (record) {
        "use strict";
        //call activateNoteEditor with inputted record
        this.activateNoteEditor(record);
    },

    onSaveNoteCommand: function () {
        "use strict";

        var noteEditorView = this.getNoteEditorView(),
            currentNote = noteEditorView.getRecord(),
            newValues = noteEditorView.getValues(),
            notesStore = Ext.getStore('Notes'),
            errors;

        //update current note's fields with form values
        currentNote.set('title', newValues.title);
        currentNote.set('narrative', newValues.narrative);

        //validate changes to current note
        errors = currentNote.validate();
        if (!errors.isValid()) {
            //alert users of invalid changes
            Ext.Msg.alert('Wait!', errors.getByField('title')[0].getMessage(), Ext.emptyFn);
            //reject invalid changes
            currentNote.reject();
            //skip rest of function
            return;
        }

        //add note to store if it isn't there
        if (null === notesStore.findRecord('id', currentNote.data.id)) {
            notesStore.add(currentNote);
        }

        //synchronise store with its proxy
        notesStore.sync();

        //sort store by dateCreated in descending order
        notesStore.sort([{
            property: 'dateCreated',
            direction: 'DESC'
        }]);

        //call activateNotesList
        this.activateNotesList();
    },

    onDeleteNoteCommand: function () {
        "use strict";

        var noteEditorView = this.getNoteEditorView(),
            currentNote = noteEditorView.getRecord(),
            notesStore = Ext.getStore('Notes');

        //remove current note from store
        notesStore.remove(currentNote);

        //synchronise store with its proxy
        notesStore.sync();

        //call activateNotesList
        this.activateNotesList();
    },

    onBackToHomeCommand: function () {
        "use strict";
        //call activateNotesList
        this.activateNotesList();
    },

    //base class functions
    launch: function () {
        this.callParent(arguments);
        var notesStore = Ext.getStore('Notes');
        notesStore.load();
    },
    init: function () {
        this.callParent(arguments);
    }
});