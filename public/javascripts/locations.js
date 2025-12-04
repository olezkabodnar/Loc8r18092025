// Handle save/unsave button on location info page
document.addEventListener('DOMContentLoaded', function() {
  const saveButton = document.querySelector('.save-location-btn');

  if (saveButton) {
    saveButton.addEventListener('click', function(e) {
      e.preventDefault();

      const locationId = this.getAttribute('data-location-id');
      const locationName = this.getAttribute('data-location-name');

      if (!locationId) {
        console.error('Location ID not found');
        return;
      }

      fetch(`/api/locations/${locationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to save/unsave place');
        }
        return response.json();
      })
      .then(data => {
        // Update button text and icon
        const isSaved = data.place.saved;
        if (isSaved) {
          saveButton.innerHTML = '<i class="fa fa-heart"></i>&nbsp;Unsave Place';
        } else {
          saveButton.innerHTML = '<i class="fa fa-heart-o"></i>&nbsp;Save Place';
        }

        // Show success message
        alert(`${locationName} ${isSaved ? 'saved' : 'removed from saved places'}!`);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error saving/unsaving place. Please try again.');
      });
    });
  }
});
