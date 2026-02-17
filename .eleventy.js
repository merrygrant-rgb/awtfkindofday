module.exports = function(eleventyConfig) {

  // Copy static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");

  // Date filter
  eleventyConfig.addFilter("readableDate", dateObj => {
    return new Date(dateObj).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  });

  // Limit filter
  eleventyConfig.addFilter("limit", (arr, limit) => {
    if (!Array.isArray(arr)) return [];
    return arr.slice(0, limit);
  });

  // WHERE filter (this was missing - now fixed!)
  eleventyConfig.addFilter("where", function(array, key, value) {
    if (!Array.isArray(array)) return [];
    return array.filter(item => {
      const keys = key.split('.');
      let val = item;
      for (const k of keys) {
        val = val && val[k];
      }
      return val == value;
    });
  });

  // Collections
  eleventyConfig.addCollection("posts", collection => {
    return collection.getFilteredByGlob("content/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("featuredPosts", collection => {
    return collection.getFilteredByGlob("content/posts/*.md")
      .filter(post => post.data.featured === true)
      .sort((a, b) => b.date - a.date)
      .slice(0, 3);
  });

  eleventyConfig.addCollection("merch", collection => {
    return collection.getFilteredByGlob("content/merch/*.md");
  });

  eleventyConfig.addCollection("submissions", collection => {
    return collection.getFilteredByGlob("content/submissions/*.md")
      .filter(sub => sub.data.featured === true)
      .slice(0, 1);
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"]
  };
};
