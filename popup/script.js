document.getElementById("ok_button").addEventListener("click", function() {

    var input = document.getElementById("text_input").value;

    if (input !== "") {

        browser.runtime.sendMessage({"input" : input.toLowerCase()});

        window.close();
    }

    else
        alert("One or more file extensions must be specified.");
});
