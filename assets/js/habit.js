const showButton = document.getElementById('showDialog');
const favDialog = document.getElementById('favDialog');
const selectEl = favDialog.querySelector('input');
const confirmBtn = favDialog.querySelector('#confirmBtn');

showButton.addEventListener('click', () => {
    favDialog.showModal();
});

selectEl.addEventListener('keypress', (e) => {
    confirmBtn.value = selectEl.value;
});


favDialog.addEventListener('close', (e) => {

    if (favDialog.returnValue !== "cancel" && favDialog.returnValue !== "default" && favDialog.returnValue != "") {
        fetch("/save-habit", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({ user: parsed_data.user._id, name: favDialog.returnValue, createdAt: new Date() })
        }).then(res => window.location.reload())
    }
});

confirmBtn.addEventListener('click', (event) => {
    event.preventDefault(); // We don't want to submit this fake form
    favDialog.close(selectEl.value); // Have to send the select box value here.
});