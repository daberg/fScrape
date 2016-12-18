/*******************************************************************************

   Copyright (C) 2016 daberg

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.

*******************************************************************************/


function onTabError(error) {
    console.log(`Tab error: ${error}`);
}

function onTabCreation(tab) {
    console.log("Created tab " + tab.id);
}

function createTab(url) {

    var creating = browser.tabs.create({
        url    : url,
        active : false
    });

    return creating.then(onTabCreation, onTabError);
}

function onMessage(message) {

    console.log(message.input);

    var executing = browser.tabs.executeScript(null, {
        file: "/scrape.js"
    });

    executing.then(function(result) {
        mainPort.postMessage({
            "content" : "input",
            "input"   : message.input
        });
    }, function(error) {
        console.log('Script execution error: ${error}');
    });
}

function onConnected(port) {

    mainPort = port;

    mainPort.onMessage.addListener(function(message) {

        console.log("Received " + message.content + " message.");

        if (message.content === "URL") {

            console.log("URL: " + message.url);

            createTab(message.url);
        }

        else if (message.content === "notice") {

            console.log("Notice: " + message.notice);
        }
    });
}


var mainPort;


browser.runtime.onConnect.addListener(onConnected);
browser.runtime.onMessage.addListener(onMessage);
