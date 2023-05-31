
# Movies, Web-Series & Animes Search tool all data at one place.

Don't you just hate it when you're trying to find a movie, web series or anime to watch, but you're endlessly scrolling through different websites, dealing with annoying ads and not finding what you're looking for? Well, i build this, You rock it.




## Documentation

🔥How to target any websites

1.Target Website URL replace https://example.in/

2.Select website search input element.

3.Your keyword that your want to search.

4.Select the button element

5.Select display data elemet & Fetch the url / data

###################################################

👉while developing

- Start  - npm run server

👉while production

- Start - pm2 start index.js

- Stop - pm2 stop index.js

- monitor - pm2 monit

- auto restart after 5min -  pm2 restart index.js --cron "*/5 * * * *"



## Lessons Learned

Automation with the Puppeteer library is kind of easy, but when I tried to handle queries for multiple users, it became really difficult to manage. 

However, I found a solution that helped me a lot.

I used a single browser with a global variable so that every query is searched in one browser, which avoids opening many browsers, and closes every page after execution

req.resourceType() === 'image' || // block images
                req.resourceType() === 'stylesheet' || // block stylesheets
                req.resourceType() === 'font' || // block fonts
                req.resourceType() === 'script' // block scripts


This helps me to execute more faster.


## Features

- Target multiple websites at once
- Faster results
- Automation
- All data at one place


## 🛠 Skills
🔥Javascript, HTML, CSS, Node js







## Authors

- [Yogesh](https://github.com/jmtygsh)


