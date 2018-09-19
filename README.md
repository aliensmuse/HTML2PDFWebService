# HTML2PDFWebService

For more than 20 years I have worked with rendering information collected from all sorts of datasources to the end user typically using HTML.  Almost all of the same end users inevitably have asked for a means to print out these elaborate displays of information.  One such way has been to convert the HTML into a PDF so that the final document can be distributed and printed from printers and other print services not necessarily attached to the computer the end user was viewing the HTML on.

Rendering HTML to PDF is not a new concept and there are MANY such open source projects on doing so.  What I have attempted to do is create a webservice that can be used to render a PDF from two items passed into it: 1) a template file and 2) an unknown datafile formatted using JSON.

To create this webservice I chose the following tools:
1. NodeJS (www.nodejs.org) - I recommend 8 or greater
2. Puppeteer (pptr.dev) - headless chromes debug api exposed through libraries and accessible through javascript
3. HandlebarsJS (handlebarsjs.com/) - templating using javascript
4. JQUERY - required by HandlebarsJS

Setting Up:

1. Clone the project
2. npm install
3. node example.js 

By default this application will run as localhost on port 5000

Testing: 
Using POSTMAN

Perform a POST API call to the URL: http://localhost:5000/api/render
Under Headers:  
* Set a key up named: Content-Type
* Set the corresponding value as: application/x-www-form-urlencoded

Under BODY:
Set the body content type radio button to x-www-form-urlencoded
Then create two keys:

First Key Name:  template

The template will contain your handlebars formatted HTML.  
An example:  Title: {{title}}</br> First Name: {{fname}}

Second Key Name:  data
The second key "data" will contain the corresponding JSON data set that will have the values substituted into the template.

Example: { title: "A new order", fname: "Bill Smith"}

Once you have setup the headers and body you are ready to SEND the data to the webservice.  Doing so with POSTMAN will result in a filestream of content-type application/pdf.  You will be prompted to save a file named: download.pdf

The end result should look like:
  
  Title: A new order
  
  First Name: Bill Smith
