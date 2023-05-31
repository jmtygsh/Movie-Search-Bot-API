const puppeteer = require('puppeteer-extra')
const stealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(stealthPlugin())
process.setMaxListeners(Infinity);
require('dotenv').config()


const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");


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



app.post('/holly', async function (req, res) {

    const checkKey = req.body.passcode
    const gotKey = req.body.keywordValue

    console.log('got keyword === ', gotKey)


    if (checkKey !== process.env.PASSCODE) {
        console.log("someone try to use your api - keyword not match")
    } else {
        const movieName = req.body.keywordValue
        let imgaesUrls;

        const start = async (url, selectSearch, keyword, click, fatchdata, browser, imagesUrl) => {
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
            })

            await page.goto(url, { timeout: 60000 }); // increase timeout to 60 seconds
            await page.type(selectSearch, keyword);
            // await Promise.all([page.click(click), page.waitForNavigation()]);
            await Promise.all([page.keyboard.press('Enter'), page.waitForNavigation()])

            const links = await page.$$(fatchdata)
            const imgs = await page.$$(imagesUrl)


            const hrefs = await Promise.all(
                links.map((link) =>
                    link
                        .getProperty('href')
                        .then((href) => href.jsonValue())

                )
            );

            imgaesUrls = await Promise.all(
                imgs.map((url) =>
                    url
                        .getProperty('src')
                        .then((src) => src.jsonValue())

                )
            );


            page.close()
            return hrefs;
        }

        const runSearch = async (url, selectSearch, click, fatchdata, imagesUrl) => {
            const browser = await browserPromise; // reuse browser instance
            const hrefs = await start(url, selectSearch, movieName, click, fatchdata, browser, imagesUrl);
            return hrefs;
        };

        const sendResult = (result, image) => {
            res.write(JSON.stringify(result, image));
        };


        // 'https://moviesmod.net.in/',
        // '#searchform input',
        // '#searchform button',
        // '.latestPost h2 a',
        // '.latestPost img'


        // 'https://hdhub4u.report/',
        //     '.input-group input',
        //     '.pull-right form',
        //     '.recent-movies figure a',
        //     '.recent-movies img'


        // 'https://vegamovies.party/',
        // `.top-search-box-wrapper input[type='text']`,
        // `.top-search-box-wrapper input[type='submit']`,
        // '.blog-pic-wrap a',
        // '.blog-pic-wrap img'


        const result = await runSearch(
            'https://moviesflix.bz/',
            '#searchform input',
            '#searchform button',
            '.latestPost h2 a',
            '.latestPost img'
        )

        if (result.length !== 0) {
            sendResult({ result, imgaesUrls });
        } else {
            const result = await runSearch(
                'https://moviesmod.net.in/',
                '#searchform input',
                '#searchform button',
                '.latestPost h2 a',
                '.latestPost img'
            )
            sendResult({ result, imgaesUrls });
        }

        res.end();
        console.log(`Executed Hollywood - ${movieName}`)
    }

})



app.post('/bolly', async function (req, res) {

    const checkKey = req.body.passcode
    const gotKey = req.body.keywordValue

    console.log('got keyword === ', gotKey)


    if (checkKey !== process.env.PASSCODE) {
        console.log("someone try to use your api - keyword not match")
    } else {
        const movieName = req.body.keywordValue
        let imgaesUrls;

        const start = async (url, selectSearch, keyword, click, fatchdata, browser, imagesUrl) => {
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
            })

            await page.goto(url, { timeout: 60000 }); // increase timeout to 60 seconds
            await page.type(selectSearch, keyword);
            // await Promise.all([page.click(click), page.waitForNavigation()]);
            await Promise.all([page.keyboard.press('Enter'), page.waitForNavigation()])

            const links = await page.$$(fatchdata);

            //images fatch
            // const imgs = await page.$$('.latestPost img')
            const imgs = await page.$$(imagesUrl)

            const hrefs = await Promise.all(
                links.map((link) =>
                    link
                        .getProperty('href')
                        .then((href) => href.jsonValue())

                )
            );

            imgaesUrls = await Promise.all(
                imgs.map((url) =>
                    url
                        .getProperty('src')
                        .then((src) => src.jsonValue())

                )
            );


            page.close()
            return hrefs;
        }

        const runSearch = async (url, selectSearch, click, fatchdata, imagesUrl) => {
            const browser = await browserPromise; // reuse browser instance
            const hrefs = await start(url, selectSearch, movieName, click, fatchdata, browser, imagesUrl);
            return hrefs;
        };

        const sendResult = (result, image) => {
            res.write(JSON.stringify(result, image));
        };


        const result = await runSearch(
            'https://topmovies.live/',
            '.header-search input',
            '#searchform button',
            '.latestPost h2 a',
            '.latestPost img'
        )

        if (result.length !== 0) {
            sendResult({ result, imgaesUrls });
        } else {
            const result = await runSearch(
                'https://hdmovie2.vc/',
                '.search-page input',
                '.search-page button',
                '.result-item .details a',
                '.result-item img'
            )
            if (result.length !== 0) {
                sendResult({ result, imgaesUrls });
            }
        }

        res.end();
        console.log(`Executed Bollywood - ${movieName}`)
    }

})



app.post('/anime', async function (req, res) {

    const checkKey = req.body.passcode
    const gotKey = req.body.keywordValue

    console.log('got keyword === ', gotKey)


    if (checkKey !== process.env.PASSCODE) {
        console.log("someone try to use your api - keyword not match")
    } else {
        const movieName = req.body.keywordValue
        let imgaesUrls;

        const start = async (url, selectSearch, keyword, click, fatchdata, browser, imagesUrl) => {
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
            })

            await page.goto(url, { timeout: 60000 }); // increase timeout to 60 seconds
            await page.type(selectSearch, keyword);
            // await Promise.all([page.click(click), page.waitForNavigation()]);
            await Promise.all([page.keyboard.press('Enter'), page.waitForNavigation()])

            const links = await page.$$(fatchdata);

            //images fatch
            // const imgs = await page.$$('.latestPost img')
            const imgs = await page.$$(imagesUrl)

            const hrefs = await Promise.all(
                links.map((link) =>
                    link
                        .getProperty('href')
                        .then((href) => href.jsonValue())

                )
            );

            imgaesUrls = await Promise.all(
                imgs.map((url) =>
                    url
                        .getProperty('src')
                        .then((src) => src.jsonValue())

                )
            );


            page.close()
            return hrefs;
        }

        const runSearch = async (url, selectSearch, click, fatchdata, imagesUrl) => {
            const browser = await browserPromise; // reuse browser instance
            const hrefs = await start(url, selectSearch, movieName, click, fatchdata, browser, imagesUrl);
            return hrefs;
        };

        const sendResult = (result, image) => {
            res.write(JSON.stringify(result, image));
        };


        const result = await runSearch(
            'https://animeflix.net.in/',
            '.header-search input',
            '#searchform button',
            '.latestPost h2 a',
            '.latestPost img'
        )

        if (result.length !== 0) {
            sendResult({ result, imgaesUrls });
        } else {
            const result = await runSearch(
                'https://animeheaven.ru/',
                '.searchinput',
                '.search-form .btn',
                '.condd a',
                '.ieppic img'
            )
            if (result.length !== 0) {
                sendResult({ result, imgaesUrls });
            }
        }

        res.end();
        console.log(`Executed animes - ${movieName}`)
    }

})


const port = process.env.PORT || 8001;
app.listen(port, function () {
    console.log(`Server live ${port}`);
});
