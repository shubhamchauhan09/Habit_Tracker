const statusDialog = document.getElementById('statusDialog');
const selectEl = statusDialog.querySelector('select');
const confirmBtn = statusDialog.querySelector('#confirmBtn');

let statusId = null;
let habitId = null;
let createdAt = null;

console.log(parsed_data)

selectEl.addEventListener('change', (e) => {
    confirmBtn.value = selectEl.value;
});


statusDialog.addEventListener('close', (e) => {

    if (statusDialog.returnValue !== "cancel" && statusDialog.returnValue !== "default" && statusDialog.returnValue != "") {
        let returnValue = JSON.parse(statusDialog.returnValue);
        if (returnValue._id) {
            updateStatusCol(returnValue)
        } else {
            createStatus(returnValue)
        }
    }
});


function updateStatusCol(returnValue) {
    fetch("/update-status", {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(returnValue)
    }).then(res => {
        // console.log(res)
        window.location.reload();
    })
}

function createStatus(returnValue) {
    fetch("/create-status", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ value: returnValue.value, createdAt: new Date(returnValue.createdAt), habit: returnValue.habit })

    }).then(res => {
        // console.log(res)
        window.location.reload()
    })
}


function updateStatus(button) {
    statusId = button.getAttribute("id");
    habitId = button.getAttribute("habit");
    createdAt = button.getAttribute("createdAt");

    statusDialog.showModal();
}


confirmBtn.addEventListener('click', (event) => {
    event.preventDefault(); // We don't want to submit this fake form
    statusDialog.close(JSON.stringify({ _id: statusId, value: selectEl.value, habit: habitId, createdAt: createdAt })); // Have to send the select box value here.
});