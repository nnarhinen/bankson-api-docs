'use strict';

var schemas = require('bankson-schemas/schemas')
  , fs = require('fs')
  , path = require('path');


var out = fs.createWriteStream(path.join(__dirname, '..', 'source', 'includes', '_schemas.md'), { flags: 'w', defaultEncoding: 'utf8' });
out.write('# JSON Schemas\n\n');

Object.keys(schemas).forEach(function(key) {
  var data = JSON.stringify(Object.assign({}, {
    $schema: 'http://json-schema.org/draft-04/schema'
  }, schemas[key]), null, '  ');

  out.write('## Schema: ' + key);
  out.write('\n\n');
  out.write('````json\n');
  out.write(data);
  out.write('\n````\n\n');
});

out.end();
