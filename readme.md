# js-data-schema-rules 
Custom Rules for [js-data-schema](http://github.com/js-data/js-data-schema)

## Installation and Usage 
`bower install js-data js-data-schema js-data-schema-rules`

from inside your app
`require('js-data-schema-rules')(schemator)`

## Available Rules
### lowercase 
enforces lowercase-only strings 

### unwrapped 
enforces that a string start and end with a character (not a space)

e.g:
```javascript
schemator.defineSchema('Person', { name: 'string', unwrapped: true})

Schemator.validateSync('Person', { name: 'Montgomery'}); // passes
Schemator.validateSync('Person', { name: ' Montgomery '}); // FAIL
Schemator.validateSync('Person', { name: ' Montgomery'}); // FAIL
Schemator.validateSync('Person', { name: 'Montgomery '}); // FAIL
```
