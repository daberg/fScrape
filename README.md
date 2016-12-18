# fScrape

Firefox add-on that helps downloading multiple files from web pages. 


### Installing

fScrape files must be zipped into an .xpi file. To do so, a simple Linux build
file has been included.

After compressing, one has to choose the "Install Add-on from file" option from
the Firefox Add-ons Manager and select the .xpi file.

IMPORTANT NOTE: fScrape is not signed by Mozilla. In order to install it one has to set 
the xpinstall.signatures.required option to false in the about:config settings
page.

### Usage

Upon clicking the fScrape button in the browser toolbar, the user is shown a
pop-up with a text field that must be filled with one or more filename
extensions.

Extensions have to be separated by a whitespace. Case doesn't matter.

When the user clicks the Go button, fScrape starts searching the page for
URLs of files belonging to one of the specified formats.

Each matching URL is then opened in a new tab. Unfortunately, direct download
is not well supported by the Firefox API yet, and the user may have to start the
download manually.

### Compatibility

fScrape was developed for Firefox and it has been tested on Firefox only.

However, it is built on the WebExtension API which aims to be cross-browser.

Thus, it should be able to run on Chrome (and other supported browsers) or at
least it could be ported without too much difficulty.

### License

fScrape is licensed under GPLv3.
