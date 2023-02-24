function createCard(name, location, description, pictureUrl, start, end) {
    return `
    <div class="card mb-3 shadow">
      <img src="${pictureUrl}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
        <p class="card-text">${description}</p>
      </div>
      <div class="card-footer">${start} - ${end}</div>
    </div>
  `;
}


window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/';
    const columns = document.querySelectorAll('.col');
    const placeholder = document.querySelectorAll('.placeholder')
    let colIdx = 0

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.log("bad response")
        } else {
            const data = await response.json();

            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const name = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const start = new Date(details.conference.starts).toLocaleDateString()
                    const end = new Date(details.conference.ends).toLocaleDateString()
                    console.log(details)
                    const location = details.conference.location.name
                    const html = createCard(name,location, description, pictureUrl, start, end);
                    const column = columns[colIdx % 3]
                    column.innerHTML += html
                    colIdx = (colIdx + 1) % 3
                } else {
                    console.log("could not retreive conference details")
                }
            }
        }

    } catch (e) {
        console.log("bad response")
    }
});
