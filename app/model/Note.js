/*global Ext */

Ext.define('NotesApp.model.Note', {
    extend: 'Ext.data.Model',
    config: {
        //use uuid identifier strategy
        identifier: 'uuid',
        fields: [
            'id',
            { name: 'dateCreated', type: 'date', dateFormat: 'c' },
            { name: 'title', type: 'string' },
            { name: 'narrative', type: 'string', defaultValue: 'some text here' }
        ],
        validations: [
            //require a dateCreated value
            { field: 'dateCreated', type: 'presence' },
            //require a title
            { field: 'title', type: 'presence', message: 'Please enter a title for this note.' }
        ]
    }
});
