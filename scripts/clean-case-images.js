const fs = require("fs");
const p = "C:/Users/Dell/the-upward-scale/src/data/caseStudiesData.js";
let t = fs.readFileSync(p, "utf8");
t = t.replace(/\n\s*imageUrl: "[^"]*",/g, "");
t = t.replace(/\n\s*imageAlt: "[^"]*",/g, "");
fs.writeFileSync(p, t);
console.log("case studies cleaned", /imageUrl/.test(t));
