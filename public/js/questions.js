let quizObj = [
     {
        no:'q1',
        question: "How much do you spend on electricity monthly?", 
        options: ["1000-2000kWH", "2000-3000kWH", "3500-4400kWH", "Above 4500kWH"], 
        values: [1500, 2500, 4000, 5000]
    },
    {
        no: 'q2',
        question: "How much water do you typically use?", 
        options: ["Minimal Usage", "Efficient & Moderate", "Average Usage", "High Usage"], 
        values: [1500, 2500, 4000, 5000]
    },

    {
        no: 'q3',
        question: "What is your primary diet?", 
        options: ["Vegan", "Vegetarian", "Pescatarian", "Ominivore"], 
        values: [1500, 2500, 4000, 5000]
    },

    {
        no: 'q4',
        question: "How many flights do you take per year?", 
        options: ["None", "1-2 Short flights", "3-5 Short flights", "1-2 Long flights "], 
        values: [1500, 2500, 4000, 5000]
    }
]


export const quizQuestions = JSON.stringify(quizObj)