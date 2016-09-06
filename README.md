# gloder
Load stuff like configs and tasks to a module

**Returns**: <code>Object</code> - included module


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| moduleName | <code>string</code> |  | name of module to require (nconf, gulp, etc). |
| methodToAdd | <code>string</code> |  | name of method to load config or tasks, or etc ('file' for nconf.file() for example) |
| itemsToLoad | <code>Array.&lt;string&gt;</code> |  | name for load to module ('default' for gulp.task('default')) |
| itemsDir | <code>string</code> |  | path where items is located |
| [ext] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | extension of items |
| [handler] | <code>function</code> |  | handle loading process (require for gulp.task('default', require(path))) |

**Example**  
```js
const path = require('path');
const gloader = require('gloader');
const nconf = gloader('nconf', 'file', ['server'], 'json', path.join(__dirname, '../confs'));
const gulp = gloader('gulp', 'task', ['test'], 'js', path.join(__dirname, '../gulp/tasks'), require);

nconf.use('server');
console.log(nconf.get('port')); //print value from your server.json config file

gulp.start('test');//run your test task
```
