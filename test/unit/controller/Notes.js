/*global jasmine, describe, it, expect, spyOn, beforeEach, afterEach, Ext */

describe('NotesApp.controller.Notes', function () {
    "use strict";

    var controller, app, store;
    beforeEach(function () {
        //create app stub
        app = Ext.create('Ext.app.Application', {name: 'NotesApp'});

        //create store
        store = Ext.create('NotesApp.store.Notes');

        //create controller within app stub
        controller = Ext.create('NotesApp.controller.Notes', { application: app });
        controller.launch();
    });

    afterEach(function () {
        //delete app stub
        app.destroy();
    });

    it('exists', function () {
        //check it exists
        expect(controller.$className).toEqual('NotesApp.controller.Notes');
    });

    describe('onBackToHomeCommand', function () {
        it('calls activateNotesList', function () {
            //spy on activateNotesList
            spyOn(controller, 'activateNotesList');

            //run command
            controller.onBackToHomeCommand();

            //check it was called
            expect(controller.activateNotesList).toHaveBeenCalled();
        });
    });

    describe('onDeleteNoteCommand', function () {
        beforeEach(function () {
            //create view & note
            var view = Ext.create('NotesApp.view.NoteEditor'),
                note = Ext.create('NotesApp.model.Note', {
                    dateCreated: new Date(),
                    title: 'currentNote',
                    narrative: 'some text'
                });

            //set current note in view
            view.setRecord(note);

            //add note to store
            store.add(note);
        });


        it('removes current note from store', function () {
            //stub viewport
            Ext.create('Ext.viewport.Default', {id: "ext-viewport2"});

            //run command
            controller.onDeleteNoteCommand();

            //check note was removed
            expect(store.findRecord('title', 'currentNote')).toBeNull();
        });

        it('synchronises store with its proxy', function () {
            //spy on sync function
            spyOn(store, 'sync');

            //run command
            controller.onDeleteNoteCommand();

            //check it was synced
            expect(store.sync).toHaveBeenCalled();
        });

        it('calls activateNotesList', function () {
            //spy on activateNotesList
            spyOn(controller, 'activateNotesList');

            //run command
            controller.onDeleteNoteCommand();

            //check it was called
            expect(controller.activateNotesList).toHaveBeenCalled();
        });
    });

    describe('onSaveNoteCommand', function () {
        var view, note;
        beforeEach(function () {
            //stub view
            view = Ext.create('NotesApp.view.NoteEditor');
            controller.getNoteEditorView = function () { return view; };

            //set current note in view
            note = Ext.create('NotesApp.model.Note', {
                dateCreated: new Date(),
                title: 'currentNote',
                narrative: 'some text'
            });
            view.setRecord(note);

            //set view form values
            view.setValues({
                title: 'newNote',
                narrative: 'some new text'
            });
        });

        it("updates current note's fields with form values", function () {
            //run command
            controller.onSaveNoteCommand();

            //check current note's fields
            expect(note.get('title')).toEqual('newNote');
            expect(note.get('narrative')).toEqual('some new text');
        });

        it("alerts users of invalid changes", function () {
            //reset form values
            view.reset();

            //spy on alert function
            spyOn(Ext.Msg, 'alert');

            //run command
            controller.onSaveNoteCommand();

            //check users are alerted
            expect(Ext.Msg.alert).toHaveBeenCalled();
        });

        it("rejects invalid changes", function () {
            //reset form values
            view.reset();

            //run command
            controller.onSaveNoteCommand();

            //check changes are rejected
            expect(note.get('title')).toEqual('currentNote');
            expect(note.get('narrative')).toEqual('some text');
        });

        it("adds note to store if it isn't there", function () {
            //run command
            controller.onSaveNoteCommand();

            //check note was added
            expect(store.findRecord('title', note.get('title'))).toEqual(note);
        });

        it("synchronises store with its proxy", function () {
            //spy on sync function
            spyOn(store, 'sync');

            //run command
            controller.onSaveNoteCommand();

            //check it was synced
            expect(store.sync).toHaveBeenCalled();
        });

        it("sorts store by dateCreated in descending order", function () {
            //reset store data
            store.removeAll();

            //populate store
            store.add({dateCreated: new Date(2014, 1, 1), title: 'title1', narrative: 'narrative1'});
            store.add({dateCreated: new Date(2012, 1, 1), title: 'title2', narrative: 'narrative2'});
            store.add({dateCreated: new Date(2013, 1, 1), title: 'title3', narrative: 'narrative3'});

            //run command
            controller.onSaveNoteCommand();
            store.remove(note);

            //get data from store
            var data = [];
            store.each(function (rec) { data.push(rec.data); });

            //check data is sorted correctly
            expect(data.map(function (model) {
                return model.title;
            }).join(', ')).toEqual('title1, title3, title2');
        });

        it('calls activateNotesList', function () {
            //spy on activateNotesList
            spyOn(controller, 'activateNotesList');

            //run command
            controller.onSaveNoteCommand();

            //check it was called
            expect(controller.activateNotesList).toHaveBeenCalled();
        });
    });

    describe('onEditNoteCommand', function () {
        it('calls activateNoteEditor with inputted record', function () {
            //spy on activateNoteEditor
            spyOn(controller, 'activateNoteEditor');

            //run command
            controller.onEditNoteCommand("record");

            //check it was called with inputted record
            expect(controller.activateNoteEditor).toHaveBeenCalledWith("record");
        });
    });

    describe('onNewNoteCommand', function () {
        it('calls activateNoteEditor with blank note', function () {
            //spy on activateNoteEditor
            spyOn(controller, 'activateNoteEditor');

            //run command
            controller.onNewNoteCommand();

            //check it was called with blank note
            expect(controller.activateNoteEditor).toHaveBeenCalledWith(jasmine.objectContaining({
                data: jasmine.objectContaining({title: '', narrative: ''})
            }));
        });
    });

    describe('activateNotesList', function () {
        it('sets NotesList as active item in Viewport', function () {
            //stub viewport and getNotesList
            Ext.create('Ext.viewport.Default', {id: "ext-viewport3"});
            controller.getNotesListView = function () { return 'notesList'; };

            //spy on setActiveItem
            spyOn(Ext.Viewport, 'setActiveItem');

            //run command
            controller.activateNotesList();

            //check active item is set
            expect(Ext.Viewport.setActiveItem).toHaveBeenCalledWith('notesList');
        });
    });

    describe('activateNoteEditor', function () {
        var view, model;
        beforeEach(function () {
            //stub view
            view = Ext.create('NotesApp.view.NoteEditor');
            model = Ext.create('NotesApp.model.Note', {
                dateCreated: new Date(),
                title: 'currentNote',
                narrative: 'some text'
            });
            controller.getNoteEditorView = function () { return view; };
        });

        it('sets inputted record as current NoteEditor record', function () {
            //stub viewport
            Ext.create('Ext.viewport.Default', {id: "ext-viewport5"});

            //spy on setActiveItem
            spyOn(Ext.Viewport, 'setActiveItem');

            //run command
            controller.activateNoteEditor(model);

            //check active item is set
            expect(view.getRecord()).toEqual(model);
        });

        it('sets NoteEditor as active item in Viewport', function () {
            //stub viewport
            Ext.create('Ext.viewport.Default', {id: "ext-viewport4"});

            //spy on setActiveItem
            spyOn(Ext.Viewport, 'setActiveItem');

            //run command
            controller.activateNoteEditor();

            //check active item is set
            expect(Ext.Viewport.setActiveItem).toHaveBeenCalledWith(view);
        });
    });

    describe('getRandomInt', function () {
        it('returns a random int within inputted range', function () {
            var int = controller.getRandomInt(2, 5);

            //check int is within inputted range
            expect(int).toBeLessThan(6);
            expect(int).toBeGreaterThan(1);
        });
    });
});