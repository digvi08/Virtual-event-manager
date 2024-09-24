document.getElementById('eventForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;

    const response = await fetch('/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, date, category, price, description, image }),
    });

    const newEvent = await response.json();
    displayEvent(newEvent);
    document.getElementById('eventForm').reset();
});

async function fetchEvents() {
    const response = await fetch('/events');
    const events = await response.json();
    events.forEach(event => displayEvent(event));
}

function displayEvent(event) {
    const eventsList = document.getElementById('eventsList');
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event-card');
    eventDiv.innerHTML = `
        <h3>${event.title}</h3>
        <img src="${event.image || 'https://via.placeholder.com/150'}" alt="${event.title}">
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Category:</strong> ${event.category}</p>
        <p><strong>Price:</strong> $${event.price}</p>
        <p><strong>Description:</strong> ${event.description}</p>
    `;
    eventsList.appendChild(eventDiv);
}

// Fetch and display existing events on page load
fetchEvents();

function getImageUrl(category) {
    const images = {
        Concert: 'https://images.unsplash.com/photo-1501594907350-56c249c8eb83',
        Workshop: 'https://images.unsplash.com/photo-1556103891-161e5d1c4f61',
        Classroom: 'https://images.unsplash.com/photo-1504384308090-c894fdcc5389',
        Cooking: 'https://images.unsplash.com/photo-1561139512-b94d6e40c115',
        Tech: 'https://images.unsplash.com/photo-1593642632858-5b3b9e8f0a4d',
    };
    return images[category] || 'https://via.placeholder.com/150';
}

function displayEvent(event) {
    const eventsList = document.getElementById('eventsList');
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event-card');
    const imageUrl = getImageUrl(event.category); // Get image based on category
    eventDiv.innerHTML = `
        <h3>${event.title}</h3>
        <img src="${imageUrl}" alt="${event.title}">
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Category:</strong> ${event.category}</p>
        <p><strong>Price:</strong> $${event.price}</p>
        <p><strong>Description:</strong> ${event.description}</p>
    `;
    eventsList.appendChild(eventDiv);
}
