const markdownItAnchor = require("markdown-it-anchor");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginNavigation = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const yaml = require("js-yaml");

module.exports = function(eleventyConfig) {

	eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

	eleventyConfig.addWatchTarget("src/**/*.{svg,webp,png,jpeg}");

	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginBundle);

	eleventyConfig.amendLibrary("md", mdLib => {
		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: "before",
				class: "header-anchor",
				symbol: "#",
				ariaHidden: false,
			}),
			level: [1,2,3,4],
			slugify: eleventyConfig.getFilter("slugify")
		});
	});

	eleventyConfig.addPassthroughCopy({
		"./node_modules/prismjs/themes/prism-okaidia.css": "/stylesheets/prism-okaidia.css",
		"src/javascript/": "/javascript/"
	});

  return {

    dir: {
      input: 'src',
      output: 'dist',
      includes: 'templates/includes',
      layouts: 'templates/layouts',
      data: 'data',
    },

    dataTemplateEngine: 'njk',
    markdownTemplateEngine: false,
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true,
    templateFormats: ['md', 'njk'],

  }

};
