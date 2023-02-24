window.addEventListener("DOMContentLoaded", async () => {
    const url = 'http://localhost:8000/api/states/';

    const response = await fetch(url)

    if (!response.ok) {
        console.log("state list: bad response")
    } else {
        const data = await response.json()
        console.log(data)

        const selectTag = document.getElementById("state")

        for (let state of data.states){
            const stateOption = document.createElement('option')
            stateOption.value = state.abbreviation
            stateOption.innerHTML = state.name
            selectTag.appendChild(stateOption)
        }
    };

    const formTag = document.getElementById('create-location-form');
    formTag.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));

        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-type': 'application/json',
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newLocation = await response.json();
            console.log(newLocation)
        }
        console.log(json)
  });


});
