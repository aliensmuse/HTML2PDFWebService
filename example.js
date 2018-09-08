/*
 * Simple HTML PDF Service build on Node / Express / Handlebars and Puppeteer
 * 
 * POST to URL/api/render with body parameters of:
 * template - html with handlebar notation embedded i.e.   <h1>{{title}}</h1>
 * data - corresponding JSON data packet that will be infected into the template i.e. { title: "Welcome" }
 *
 * Author: Casey Riley   
 * License: MIT
 */
 var express = require("express");
 var app = express();
 var bodyParser = require('body-parser');
 const router = express.Router();
 const puppeteer = require('puppeteer');
 
 // setup all API calls to run request through our router instead of normal route handler
 app.use('/api',router);
 
 // Set our API router up to use body parser for handling all of our body content of our POST
 router.use(bodyParser.urlencoded({
    extended: true
}));
 
 // Establish our route for our API
 // POST  URL/api/render  is our REST api endpoint for HTML to PDF rendering
 // Body parameters: 
 //     template - HTML 
 //     data     - JSON formatted data to be rendered into the template using handlebars notation
 //
 router.post('/render',(req,res) => {
	
	//Basic error checking to make sure our two parameters exist
	//check to make sure a req object exists
	//NOTE:  you will want to make sure you add some body size limits here
	//       so someone doesn't overload your server with HTML or data packets
	//       that you never dreamt would come across.
	if (typeof req.body.template === 'undefined'  ) {
		res.statusCode=500;
		res.json({ error: 'Template was not supplied'});
	}  else if ( typeof req.body.data === 'undefined' ) {
		res.statusCode=500;
		res.json({ error: 'Data was not supplied'});
	} else {
	
		temp=req.body.template;
		incomingData=req.body.data;
		
		// New we are going to build the HTML page (with corresponding javascript) that will be executed
		// and rendered through use of puppeteer.
		//
		// First we start with including the libraries that handlebars needs into our
		// HTML page.
		header = '<body><div id="printedPDF">  </div>  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0/handlebars.js"></script><script >  ';

		// Next, we wrap our template (passed in as body content through our API) with necessary code that will be executed by puppeteer.  This is a HANDLEBARS 
        // convention.  Handlebars javascript takes a TEMPLATE and a DATASET and then renders the outcome as an HTML page.
        // We are creating an executable page which will take our two variables of source and data and then render it in puppeteer.		
		template=' const source = "' + temp + '";';
		
		// we wrap our data we passed in similarly to how we wrapped our template
		data='	data = ' + incomingData + ';';
		
		// we add the line of code to our HTML page that will perform the execution of handlebars. 
		footer =' var template = Handlebars.compile(source); 	var output = template(data);  document.getElementById("printedPDF").innerHTML = output;  </script> </body>';
		
		// we assemble the pieces of our HTML page into one variable
		bodycode = header + template + data + footer;
		
		// This section is where puppeteer will now take our
		// assembled HTML page and execute it for us using 
		// headless chrome.
		(async () => {
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			
			// bodycode is our HTML page with handlebars javascript which will execute
			await page.goto(`data:text/html,${bodycode}`, { waitUntil: 'networkidle0' });
			
			// once the promise returns we then ask the page for a PDF which we place into a variable 
			// representing the PDF Buffer that page.pdf() returns
			const pdfbuffer = await page.pdf();

			await browser.close();

			// we set the content type to pass back out of our API
			// as PDF
			res.contentType("application/pdf");
			
			// We return the stream to whatever called our PDF service
			res.send(pdfbuffer);

		})();
	}
 });

// Setup the port you want your service to run on
 var port = process.env.PORT || 5000;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });
