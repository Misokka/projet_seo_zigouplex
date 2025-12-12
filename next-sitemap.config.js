module.exports = {
  siteUrl: 'https://www.zigouplex.site',
  generateRobotsTxt: true,
  exclude: [],
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  outDir: './public',
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as https://www.zigouplex.site/path
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
};
