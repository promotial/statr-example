/*global describe, it, expect, beforeEach, Ext */

describe('NotesApp.store.Notes', function () {
    "use strict";

    var store;
    beforeEach(function () {
        //create store
        store = Ext.create('NotesApp.store.Notes');
    });

    it('exists', function () {
        //check it exists
        expect(store.$className).toEqual('NotesApp.store.Notes');
    });

    it('uses local storage proxy', function () {
        //check proxy
        expect(store.getProxy().config.type).toEqual('localstorage');
        expect(store.getProxy().config.id).toEqual('notes-app-store');
    });

    it('sorts by dateCreated in descending order', function () {
        //populate store
        store.add({dateCreated: new Date(2013, 9, 1), title: 'title1', narrative: 'narrative1'});
        store.add({dateCreated: new Date(2013, 7, 1), title: 'title2', narrative: 'narrative2'});
        store.add({dateCreated: new Date(2013, 10, 1), title: 'title3', narrative: 'narrative3'});

        //get data from store
        var data = [];
        store.each(function (rec) { data.push(rec.data); });

        //check data is sorted correctly
        expect(data.map(function (model) {
            return model.title;
        }).join(', ')).toEqual('title3, title1, title2');
    });

    it('groups sorted data by day', function () {
        //populate store
        store.add({dateCreated: new Date(2013, 9, 1), title: 'title1', narrative: 'narrative1'});
        store.add({dateCreated: new Date(2013, 9, 2), title: 'title2', narrative: 'narrative2'});
        store.add({dateCreated: new Date(2013, 9, 4), title: 'title3', narrative: 'narrative3'});
        store.add({dateCreated: new Date(2013, 9, 4), title: 'title4', narrative: 'narrative4'});

        //check data is grouped correctly
        expect(store.getGroups().map(function (group) {
            return group.name;
        }).join(', ')).toEqual('Fri Oct 04 2013, Wed Oct 02 2013, Tue Oct 01 2013');
    });
});