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

  // WHERE filter
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

  // Reverse filter
  eleventyConfig.addFilter("reverse", (arr) => {
    if (!Array.isArray(arr)) return [];
    return [...arr].reverse();
  });

  // First filter
  eleventyConfig.addFilter("first", (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return arr[0];
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

  eleventyConfig.addCollection("chronicles", collection => {
    return collection.getFilteredByGlob("content/chronicles/*.md")
      .sort((a, b) => (a.data.episode_number || 0) - (b.data.episode_number || 0));
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
