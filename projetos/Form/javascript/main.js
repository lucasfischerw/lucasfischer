var CurrentQuestion = 1;
function NextQuestion() {
    var PassQuestion = false;
    for (let index = 0; index < document.getElementById("options-container-"+CurrentQuestion+"").getElementsByTagName("a").length; index++) {
        if(document.getElementById("options-container-"+CurrentQuestion+"").getElementsByTagName("a")[index].classList.contains("selected")) {
            PassQuestion = true;
            break;
        }
    }
    if(PassQuestion) {
        document.getElementById("question-"+CurrentQuestion+"").style.opacity = "0";
        document.getElementById("question-"+CurrentQuestion+"").style.marginLeft = "-300px";
        setTimeout(() => {
            document.getElementById("question-"+CurrentQuestion+"").style.display = "none";
            CurrentQuestion++;
            document.getElementById("question-"+CurrentQuestion+"").style.display = "flex";
            setTimeout(() => {
                document.getElementById("question-"+CurrentQuestion+"").style.opacity = "1";
                document.getElementById("question-"+CurrentQuestion+"").style.marginLeft = "0";
            }, 150);
        }, 350);
    } else {
        for (let index = 0; index < document.getElementById("options-container-"+CurrentQuestion+"").getElementsByTagName("a").length; index++) {
            document.getElementById("options-container-"+CurrentQuestion+"").getElementsByTagName("a")[index].style.backgroundColor = "rgb(255, 201, 201)";
            document.getElementById("options-container-"+CurrentQuestion+"").getElementsByTagName("a")[index].style.borderColor = "#e85656";
        }
    }
}
function Select(ButtonSelected) {
    for (let index = 0; index < document.getElementById("options-container-"+CurrentQuestion+"").getElementsByTagName("a").length; index++) {
        document.getElementById("options-container-"+CurrentQuestion+"").getElementsByTagName("a")[index].style.backgroundColor = "#f3f3f3";
        document.getElementById("options-container-"+CurrentQuestion+"").getElementsByTagName("a")[index].style.borderColor = "#e7e7e4";
        document.getElementById("options-container-"+CurrentQuestion+"").getElementsByTagName("a")[index].classList.remove("selected");
    }
    console.log(document.getElementById("options-container-"+CurrentQuestion+"").getElementsByTagName("a")[ButtonSelected].classList.add("selected"));
}

var form_id_js = "javascript_form";
var data_js = {
    "access_token": "5nwxvbw5lnt539t1130619c1"
};
function js_onSuccess() {
    window.location = "sucess-page.html?message=Email+Successfully+Sent%21&isError=0";
}
function js_onError(error) {
    window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
}
var sendButton = document.getElementById("js_send");
function js_send() {
    if(document.querySelector("#" + form_id_js + " [name='subject']").value != "" && document.querySelector("#" + form_id_js + " [name='subject']").value.includes("@")) {
        sendButton.value='Sending…';
        sendButton.disabled=true;
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                js_onSuccess();
            } else
            if(request.readyState == 4) {
                js_onError(request.response);
            }
        };
        var subject = "Client Request from: " + document.querySelector("#" + form_id_js + " [name='subject']").value;
        data_js['subject'] = subject;
        var stringResult = "";
        for (let index = 0; index < document.getElementsByTagName("a").length; index++) {
            if(document.getElementsByTagName("a")[index].classList.contains("selected")) {
                if(stringResult.length == 0) {
                    stringResult += document.getElementsByTagName("a")[index].textContent;
                } else {
                    stringResult += ", " + document.getElementsByTagName("a")[index].textContent;
                }
            }
        }
        data_js['text'] = stringResult;
        var params = toParams(data_js);
        request.open("POST", "https://postmail.invotes.com/send", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(params);
        return false;
    } else {
        document.getElementById("advice-email").classList.add("fail");
        document.getElementById("message-log").innerHTML = "Please insert a valid Email Adress";
        document.getElementById("advice-email").style.display = "block";
        setTimeout(() => {
            document.getElementsByName("subject")[0].style.borderColor = "red";
            document.getElementsByName("subject")[0].style.backgroundColor = "rgb(251 191 191)";
            document.getElementById("advice-email").style.opacity = "1";
            document.getElementById("advice-email").style.bottom = "35px";
            setTimeout(() => {
                document.getElementsByName("subject")[0].style.borderColor = "black";
                document.getElementsByName("subject")[0].style.backgroundColor = "white";
                document.getElementById("advice-email").style.opacity = "0";
                document.getElementById("advice-email").style.bottom = "0";
                setTimeout(() => {
                    document.getElementById("advice-email").style.display = "block";
                }, 500);
            }, 1500);
        }, 350);
    }
}
sendButton.onclick = js_send;
function toParams(data_js) {
    var form_data = [];
    for ( var key in data_js ) {
        form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
    }
    return form_data.join("&");
}
var js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
    e.preventDefault();
});

function parseURLParams() {
    var url = window.location.href;
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

function LoadPage() {
    if(parseURLParams() != undefined) {
        setTimeout(() => {
            document.getElementById("message-log").innerHTML = parseURLParams().message[0];
            if(parseInt(parseURLParams().isError[0]) == 1) {
                document.getElementById("advice-email").classList.add("fail");
            } else {
                document.getElementById("advice-email").classList.add("sucess");
            }
            document.getElementById("advice-email").style.display = "block";
            setTimeout(() => {
                document.getElementById("advice-email").style.opacity = "1";
                document.getElementById("advice-email").style.bottom = "35px";
            }, 350);
        }, 200);
    }
}