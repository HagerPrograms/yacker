const sitemap = require('nextjs-sitemap-generator');
const path    = require('path');
const schools = require('../../data/schools.json')

const urls = []
schools.map(school => {(urls.push("/"+ school.abrv))});

urls.push('/')


sitemap({
    baseUrl: "http://yacker.co",
    pagesDirectory: path.resolve(__dirname, "../pages"),
    targetDirectory: path.resolve(__dirname, "../scripts"),
    ignoredPaths: [
        "404",
        "loginpage",
        "admin"
    ],
    extraPaths: urls
})