// tutor-data.js

const teachers = [
    {
        id: "T001",
        name: "Dr. Evelyn Reed",
        gender: "Female",
        image: "../assets/images/male-mathematics-tutor.png",
        subjects: ["Mathematics"],
        specialties: ["Calculus", "Algebra", "Geometry", "Trigonometry"],
        bio: "Dr. Reed holds a Ph.D. in Mathematics and has over 15 years of experience. She excels at making complex mathematical concepts approachable and understandable for all levels of students.",
        rating: 4.9,
        reviews: 120
    },
    {
        id: "T002",
        name: "Professor David Chen",
        gender: "Male",
        image: "../assets/images/female-mathematics-tutor.png",
        subjects: ["Mathematics", "Computer Science"],
        specialties: ["Discrete Math", "Linear Algebra", "Abstract Algebra", "Algorithms"],
        bio: "Professor Chen is an expert in both theoretical mathematics and its application in computer science. His teaching style is methodical and thorough, ensuring a deep understanding of the subject.",
        rating: 4.8,
        reviews: 95
    },
    {
        id: "T003",
        name: "Ms. Anya Sharma",
        gender: "Female",
        image: "../assets/images/female-computer-science-tutor.png",
        subjects: ["Computer Science"],
        specialties: ["Python Programming", "Java Programming", "Data Structures", "Web Development (Frontend)"],
        bio: "Anya specializes in making complex coding concepts easy to understand for beginners and intermediate learners. She focuses on practical application and problem-solving.",
        rating: 4.7,
        reviews: 80
    },
    {
        id: "T004",
        name: "Mr. Ben Carter",
        gender: "Male",
        image: "../assets/images/male-computer-science-tutor.png",
        subjects: ["Computer Science"],
        specialties: ["Database Systems (SQL, NoSQL)", "Software Engineering", "Cloud Computing (AWS, Azure)", "Cybersecurity Basics"],
        bio: "Ben has a strong background in software development and database design. He provides clear, hands-on guidance for advanced computer science topics.",
        rating: 4.9,
        reviews: 110
    },
    {
        id: "T005",
        name: "Dr. Marcus Thorne",
        gender: "Male",
        image: "../assets/images/male-physics-tutor.png",
        subjects: ["Science"],
        specialties: ["Physics (Classical & Modern)", "Thermodynamics", "Mechanics", "Electromagnetism"],
        bio: "Dr. Thorne brings complex physics concepts to life with practical examples and clear explanations. He encourages critical thinking and scientific inquiry.",
        rating: 4.8,
        reviews: 75
    },
    {
        id: "T006",
        name: "Dr. Lena Khan",
        gender: "Female",
        image: "../assets/images/female-chemistry-tutor.png",
        subjects: ["Science"],
        specialties: ["Chemistry (Organic & Inorganic)", "Biochemistry", "Lab Techniques", "Chemical Reactions"],
        bio: "Dr. Khan's passion for chemistry makes learning engaging and accessible. She focuses on building a strong foundational understanding for her students.",
        rating: 4.9,
        reviews: 90
    },
    {
        id: "T007",
        name: "Monsieur Jean-Luc Dubois",
        gender: "Male",
        image: "../assets/images/male-french-tutor.png",
        subjects: ["Languages"],
        specialties: ["French", "French Literature", "French History", "Conversation Practice"],
        bio: "Jean-Luc is a native French speaker with a flair for making language learning fun and immersive. He focuses on practical conversation and cultural understanding.",
        rating: 4.7,
        reviews: 65
    },
    {
        id: "T008",
        name: "Señora Sofia Rodriguez",
        gender: "Female",
        image: "../assets/images/female-spanish-tutor.png",
        subjects: ["Languages"],
        specialties: ["Spanish", "Spanish Culture", "Spanish Grammar", "Pronunciation"],
        bio: "Sofia's energetic and engaging lessons cover both Spanish language and cultural immersion, helping students speak confidently.",
        rating: 4.9,
        reviews: 88
    },
    {
        id: "T009",
        name: "Dr. Thomas Grant",
        gender: "Male",
        image: "../assets/images/male-history-tutor.png",
        subjects: ["History"],
        specialties: ["World History", "Ancient Civilizations", "European History", "Historical Research"],
        bio: "Dr. Grant's lectures transport students back in time with vivid historical narratives and in-depth analysis.",
        rating: 4.8,
        reviews: 70
    },
    {
        id: "T010",
        name: "Dr. Olivia Bennett",
        gender: "Female",
        image:  "../assets/images/femal-history-tutor.png",
        subjects: ["History"],
        specialties: ["American History", "Modern History", "Political Science", "Social Movements"],
        bio: "Dr. Bennett offers insightful perspectives on pivotal moments in history, encouraging students to analyze events critically.",
        rating: 4.9,
        reviews: 82
    },
    {
        id: "T011",
        name: "Mr. Arthur Finch",
        gender: "Male",
        image: "../assets/images/male-history-tutor.png",
        subjects: ["History"],
        specialties: ["Medieval History", "Art History", "Archaeology", "Classical Studies"],
        bio: "Mr. Finch uncovers the hidden stories and treasures of the past, making history an exciting journey of discovery.",
        rating: 4.7,
        reviews: 60
    },
    {
        id: "T012",
        name: "Ms. Chloe Davies",
        gender: "Female",
        image: "../assets/images/femal-english-tutor.png",
        subjects: ["English/Literature"],
        specialties: ["Shakespearean Literature", "Poetry Analysis", "Creative Writing", "Literary Criticism"],
        bio: "Ms. Davies inspires a love for language and storytelling, helping students unlock the beauty and depth of literature.",
        rating: 4.8,
        reviews: 78
    },
    {
        id: "T013",
        name: "Dr. Julian Vance",
        gender: "Male",
        image: "../assets/images/male-english-tutor.png",
        subjects: ["English/Literature"],
        specialties: ["Literary Theory", "Victorian Literature", "Essay Writing", "Research Papers"],
        bio: "Dr. Vance guides students through complex literary texts with clarity, fostering strong analytical and writing skills.",
        rating: 4.9,
        reviews: 85
    }
];

