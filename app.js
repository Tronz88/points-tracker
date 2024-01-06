let peopleData = [];

function render() {
    const pointsList = document.getElementById('points-list');
    pointsList.innerHTML = '';

    peopleData.forEach(person => {
        const personDiv = document.createElement('div');
        personDiv.innerHTML = `${person.name}: ${person.points} points`;
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
        render();
    }
}
