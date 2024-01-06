let peopleData = [];

function render() {
    const pointsList = document.getElementById('points-list');
    pointsList.innerHTML = '';

    peopleData.forEach(person => {
        const personDiv = document.createElement('div');
        personDiv.innerHTML = `
            <span>${person.name}: ${person.points} points</span>
            <button onclick="increasePoints('${person.name}')">+1</button>
            <button onclick="decreasePoints('${person.name}')">-1</button>
        `;
        pointsList.appendChild(personDiv);
    });
}

function addPerson() {
    const name = prompt('Enter the person\'s name:');
    if (name) {
        const person = {
            name: name,
            points: 0
        };
        peopleData.push(person);
        saveData();
        render();
    }
}

function increasePoints(name) {
    const person = peopleData.find(p => p.name === name);
    if (person) {
        person.points += 1;
        saveData();
        render();
    }
}

function decreasePoints(name) {
    const person = peopleData.find(p => p.name === name);
    if (person && person.points > 0) {
        person.points -= 1;
        saveData();
        render();
    }
}

// Save and load data functions
function saveData() {
    // Replace this with your Firebase save logic
    // Example: database.ref('peopleData').set(peopleData);
}

function loadData() {
    // Replace this with your Firebase load logic
    // Example: database.ref('peopleData').once('value').then(snapshot => { /* ... */ });
}

// Call loadData() when the page loads to get existing data
loadData();