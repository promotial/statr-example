/*global describe, it, expect, Ext */

describe('NotesApp.view.NotesList', function () {
    "use strict";

    it('exists', function () {
        //create view & required store
        var store = Ext.create('NotesApp.store.Notes'),
            view = Ext.create('NotesApp.view.NotesList', {items: [{store: store}]});

        //check it exists
        expect(view.$className).toEqual('NotesApp.view.NotesList');
    });

    it("has a list of notes", function () {
        //populate store
        var store = Ext.create('NotesApp.store.Notes', {
            data: [
                {dateCreated: new Date(2014, 0, 1), title: "title1", narrative: "narrative1"},
                {dateCreated: new Date(2013, 0, 1), title: "title2", narrative: "narrative2"},
                {dateCreated: new Date(2012, 0, 1), title: "title3", narrative: "narrative3"}
            ]
        });

        //create view
        Ext.create('NotesApp.view.NotesList', {
            renderTo: 'jasmine_content',
            items: [{
                xtype: 'list',
                store: store,
                itemCls: 'list-item-custom',
                itemTpl: '<div class="list-item-title">{title}</div><div class="list-item-narrative">{narrative}</div>'
            }]
        });

        //check titles are used
        expect(Ext.DomQuery.select('.list-item-title').map(function (el) {
            return el.textContent;
        }).join(', ')).toEqual('title1, title2, title3');

        //check narratives are used
        expect(Ext.DomQuery.select('.list-item-narrative').map(function (el) {
            return el.textContent;
        }).join(', ')).toEqual('narrative1, narrative2, narrative3');
    });
});
