/**
 * Dynamically sets metatag for robots index based on ELEVENTY_ENV.
 *
 * @returns {string} value.
 */

module.exports = () => {
    let index;
    if (process.env.ELEVENTY_ENV == 'production') {
        index = 'index, follow';
    } else {
        index = 'noindex, nofollow';
    }
    return index;
};