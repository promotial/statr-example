/*global describe, it, expect, Ext */

describe('NotesApp.model.Note', function () {
    "use strict";

    it('exists', function () {
        //create model
        var model = Ext.create('NotesApp.model.Note');

        //check it exists
        expect(model.$className).toEqual('NotesApp.model.Note');
    });

    it('uses uuid identifier strategy', function () {
        //create model
        var date = new Date(),
            model = Ext.create('NotesApp.model.Note', {
                id: 1234,
                dateCreated: date,
                title: 'test',
                narrative: 'some text'
            });

        //check identifier strategy
        expect(model.getIdentifier().config.type).toEqual('uuid');
    });

    it('has data', function () {
        //create model
        var date = new Date(),
            model = Ext.create('NotesApp.model.Note', {
                id: 1234,
                dateCreated: date,
                title: 'test',
                narrative: 'some text'
            });

        //check attributes
        expect(model.get('id')).toEqual(1234);
        expect(model.get('dateCreated')).toEqual(date);
        expect(model.get('title')).toEqual('test');
        expect(model.get('narrative')).toEqual('some text');
    });

    it('has default values', function () {
        //create model
        var model = Ext.create('NotesApp.model.Note');

        //check default values
        expect(model.get('narrative')).toEqual('some text here');
    });

    it('requires a dateCreated value', function () {
        //create & validate model
        var model = Ext.create('NotesApp.model.Note'),
            errors = model.validate();

        //check error message
        expect(errors.isValid()).toBeFalsy();
        expect(errors.getByField('dateCreated')[0].getMessage()).toEqual('must be present');
    });

    it('requires a title', function () {
        //create & validate model
        var model = Ext.create('NotesApp.model.Note'),
            errors = model.validate();

        //check error message
        expect(errors.isValid()).toBeFalsy();
        expect(errors.getByField('title')[0].getMessage()).toEqual('Please enter a title for this note.');
    });
});