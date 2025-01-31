const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");

const BASE_URL = "https://aera.kz";

const links = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/about", changefreq: "weekly", priority: 0.8 },
  { url: "/contact", changefreq: "monthly", priority: 0.5 },
];

const sitemap = new SitemapStream({ hostname: BASE_URL });

const writeStream = createWriteStream("./public/sitemap.xml");

sitemap.pipe(writeStream);

links.forEach((link) => sitemap.write(link));

sitemap.end();

streamToPromise(sitemap)
  .then(() => console.log("✅ Sitemap создан: public/sitemap.xml"))
  .catch(console.error);
