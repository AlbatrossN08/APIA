    const getButton = document.getElementById("get");
    const resultsElement = document.getElementById("values");

    getButton.addEventListener("click", function(event) {
      const symptoms = document.querySelector('multi-input').getValues().join(', ');
      fetch("https://projectxqa.onrender.com/api/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            symptoms
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            resultsElement.textContent = "Error: " + data.error;
          } else {
            resultsElement.innerHTML = `
                    <h3>Predicted Disease:</h3> <p>${data.final_prediction}</p>
                    <h3>Symptoms Entered:</h3> <p>${data.symptoms}</p>
                    `;
          }
        })
        .catch(error => {
          console.error("Error:", error);
          resultsElement.textContent = "An error occurred. Please try again.";
        });
    });
