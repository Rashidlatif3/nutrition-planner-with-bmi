document.getElementById("generateBtn").addEventListener("click", calculateBMI);

function calculateBMI() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const gender = document.getElementById("gender").value;

    // Check if all fields are filled
    if (!name || !email || !age || !weight || !height || !gender) {
        alert("Please fill out all the fields.");
        return;
    }

    // BMI calculation: BMI = weight(kg) / height(m)^2
    const heightInMeters = height / 100; // Convert height from cm to meters
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    // Determine BMI category
    let bmiCategory = "";
    if (bmi < 18.5) {
        bmiCategory = "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        bmiCategory = "Normal weight";
    } else if (bmi >= 25 && bmi <= 29.9) {
        bmiCategory = "Overweight";
    } else {
        bmiCategory = "Obese";
    }

    // Display the BMI result and category
    const bmiResult = document.getElementById("bmiResult");
    bmiResult.innerHTML = `
        <strong>Your BMI:</strong> ${bmi} <br>
        <strong>Category:</strong> ${bmiCategory}
    `;

    // Enable the button to generate diet plan after BMI calculation
    document.getElementById("generateBtn").innerHTML = "Generate Meal Plan";
    document.getElementById("generateBtn").removeEventListener("click", calculateBMI);
    document.getElementById("generateBtn").addEventListener("click", generateDietPlan);
}

function generateDietPlan() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const gender = document.getElementById("gender").value;

    // Calculate the daily calorie needs based on the user’s input
    let calorieNeeds;
    if (gender === "male") {
        calorieNeeds = 10 * weight + 6.25 * 170 - 5 * age + 5; // Simplified calculation for male
    } else if (gender === "female") {
        calorieNeeds = 10 * weight + 6.25 * 170 - 5 * age - 161; // Simplified calculation for female
    }

    // Meal Plan description
    const mealPlan = `
        <h1>Personalized Nutrition Plan for ${name}</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Age:</strong> ${age} years</p>
        <p><strong>Weight:</strong> ${weight} kg</p>
        <p><strong>Gender:</strong> ${gender.charAt(0).toUpperCase() + gender.slice(1)}</p>
        <p><strong>Calories needed:</strong> ${Math.round(calorieNeeds)} kcal/day</p>

        <h2>Your Daily Meal Routine:</h2>
        <ul>
            <li><strong>Breakfast:</strong> Oatmeal with fruits and nuts</li>
            <li><strong>Lunch:</strong> Grilled chicken, quinoa, and steamed vegetables</li>
            <li><strong>Snack:</strong> Greek yogurt with honey</li>
            <li><strong>Dinner:</strong> Salmon, sweet potato, and sautéed spinach</li>
        </ul>
        <p>Follow this plan to maintain a healthy and balanced diet!</p>
    `;

    // Open a new tab and display the meal plan
    const newWindow = window.open();
    newWindow.document.write(`
        <html>
            <head>
                <title>Nutrition Diet Plan</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        line-height: 1.6;
                    }
                    h1, h2 {
                        color: #2c3e50;
                    }
                    ul {
                        list-style: square;
                        margin-left: 20px;
                    }
                </style>
            </head>
            <body>${mealPlan}</body>
        </html>
    `);
    newWindow.document.close();
}
