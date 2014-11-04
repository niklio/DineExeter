DineExeter
==========
### Rules - this is important
* Please abide by best practices of whichever language you are working in.
* https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml about sums it up for Javascript, just keep it clean and commented please.
* Clean commits are certainly prefered.  Make sure to comment all commits thoroughly.
### Dining Hall Data
#### Data scraping
* Scraper.js was the in browser implementation of the scraper using JQuery.
* This has been moved to index.js and is now being done with Cheerio.

#### Data storage
* Using Mongodb on a Heroku server.
* Storing in JSON format with noSQL, not much else to say here

#### Mobile integration
* So this isn't really my problem, I'll let colby figure it out.
* Need to integrate the REST API in index.js with whichever mobile platform, I'm sure this will be well documented.
* Middleware will be clean, probably something along the lines of '/:dhall/:meal', the rest can be processed in Java/C#, Montana should help Colby with the client side processing because he will have a grasp on that.

#### Mobile Design
* This hasn't been pushed yet because I am still on the fence about native versus web.  Probably going with native, but this makes me nervous because I am not strong with C#.
* Android will be the first prototype - Colby
* Windows development? - Montana
* IOS - Colby or Nik
* I want code to be as clean as UI, if it is unreadable it will be deleted.

### Initial concept
#### Prototype phase
  * Pulling from an aspx page
  * Using ~~JQuery~~ Cheerio and relying on the formatting of the page to stay the same for the prototype phase.
  * While this is safe for now, I should probably pull from whatever database in the final version.  Ill talk to ITS later
    
#### Serverless app - Scrapped (this was a dumb idea)
  * So this definitely could run without a server in theory, but I may have to implement a node server.
  x* Ideally I will run the script in my page context and return all on client side, but we will have to see what happens
