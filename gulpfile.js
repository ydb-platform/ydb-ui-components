/* eslint-env node */
const path = require('path');
const {task, src, dest, series, parallel} = require('gulp');
const rimraf = require('rimraf');
const replace = require('gulp-replace');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const sass = require('gulp-dart-sass');

const BUILD_DIR = path.resolve('build');

task('clean', (done) => {
    rimraf.sync(BUILD_DIR);
    rimraf.sync('styles/**/*.css');
    done();
});

task('ts-compile', () => {
    return src(['src/**/*.{ts,tsx}', '!src/**/__stories__/**/*.{ts,tsx}'])
        .pipe(replace(/import '.+\.scss';/g, (match) => match.replace('.scss', '.css')))
        .pipe(
            babel({
                presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            }),
        )
        .pipe(dest(path.resolve(BUILD_DIR)));
});

task('ts-declaration', () => {
    const tsProject = ts.createProject('tsconfig.json', {
        declaration: true,
        emitDeclarationOnly: true,
        isolatedModules: false,
    });

    return src(['src/**/*.{ts,tsx}', '!src/**/__stories__/**/*.{ts,tsx}'])
        .pipe(tsProject())
        .pipe(dest(path.resolve(BUILD_DIR)));
});

task('styles', () => {
    return src(['src/**/*.scss', '!src/**/__stories__/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(path.resolve(BUILD_DIR)));
});

task('build', series(['clean', parallel(['ts-compile', 'ts-declaration']), 'styles']));

task('default', series(['build']));
