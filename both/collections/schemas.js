Schemas = {};

Schemas.URL = new SimpleSchema({
    targetURL: {
        type: String,
        regEx: SimpleSchema.RegEx.Url
    }
    , shortURL: {
        type: String,
        regEx: /^[a-zA-Z0-9._-]+$/,
        optional: true
    }
    , isPrivate: {
        type: Boolean,
        label: 'Private',
        optional: true,
        defaultValue: false
    }
    , userId: {
        type: String,
        optional: true
    }
    , timeCreated: {
        type: Date,
        optional: true
    }
    , timeModified: {
        type: Date,
        optional: true
    }  
    , visitCount: {
        type: Number,
        optional: true,
        defaultValue: 0
    }
});

Schemas.URL.namedContext('urlValidationContext');
