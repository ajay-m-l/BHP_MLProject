// Function to get bathroom value from dropdown
function getBathValue(){
    var bathSelect = document.getElementById("bath");
    return parseInt(bathSelect.value) || -1;
}

// Function to get BHK value from dropdown
function getBHKValue(){
    var bhkSelect = document.getElementById("bhk");
    return parseInt(bhkSelect.value) || -1;
}

// Function to load locations
function onPageLoad(){
    console.log("Page loaded");
    var url = "http://127.0.0.1:5000/get_location_names";
    
    $.get(url, function(data, status){
        console.log("Got response for get_location_names request");
        console.log("Response data:", data); // Debug log
        
        if(data && data.locations) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            $('#uiLocations').append('<option value="">Select Location</option>');
            for(var i in locations) {
                $('#uiLocations').append('<option value="' + locations[i] + '">' + locations[i] + '</option>');
            }
            console.log("Locations loaded successfully:", locations.length, "locations");
        } else {
            console.error("No locations data received");
        }
    }).fail(function(xhr, status, error) {
        console.error("Failed to load locations:", error);
        console.error("Status:", status);
        console.error("Response:", xhr.responseText);
        
        // Add fallback locations if server is down
        var fallbackLocations = ['Whitefield', 'Koramangala', 'Indiranagar', 'Jayanagar', 'Marathahalli'];
        var uiLocations = document.getElementById("uiLocations");
        $('#uiLocations').empty();
        $('#uiLocations').append('<option value="">Select Location (Fallback)</option>');
        for(var i in fallbackLocations) {
            $('#uiLocations').append('<option value="' + fallbackLocations[i] + '">' + fallbackLocations[i] + '</option>');
        }
    });
}

// Function to validate form inputs
function validateForm(){
    var isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error').forEach(function(error) {
        error.style.display = 'none';
    });
    
    // Validate area
    var area = document.getElementById("area");
    if(!area.value || area.value < 100 || area.value > 10000) {
        document.getElementById("areaError").style.display = 'block';
        isValid = false;
    }
    
    // Validate BHK
    if(getBHKValue() === -1) {
        document.getElementById("bhkError").style.display = 'block';
        isValid = false;
    }
    
    // Validate bathrooms
    if(getBathValue() === -1) {
        document.getElementById("bathError").style.display = 'block';
        isValid = false;
    }
    
    // Validate location
    var location = document.getElementById("uiLocations");
    if(!location.value) {
        document.getElementById("locationError").style.display = 'block';
        isValid = false;
    }
    
    return isValid;
}

// Main function to handle price prediction
function onClickEstimatePrice(){
    console.log("Estimate price button clicked");
    
    if(!validateForm()) {
        return;
    }
    
    var sqft = document.getElementById("area");
    var bhk = getBHKValue();
    var bathroom = getBathValue();
    var location = document.getElementById("uiLocations");
    var loading = document.getElementById("loading");
    var result = document.getElementById("result");
    var predictedPrice = document.getElementById("predictedPrice");

    // Show loading
    loading.style.display = 'block';
    result.style.display = 'none';

    var url = "http://127.0.0.1:5000/predict_home_price";

    // Send JSON data to match your Flask backend
    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            total_sqft: parseFloat(sqft.value),
            bhk: bhk,
            bath: bathroom,
            location: location.value
        }),
        success: function(data, status) {
            console.log("Prediction successful:", data.estimated_price);
            loading.style.display = 'none';
            result.style.display = 'block';
            predictedPrice.innerHTML = "₹" + data.estimated_price.toString() + " Lakh";
            console.log("Status:", status);
        },
        error: function(xhr, status, error) {
            loading.style.display = 'none';
            console.error('Error details:');
            console.error('Status:', status);
            console.error('Error:', error);
            console.error('Response:', xhr.responseText);
            console.error('Status Code:', xhr.status);
            
            // More specific error messages
            if (xhr.status === 415) {
                alert("Content type error. Please check server configuration.");
            } else if (xhr.status === 400) {
                alert("Invalid input data. Please check your inputs.");
            } else if (xhr.status === 500) {
                alert("Server error. Please try again or contact support.");
            } else {
                alert("Error occurred while predicting price. Please try again.");
            }
        }
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded");
    onPageLoad();
    
    // Handle form submission
    var form = document.getElementById('predictionForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            onClickEstimatePrice();
        });
    } else {
        console.error("Form 'predictionForm' not found!");
    }
});

// Backup: Load locations when page loads
window.onload = function() {
    console.log("Window loaded");
    // Small delay to ensure everything is ready
    setTimeout(function() {
        if ($('#uiLocations option').length <= 1) {
            console.log("Retrying location load...");
            onPageLoad();
        }
    }, 500);
};