require('dotenv').config();
const UserConfig = require('@11ty/eleventy/src/UserConfig');
const glob = require('fast-glob');
const path = require('path');
const fs = require('fs');
const del = require('del');
const rssPlugin = require('@11ty/eleventy-plugin-rss');
const navigationPlugin = require('@11ty/eleventy-navigation');
const mkuiPlugin = require('@marke/ui-core/tools/plugins/11ty');
const Nunjucks = require('nunjucks');
const updateIndexes = require('./src/assets/js/utils/update-indexes');

/**
 * Eleventy configuration
 * @param {UserConfig} eleventyConfig Config API
 */
module.exports = (eleventyConfig) => {
  // Clean previous builds on production environments
  if (process.env.ELEVENTY_ENV == 'production') {
    const dirToClean = ['dist/**', '!dist/assets/**'];
    del(dirToClean);
  }

  // Add eleventy plugins
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(navigationPlugin);
  eleventyConfig.addPlugin(mkuiPlugin);

  // Setup nunjucks environment instance for template layouts
  const commonLoaderOptions = {
    trimBlocks: true,
    lstripBlocks: true,
  };
  if (process.env.ELEVENTY_ENV == 'development') {
    global.nunjucksEnvironment = new Nunjucks.Environment([
      new Nunjucks.FileSystemLoader(['src/layouts', 'node_modules/@marke/ui-core/components'], {
        ...commonLoaderOptions,
        watch: true,
      }),
      new Nunjucks.NodeResolveLoader({ ...commonLoaderOptions, watch: true }),
    ]);
  } else {
    global.nunjucksEnvironment = new Nunjucks.Environment([
      new Nunjucks.FileSystemLoader(['src/layouts', 'node_modules/@marke/ui-core/components'], { ...commonLoaderOptions }),
      new Nunjucks.NodeResolveLoader({ ...commonLoaderOptions }),
    ]);
  }
  eleventyConfig.setLibrary('njk', global.nunjucksEnvironment);

  // Eleventy config dir options
  const dirs = {
    input: 'src',
    output: 'dist',
    data: 'data/global',
    layouts: 'layouts',
  };

  // Add watch targets
  eleventyConfig.addWatchTarget('./src/filters/');
  eleventyConfig.addWatchTarget('./src/shortcodes/');
  eleventyConfig.addWatchTarget('./src/transforms/');
  eleventyConfig.addWatchTarget('./src/collections/');

  // Dynamically get the path for all project filters, shortcodes, tranforms, collections and layouts
  const paths = {
    filters: path.join(process.cwd(), './src/filters/**/*.js'),
    shortcodes: path.join(process.cwd(), './src/shortcodes/**/*.js'),
    transforms: path.join(process.cwd(), './src/transforms/**/*.js'),
    collections: path.join(process.cwd(), './src/collections/**/*.js'),
    layouts: path.join(process.cwd(), './src/layouts/**/*.js'),
  };

  // Returns an array of matching entries for the paths
  const layouts = glob.sync(paths.layouts);
  const filters = glob.sync(paths.filters);
  const shortcodes = glob.sync(paths.shortcodes);
  const transforms = glob.sync(paths.transforms);
  const collections = glob.sync(paths.collections);

  // Add aliases for each found layouts
  layouts.forEach((layout) => eleventyConfig.addLayoutAlias(path.basename(layout, '.njk'), path.basename(layout)));
  // Add all found filters
  filters.forEach((filter) => eleventyConfig.addFilter(path.basename(filter, '.js'), require(filter)));
  // Add all found shortcodes
  shortcodes.forEach((shortcode) => eleventyConfig.addShortcode(path.basename(shortcode, '.js'), require(shortcode)));
  // Add all found transforms
  transforms.forEach((transform) => eleventyConfig.addTransform(path.basename(transform, '.js'), require(transform)));
  // Add all found collections
  collections.forEach((collection) => eleventyConfig.addCollection(path.basename(collection, '.js'), require(collection)));

  // Opts in to a full deep merge when combining the Data Cascade
  eleventyConfig.setDataDeepMerge(true);

  // robots.txt passthrough
  eleventyConfig.addPassthroughCopy('src/robots.txt');

  // Setup 404 for browsersync live reload on development environments
  if (process.env.ELEVENTY_ENV == 'development') {
    eleventyConfig.setBrowserSyncConfig({
      https: true,
      open: 'local',
      callbacks: {
        ready: (err, browserSync) => {
          const content_404 = fs.readFileSync('dist/404.html');
          browserSync.addMiddleware('*', (req, res) => {
            res.write(content_404);
            res.end();
          });
        },
      },
    });
  }

  // Add a afterBuild listener to update Algolia indexes in production
  eleventyConfig.on('afterBuild', async () => {
    if (process.env.ELEVENTY_ENV == 'production') {
      const data = fs.readFileSync(path.resolve(dirs.output, 'search-indexes.json'));
      const indexes = JSON.parse(data);
      await updateIndexes(indexes);
    }
  });

  return {
    dir: dirs,
    passthroughFileCopy: true,
  };
};
