const paymentController = require('./paymentController')
const puppeteer = require('puppeteer-extra')
const stealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(stealthPlugin())
process.setMaxListeners(Infinity);

const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config()

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());


const browserPromise = puppeteer.launch({
    headless: true,
    args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
    ]
}); // launch browser instance

app.get('/', (req, res) => {
    const name = req.query.name || 'I am - dumb-bots api ';
    res.send(`Hello, ${name}!`);
});

app.get('/hello', (req, res) => {
    const name = 'i developed by ygsh';
    res.send(`Hello, ${name}!`);
});



app.post('/list', async function (req, res) {

    const movieName = req.body.keywordValue
    console.log('movies name == ', movieName)

    const start = async (url, selectSearch, keyword, click, fatchdata, browser) => {
        const page = await browser.newPage(); // create new page instance

        // set page options to improve speed
        await page.setCacheEnabled(false);
        await page.setRequestInterception(true);

        page.on('request', (req) => {
            if (
                req.resourceType() === 'image' || // block images
                req.resourceType() === 'stylesheet' || // block stylesheets
                req.resourceType() === 'font' || // block fonts
                req.resourceType() === 'script' // block scripts
            ) {
                req.abort();
            } else {
                req.continue();
            }
        });

        await page.goto(url, { timeout: 60000 }); // increase timeout to 60 seconds
        await page.type(selectSearch, keyword);
        await Promise.all([page.click(click), page.waitForNavigation()]);

        const links = await page.$$(fatchdata);

        const hrefs = await Promise.all(
            links.map((link) =>
                link
                    .getProperty('href')
                    .then((href) => href.jsonValue())
            )
        );
        page.close()
        return hrefs;
    }

    const runSearch = async (url, selectSearch, click, fatchdata) => {
        const browser = await browserPromise; // reuse browser instance
        const hrefs = await start(url, selectSearch, movieName, click, fatchdata, browser);
        return hrefs;
    };


    const result = await runSearch(
        'https://moviesmod.net.in/',
        '#searchform input',
        '#searchform button',
        '.latestPost h2 a'
    );

    // const result2 = await runSearch(
    //     'https://hdmovie2.sbs/',
    //     '.search-page input',
    //     '.search-page button',
    //     '.result-item .details a'
    // );

    const sendResult = (result) => {
        res.write(JSON.stringify(result));
    };


    // if you want to send data from two website
    // sendResult({ result, result2 }); 

    
    //if you use two website then comment it
    sendResult({ result }); 

    res.end();
    console.log("Executed:", movieName)
})


app.post('/orders', paymentController.orders)
app.post('/verify', paymentController.verify)



const port = process.env.PORT || 8001;
app.listen(port, function () {
    console.log(`Server live ${port}`);
});
