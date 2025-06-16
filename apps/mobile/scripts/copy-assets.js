const fs = require('fs-extra');
fs.copySync('../../packages/assets/images', './assets/images');
fs.copySync('../../packages/assets/fonts', './assets/fonts');
