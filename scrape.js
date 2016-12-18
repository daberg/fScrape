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


var port = browser.runtime.connect({name: "main-port"});

port.onMessage.addListener(function(message) {

    if (message.content === "input") {

        var input = message.input;

        var filexts = input.split(" ");

        var links = document.getElementsByTagName("a");

        for (var i = 0; i < links.length; i++) {

            var ref = links.item(i).href;

            var len = filexts.length;
            var index;

            for (index = 0; index < len; index++) {

                var ext;

                if (filexts[index].charAt(0) === '.') {
                    ext = filexts[index];
                }

                else {
                    ext = "." + filexts[index];
                }

                var extUpper = ext.toUpperCase();

                if (ref.endsWith(ext)      || ref.endsWith(ext + '/') ||
                    ref.endsWith(extUpper) || ref.endsWith(extUpper + '/')) {

                    port.postMessage({
                        "content" : "URL",
                        "url"     : ref
                    });
                }
            }
        }

        port.postMessage({
            "content" : "notice",
            "notice"  : "done"
        });
    }
});
