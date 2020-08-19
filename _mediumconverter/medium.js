const mediumToMarkdown = require('medium-to-markdown');
 
// Enter url here
mediumToMarkdown.convertFromUrl('https://medium.com/@simonaharman/defi-the-dangerous-game-of-governance-tokens-loki-f83703d74667')
.then(function (markdown) {
  console.log(markdown); //=> Markdown content of medium post
});