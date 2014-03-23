/*global describe, it, expect, Ext */

describe('NotesApp.view.NoteEditor', function () {
    "use strict";

    it('exists', function () {
        //create view
        var view = Ext.create('NotesApp.view.NoteEditor');

        //check it exists
        expect(view.$className).toEqual('NotesApp.view.NoteEditor');
    });
});