// --- Subject Struggle Areas (for AI's initial understanding) ---
const subjectStruggleAreas = {
    "Mathematics": [
        "algebra", "calculus", "geometry", "trigonometry", "statistics", "pre-calculus",
        "equations", "functions", "derivatives", "integrals", "proofs", "math problems"
    ],
    "Computer Science": [
        "programming", "coding", "python", "java", "javascript", "c++", "data structures",
        "algorithms", "web development", "databases", "software engineering", "cybersecurity"
    ],
    "Science": [
        "physics", "chemistry", "biology", "earth science", "environmental science",
        "genetics", "ecology", "thermodynamics", "mechanics", "chemical reactions", "lab reports"
    ],
    "English/Literature": [
        "essay writing", "grammar", "composition", "literary analysis", "poetry",
        "shakespeare", "novel analysis", "research papers", "reading comprehension"
    ],
    "History": [
        "world history", "american history", "european history", "ancient history",
        "modern history", "historical analysis", "research skills", "timeline", "events"
    ],
    "Languages": [
        "spanish", "french", "german", "mandarin", "grammar", "conversation",
        "pronunciation", "vocabulary", "fluency", "speaking", "listening", "writing"
    ]
};

// --- Keyword Mappings (to map user input to tutor specialties) ---
const keywordMappings = {
    // Mathematics
    "calc": "Calculus", "derivative": "Calculus", "integral": "Calculus",
    "equation": "Algebra", "function": "Algebra", "graph": "Algebra",
    "shapes": "Geometry", "angles": "Geometry", "theorems": "Geometry",
    "sine": "Trigonometry", "cosine": "Trigonometry", "tan": "Trigonometry",
    "stats": "Statistics", "probability": "Statistics",

    // Computer Science
    "code": "Programming", "program": "Programming", "coding": "Programming",
    "python": "Python Programming", "java": "Java Programming", "js": "JavaScript Programming",
    "data structures": "Data Structures", "algorithms": "Algorithms",
    "web dev": "Web Development", "html": "Web Development (Frontend)", "css": "Web Development (Frontend)",
    "database": "Database Systems", "sql": "Database Systems (SQL, NoSQL)",
    "software": "Software Engineering", "cyber security": "Cybersecurity Basics",

    // Science
    "physic": "Physics", "motion": "Physics", "energy": "Physics",
    "chem": "Chemistry", "chemical": "Chemistry", "reactions": "Chemical Reactions",
    "biology": "Biology", "biochem": "Biochemistry", "cells": "Biology",
    "lab": "Lab Techniques", "experiment": "Lab Techniques",

    // English/Literature
    "essay": "Essay Writing", "writing": "Essay Writing", "paper": "Essay Writing",
    "grammar": "Grammar", "punctuation": "Grammar",
    "poetry": "Poetry Analysis", "poem": "Poetry Analysis",
    "shakespeare": "Shakespearean Literature", "play": "Shakespearean Literature",
    "novel": "Literary Analysis", "book": "Literary Analysis",
    "creative writing": "Creative Writing",

    // History
    "world war": "World History", "ancient": "Ancient Civilizations",
    "europe": "European History", "america": "American History",
    "modern": "Modern History", "cold war": "Modern History",
    "historical research": "Historical Research", "research history": "Historical Research",
    "middle ages": "Medieval History", "art history": "Art History",

    // Languages
    "french": "French", "spanish": "Spanish", "german": "German",
    "mandarin": "Mandarin", "conversation": "Conversation Practice",
    "pronounce": "Pronunciation", "speak": "Conversation Practice",
    "vocab": "Vocabulary", "learn language": "Conversation Practice"
};

// Exporting these arrays so they can be imported and used in tutor.js
export { teachers, subjectStruggleAreas, keywordMappings };