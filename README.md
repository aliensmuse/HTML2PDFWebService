# PDFRenderService

For more than 20 years I have worked with rendering information collected from all sorts of datasources to the end user typically using HTML.  Almost all of the same end users inevitably have asked for a means to print out these elaborate displays of information.  One such way has been to convert the HTML into a PDF so that the final document can be distributed and printed from printers and other print services not necessarily attached to the computer the end user was viewing the HTML on.

Rendering HTML to PDF is not a new concept and there are MANY such open source projects on doing so.  What I have attempted to do is create a webservice that can be used to render a PDF from two items passed into it: 1) a template file and 2) an unknown datafile formatted using JSON.

To create this webservice I chose the following tools:
1. NodeJS (www.nodejs.org) - I recommend 8 or greater
2. Puppeteer (pptr.dev) - headless chromes debug api exposed through libraries and accessible through javascript
3. HandlebarsJS (handlebarsjs.com/) - templating using javascript
4. Jquery - required by HandlebarsJS

