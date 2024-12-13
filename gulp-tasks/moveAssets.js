const {src, dest} = require('gulp')
function moveAssets() {
    return src('./src/assets/**/*') // Match all assets
        .pipe(dest('./build/assets')); // Output assets to build/assets
}

module.exports = moveAssets;

