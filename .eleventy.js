module.exports = function (eleventyConfig) {
  // Copy these folders straight to the output (_site) unchanged
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
  };
};
