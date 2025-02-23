// static/text.js

async function saveJournal() {
    const journalText = document.getElementById('journal-text').value;
    const token = localStorage.getItem('authToken');

    if (!token) {
        alert('You must be logged in to save a journal.');
        return;
    }

    try {
        const response = await fetch('/journal/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ description: journalText }),
        });

        if (response.ok) {
            alert('Journal saved successfully!');
            window.location.href = '/dashboard';
        } else {
            const errorData = await response.json();
            alert(`Failed to save journal: ${errorData.detail || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error saving journal:', error);
        alert('An error occurred while saving the journal.');
    }
}