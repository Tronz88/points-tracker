// Your existing Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJQlRGzbmDGIpME7NLSJlYXC3YJoi7XOU",
    authDomain: "points-tracker-8f9ef.firebaseapp.com",
    projectId: "points-tracker-8f9ef",
    storageBucket: "points-tracker-8f9ef.appspot.com",
    messagingSenderId: "282673682706",
    appId: "1:282673682706:web:b0474e083de87099e6bbcb",
    measurementId: "G-862FHL7Z3G"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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
        saveData(peopleData); // Pass the peopleData array to saveData
        render();
    }
}

function increasePoints(name) {
    const person = peopleData.find(p => p.name === name);
    if (person) {
        person.points += 1;
        saveData(peopleData);
        render();
    }
}

function decreasePoints(name) {
    const person = peopleData.find(p => p.name === name);
    if (person && person.points > 0) {
        person.points -= 1;
        saveData(peopleData);
        render();
    }
}

// Save and load data functions

// Save data to Firebase
function saveData(peopleData) {
    // Reference to the 'peopleData' node in the database
    const db = firebase.database();
    const peopleDataRef = db.ref('peopleData');

    // Set the data in the 'peopleData' node
    peopleDataRef.set(peopleData)
        .then(() => {
            console.log('Data saved to Firebase!');
        })
        .catch(error => {
            console.error('Error saving data to Firebase:', error);
        });
}

// Load data from Firebase
function loadData() {
    // Reference to the 'peopleData' node in the database
    const db = firebase.database();
    const peopleDataRef = db.ref('peopleData');

    // Retrieve the data from the 'peopleData' node
    peopleDataRef.once('value')
        .then(snapshot => {
            // Check if there is data in the snapshot
            if (snapshot.exists()) {
                // Get the data from the snapshot and update the local peopleData array
                const data = snapshot.val();
                console.log('Data loaded from Firebase:', data);
                // Update your local peopleData array or perform any other actions with the data
                peopleData = data;
                render();
            } else {
                console.log('No data found in Firebase.');
            }
        })
        .catch(error => {
            console.error('Error loading data from Firebase:', error);
        });
}

// Call loadData() when the page loads to get existing data
loadData();
