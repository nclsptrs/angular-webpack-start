var gulp = require('gulp');
var eslint = require('gulp-eslint');
var eslintReporter = require('eslint-html-reporter');
var del = require('del');
var gutil = require('gulp-util');
var inject = require('gulp-inject');
var karmaServer = require('karma').Server;
var runSequence = require('run-sequence');
var webpack = require('webpack');
var webpackConfigFactory = require('./webpack.config.factory');
var WebpackDevServer = require('webpack-dev-server');
var webpackStream = require('webpack-stream');
var fs = require('filendir');
var path = require('path');


// gulp                    // default: webpack-dev-server
// gulp build              // bundle files for production
// gulp test               // run eslint and unit tests
// gulp webpack-dev-server // run webpack-dev-server with auto reload ( http://localhost:8000/webpack-dev-server/ )


gulp.task('default', ['webpack-dev-server']);


// serve
gulp.task('webpack-dev-server', function () {
    var config = webpackConfigFactory('development');
    new WebpackDevServer(webpack(config), config.devServer).listen(8000);

    gutil.log('webpack-dev-server running on', 'http://localhost:8000/webpack-dev-server/');
});


// test
gulp.task('lint', function () {
    return gulp.dest('tests')
    .pipe(gulp.src(['./app/**/*.js', '!./app/build/*.js']))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.format(eslintReporter, function (results) {
        fs.writeFile(path.join(__dirname, 'reports/eslint/index.html'), results);
    }));
    //.pipe(eslint.failOnError());
});

gulp.task('karma', function (done) {
    karmaServer.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function () {
        done();
    });
});

gulp.task('test', function () {
    runSequence(['lint', 'karma']);
});

// build dist folder
gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('copy-assets-to-dist', function () {
    return gulp.src(['app/assets/**/*.*'])
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('copy-to-dist', ['copy-assets-to-dist'], function () {
    return gulp.src(['app/**/*.html', '!./app/index.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('index', function () {
    var target = gulp.src('./app/index.html');
    var sources = gulp.src(['./build/*.css', './build/vendor*.js', './build/*.js'], { cwd: __dirname + '/dist/', read: false });

    return target
    .pipe(inject(sources))
    .pipe(gulp.dest('./dist'));
});

gulp.task('bundle', function () {
    return gulp.src('./app/index.js')
    .pipe(webpackStream(webpackConfigFactory('staging')))
    .on('error', function () {
        process.exit(1);
    })
    .pipe(gulp.dest('dist/build'));
});

gulp.task('build', function () {
    runSequence('clean', 'bundle', 'copy-to-dist', 'index');
});
