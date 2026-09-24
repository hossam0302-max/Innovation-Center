const fs = require("fs");
const t = fs.readFileSync("safta3.html", "utf8");
const needle = 'class="safta-head-backs"';
const i = t.indexOf(needle);
console.log(t.slice(Math.max(0, i - 20), i + 800));
