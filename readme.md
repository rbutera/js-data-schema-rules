# js-data-schema-rules 
Custom Rules for [js-data-schema](http://github.com/js-data/js-data-schema)

## Installation and Usage 
`bower install js-data js-data-schema js-data-schema-rules`

from inside your app
`require('js-data-schema-rules')(schemator)`

## Available Rules
### lowercase 
enforces lowercase-only strings 

```javascript
schemator.defineSchema('Person', { name: {type: 'string', lowercase: true}})
```

### unwrapped 
enforces that a string start and end with a character (not a space)

e.g:
```javascript
schemator.defineSchema('Person', { name: {type: 'string', unwrapped: true}})

Schemator.validateSync('Person', { name: 'Montgomery'}); // passes
Schemator.validateSync('Person', { name: ' Montgomery '}); // FAIL
Schemator.validateSync('Person', { name: ' Montgomery'}); // FAIL
Schemator.validateSync('Person', { name: 'Montgomery '}); // FAIL
```

### isEmail 
checks if a string is an email address

```javascript
schemator.defineSchema('Person', { email: {type: 'string', isEmail: true}});
```

**NB:** you should still send an email!

### enum 
lets you specify an array of possible values 
```javascript
schemator.defineSchema('Person', { sex: {type: 'string', enum: ['male', 'female']}});
Schemator.validateSync('Person', { sex: 'male'}); // PASS
Schemator.validateSync('Person', { sex: ' yes please'}); // FAIL
```
