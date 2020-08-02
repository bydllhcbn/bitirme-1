    $(document).ready(function () {
        $(".add-more").click(function () {
            var html = $(".copy").html();
            $(".after-add-more").after(html);
        });
        $(".add-more2").click(function () {
            var html = $(".copy2").html();
            $(".after-add-more2").after(html);
        });
        $("body").on("click", ".remove", function () {
            $(this).parents(".control-group").remove();
        });
    });
    let clients = [];
    var ws;
    function sendToSocket(action, params) {
        ws.send(JSON.stringify({
            "action": action,
            "params": params
        }));
    }
    function updateBadges(ids) {
        let allStatus = document.querySelectorAll('.connect-badge');
        allStatus.forEach(function (el) {
            el.classList.remove('badge-success');
            el.classList.add('badge-danger');
            el.innerHTML = 'BAĞLI DEĞİL';
        });
        ids.forEach(function (id) {
            let el = document.querySelectorAll('#connect-badge-'+id)[0];

            if(typeof el !== 'undefined'){
                el.classList.remove('badge-danger');
                el.classList.add('badge-success');
                el.innerHTML = 'BAĞLI';
            }
        });

    }

    function WebSocketTest() {
        if ("WebSocket" in window) {
            ws = new WebSocket("ws://localhost:3001");
            ws.onopen = function () {
                sendToSocket("login", {"userId": 0});
                console.log("Message is sent...");
            };
            ws.onmessage = function (evt) {
                var json = JSON.parse(evt.data);
                console.log("Message is received... ");
                console.log(json);
                if (json.action === "reload") {
                    window.location.reload();
                }
                if (json.action === "clients") {
                    console.log("clients received");
                    console.log(json.params);
                    updateBadges(json.params);
                    if(typeof clientCallback !== 'undefined') clientCallback(json.params);
                }
                if (json.action === "status") {
                    console.log(json.params);
                    if(typeof statusCallback !== 'undefined') statusCallback(json.params);
                }
            };

            ws.onclose = function () {
                let allStatus = document.querySelectorAll('.connect-badge');
                allStatus.forEach(function (el) {
                    el.classList.remove('badge-success');
                    el.classList.add('badge-danger');
                    el.innerHTML = 'SERVER BAĞLANTISI YOK!';
                });
                console.log("Connection is closed...");
            };
        } else {
            alert("WebSocket NOT supported by your Browser!");
        }
    }
    WebSocketTest();