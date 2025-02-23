async function fetchJournals() {
    const token = localStorage.getItem('authToken');
    console.log("Retrieved Token:", token);
    
    if (!token) {
        alert('You must be logged in to view journals. Redirecting to login.');
        window.location.href = '/';
        return;
    }

    try {
        const response = await fetch('/journal/', {
            headers: {
                'Authorization': `Bearer ${token.trim()}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401) {
            alert('Session expired or unauthorized. Please log in again.');
            localStorage.removeItem('authToken');
            window.location.href = '/';
            return;
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to fetch journals');
        }

        const journals = await response.json();
        const journalList = document.getElementById('journal-list');
        journalList.innerHTML = '';

        journals.forEach(journal => {
            const listItem = document.createElement('li');
            listItem.textContent = journal.description;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteJournal(journal.id);

            listItem.appendChild(deleteButton);
            journalList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching journals:', error);
        alert(error.message);
    }
}

async function deleteJournal(journalId) {
    const token = localStorage.getItem('authToken');
    console.log("Token before delete:", token);
    
    if (!token) {
        alert('You must be logged in. Redirecting to login.');
        window.location.href = '/';
        return;
    }

    try {
        const response = await fetch(`/journal/${journalId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token.trim()}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401) {
            alert('Session expired or unauthorized. Please log in again.');
            localStorage.removeItem('authToken');
            window.location.href = '/';
            return;
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to delete journal');
        }

        alert('Journal deleted successfully!');
        fetchJournals();
    } catch (error) {
        console.error('Error deleting journal:', error);
        alert(error.message);
    }
}

async function summarizeJournals() {
    const token = localStorage.getItem('authToken');
    console.log("Token before summarizing:", token);
    
    if (!token) {
        alert('You must be logged in. Redirecting to login.');
        window.location.href = '/';
        return;
    }

    try {
        const response = await fetch('/journal/summary', {
            headers: {
                'Authorization': `Bearer ${token.trim()}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401) {
            alert('Session expired or unauthorized. Please log in again.');
            localStorage.removeItem('authToken');
            window.location.href = '/';
            return;
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to get summary');
        }

        const summary = await response.json();
        alert(`Summary: ${summary}`);
    } catch (error) {
        console.error('Error summarizing journals:', error);
        alert(error.message);
    }
}

window.onload = fetchJournals;