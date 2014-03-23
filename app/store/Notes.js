/*global Ext */

Ext.define('NotesApp.store.Notes', {
    extend: 'Ext.data.Store',
    requires: ['Ext.data.proxy.LocalStorage'],
    config: {
        model: 'NotesApp.model.Note',
        storeId: 'Notes',
        //use local storage proxy
        proxy: {
            type: 'localstorage',
            id: 'notes-app-store'
        },
        //sort by dateCreated in descending order
        sorters: [{ property: 'dateCreated', direction: 'DESC'}],
        //group sorted data by day
        grouper: {
            sortProperty: 'dateCreated',
            direction: 'DESC',
            groupFn: function (record) {
                "use strict";
                return record.data.dateCreated.toDateString();
            }
        }
    }
});