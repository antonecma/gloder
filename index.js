/**
 * Created by Anton L. <anton.ecma@gmail.com> on 06.09.16.
 */
const path = require('path');

/**
 *
 * Load some tasks, configurations and etc, to module
 * @param {string} moduleName - name of module to require (nconf, gulp, etc).
 * @param {string} methodToAdd - name of method to load config or tasks, or etc ('file' for nconf.file() for example)
 * @param {Array.<string>} itemsToLoad - name for load to module ('default' for gulp.task('default'))
 * @param {string} itemsDir - path where items is located
 * @param {string} [ext=''] - extension of items
 * @param {function} [handler] - handle loading process (require for gulp.task('default', require(path)))
 * @returns {Object} included module
 *
 * Example:
 * @example
 * const path = require('path');
 * const gloader = require('gloader');
 * const nconf = gloader('nconf', 'file', ['server'], 'json', path.join(__dirname, '../confs'));
 * const gulp = gloader('gulp', 'task', ['test'], 'js', path.join(__dirname, '../gulp/tasks'), require);
 *
 * nconf.use('server');
 * console.log(nconf.get('port')); //print value from your server.json config file
 *
 * gulp.start('test');//run your test task
 */
const loads = (moduleName, methodToAdd, itemsToLoad, ext = '', itemsDir, handler) => {
    try {
        var module = require(moduleName);
        itemsToLoad.forEach((itemToLoad) => {
            const pathFrom = ext === '' ? path.join(itemsDir, `${itemToLoad}`) : path.join(itemsDir, `${itemToLoad}.${ext}`);
            if(handler) {
                module[methodToAdd](itemToLoad, handler(pathFrom));
            } else {
                module[methodToAdd](itemToLoad, pathFrom);
            }
        });
    } catch (err) {
        throw err;
    }
    return module;
};

module.exports = loads;