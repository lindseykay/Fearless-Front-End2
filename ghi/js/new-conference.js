window.addEventListener("DOMContentLoaded", async () => {
    const url = "http://localhost:8000/api/locations"

    const response = await fetch(url)

    if (!response.ok){
        console.log("location list: bad response")
    } else {
        const data = await response.json()
        console.log(data)

        const selectTag = document.getElementById("location")

        for (let location of data.locations) {
            const locationOption = document.createElement('option');
            locationOption.value = location.id;
            locationOption.innerHTML = location.name;
            selectTag.appendChild(locationOption)
        };
    };

    const formTag = document.getElementById('create-conference-form');
    formTag.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                "Content-type": 'applications/json',
            },
        };

        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newConference = await response.json()
            console.log(newConference)
        }
    });



});
