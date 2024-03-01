/* eslint-env node */
const path = require('path');

const {task, src, dest, series, parallel} = require('gulp');
const sass = require('gulp-dart-sass');
const replace = require('gulp-replace');
const ts = require('gulp-typescript');
const rimraf = require('rimraf');

const BUILD_DIR = path.resolve('build');

task('clean', (done) => {
    rimraf.sync(BUILD_DIR);
    done();
});

function compileTs(modules = false) {
    const tsProject = ts.createProject('tsconfig.json', {
        declaration: true,
        ...(modules ? undefined : {verbatimModuleSyntax: false}),
        module: modules ? 'esnext' : 'commonjs',
    });
    return src(['src/**/*.{ts,tsx}', '!src/**/__stories__/**/*.{ts,tsx}'])
        .pipe(replace(/import '.+\.scss';/g, (match) => match.replace('.scss', '.css')))
        .pipe(tsProject())
        .pipe(dest(path.resolve(BUILD_DIR, modules ? 'esm' : 'cjs')));
}

task('ts-compile-esm', () => {
    return compileTs(true);
});

task('ts-compile-cjs', () => {
    return compileTs();
});

task('i18n', () => {
    return src('src/**/i18n/*.json')
        .pipe(dest(path.resolve(BUILD_DIR, 'esm')))
        .pipe(dest(path.resolve(BUILD_DIR, 'cjs')));
});

task('styles', () => {
    return src(['src/**/*.scss', '!src/**/__stories__/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(path.resolve(BUILD_DIR, 'esm')))
        .pipe(dest(path.resolve(BUILD_DIR, 'cjs')));
});

task('build', series(['clean', parallel(['ts-compile-cjs', 'ts-compile-esm', 'i18n']), 'styles']));

task('default', series(['build']));
