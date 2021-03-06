/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/03/16 - 14:54
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
/*jslint node: true */
// ----------------------------------------------------------------
"use strict";

// Gulp Module
var gulp = require( 'gulp' );

var runSequence = require('run-sequence');
var size = require('gulp-size');

var concat = require( 'gulp-concat' );
var rename = require( 'gulp-rename' );
// var uglifyjs = require( 'gulp-uglifyjs' );
var uglify = require( 'gulp-uglify' );

var shell = require( 'gulp-shell' );

var plumber = require( 'gulp-plumber' );

var changed = require('gulp-changed');

var cache = require('gulp-cache');

var rimraf = require('rimraf');
var del = require('del');

var path = require( 'path' );

var cached = require( 'gulp-cached' );

var yuidoc = require( 'gulp-yuidoc' );

var replace = require('gulp-replace-task');

// var jshint = require('gulp-jshint');
var eslint = require('gulp-eslint');

// ----------------------------------------------------------------
// Directory
var dir = require( './setting.json' );

// ----------------------------------------------------------------
// package
var pkg = require( './package.json' );

// ----------------------------------------------------------------
// patterns, replace task
var patterns = [
  {
    match: 'version',
    replacement: pkg.version
  },
  {
    match: 'buildTime',
    replacement: new Date().toLocaleString()
  },
  {
    match: 'year',
    replacement: new Date().getFullYear()
  },
  {
    match: 'url',
    replacement: pkg.repository.url
  }
];
// ----------------------------------------------------------------
//  scripts
// ----------------------------------------------------------------
var libName = 'wakegi.js';
var scripts = [];

scripts.push( dir.src + '/wakegi.js' );

// Browser
scripts.push( dir.src + '/Browser.js' );

// Utility
scripts.push( dir.src + '/util/Iro.js' );
scripts.push( dir.src + '/util/Util.js' );

// CSS3
scripts.push( dir.src + '/css/Patterns.js' );
scripts.push( dir.src + '/css/Css3.js' );
scripts.push( dir.src + '/css/Transition.js' );
scripts.push( dir.src + '/css/Transform.js' );

// document
scripts.push( dir.src + '/document/Element.js' );
scripts.push( dir.src + '/document/Dom.js' );
scripts.push( dir.src + '/document/Dataset.js' );

// device
scripts.push( dir.src + '/device/Windows.js' );

scripts.push( dir.src + '/device/iOS.js' );

scripts.push( dir.src + '/device/Mac.js' );

scripts.push( dir.src + '/device/Android.js' );
scripts.push( dir.src + '/device/Touch.js' );
scripts.push( dir.src + '/device/Mobile.js' );

// ua
scripts.push( dir.src + '/browser/FxiOS.js' );
scripts.push( dir.src + '/browser/Edge.js' );
scripts.push( dir.src + '/browser/IE.js' );
scripts.push( dir.src + '/browser/CriOS.js' );
scripts.push( dir.src + '/browser/Chrome.js' );
scripts.push( dir.src + '/browser/Firefox.js' );
scripts.push( dir.src + '/browser/Safari.js' );


// ----------------------------------------------------------------
//  task
// ----------------------------------------------------------------
// concat to libs
gulp.task( 'script-concat', function() {

  return gulp.src( scripts )
    .pipe( concat( libName ) )
    .pipe(gulp.dest( dir.libs ) )
    .pipe(rename( function(pathObj) {

      pathObj.basename = pathObj.basename + '-' + pkg.version;

    } ) )
    .pipe(gulp.dest( dir.libs ) )
    .pipe(size( { title: '*** script-concat ***' } ) );

} );

// min inside libs
gulp.task( 'script-min', function() {

  return gulp.src(
    [
      dir.libs + '/*.js',

      '!' + dir.libs + '/*.min.js'
    ] )
    // .pipe(uglify( { preserveComments: 'some' } ) )
    .pipe(uglify(
      {
        output: {
          comments: 'some'
        }
      }
    ))
    .pipe(rename( { suffix: '.min' } ) )
    .pipe(gulp.dest( dir.libs ) )
    .pipe(size( { title: '*** script-min ***' } ) );

} );

// build time, version
gulp.task( 'script-version', function() {

  return gulp.src( dir.libs + '/*.js' )
    .pipe(replace( { patterns: patterns } ) )
    .pipe(gulp.dest( dir.libs ) )
    .pipe(size( { title: '*** script-version ***' } ) );

} );

// YUIDocs
gulp.task( 'script-docs', function() {

  return gulp.src( scripts )
    .pipe(yuidoc.parser() )
    .pipe(yuidoc.generator() )
    .pipe(gulp.dest( dir.docs ) );
} );

// // Lint JavaScript
// gulp.task('js-hint', function () {
//   return gulp.src( dir.src + '/**/*.js' )
//     .pipe(jshint() )
//     .pipe(jshint.reporter('jshint-stylish'));
// });

// ESLint
gulp.task('js:eslint', function() {
  return gulp.src(dir.src + '/**/*.js')
    .pipe(eslint({
      useEslintrc: false,
      configFile: '../eslint.es5.yml'
    }))
    .pipe(eslint.format())
    .pipe(size( { title: '*** js:eslint ***' } ) );
});


// ----------------------------------------------------------------
// build
gulp.task( 'build', function() {
  runSequence(
    // 'js-hint',
    'js:eslint',
    'script-concat',
    'script-min',
    'script-version'
  );
});

// build with docs
gulp.task( 'build-api', function() {
  runSequence(
    // 'js-hint',
    'js:eslint',
    'script-concat',
    'script-min',
    'script-version',
    'script-docs'
  );
});
