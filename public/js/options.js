let streamNames = [];
$(document).ready(function () {
    loadStreamNames();
    createAddStreamEvent();
    createRemoveStreamEvent();
});

function createRemoveStreamEvent() {
    $(".container").on("click", "#remove-stream", function () {
        const stream = $(this).prev().text();
        streamNames = streamNames.filter(elem => elem !== stream);
        chrome.storage.sync.set({"streamNamesList": streamNames}, function () {
            $(this).closest("#stream-item").remove();
        });
    });
}

function createAddStreamEvent() {
    $("#add-stream").on("click", function () {
        const stream = $("#inputStream").val();

        if (!stream || streamNames.includes(stream)) {
            return;
        }

        $("#streamList").append(listItem(stream));

        $("#inputStream").val('');

        streamNames.push(stream);
        chrome.storage.sync.set({"streamNamesList": streamNames})
    });
}

function loadStreamNames() {
    chrome.storage.sync.get('streamNamesList', function (list) {
        streamNames = list['streamNamesList'] || [];
        streamNames.forEach(elem => {
            $("#streamList").append(listItem(elem));
        })
    })
}

function listItem(stream) {
    return `
        <li class="list-group-item d-flex justify-content-between align-items-center" id="stream-item">
            <div id="stream-name">${stream}</div>
            <button type="button" class="btn btn-outline-danger btn-sm" id="remove-stream">
                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                    <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                </svg>
            </button>
        </li>`
}