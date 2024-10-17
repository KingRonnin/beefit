import React, { useState } from 'react';
import './customPlan.css';


type AnswerOption = {
    answerText: string;
    isCorrect: boolean;
};

type Question = {
    questionText: string;
    answerOptions: AnswerOption[];
};

export default function CustomPlan() {
    const questions: Question[] = [
        {
            questionText: 'What is your age?',
            answerOptions: [
                { answerText: 'Under 18', isCorrect: false },
                { answerText: '18-30', isCorrect: false },
                { answerText: '31-45', isCorrect: false },
                { answerText: 'Over 45', isCorrect: false },
            ],
        },
        {
            questionText: 'What is your gender?',
            answerOptions: [
                { answerText: 'Male', isCorrect: false },
                { answerText: 'Female', isCorrect: false },
                { answerText: 'Non-binary', isCorrect: false },
                { answerText: 'Prefer not to say', isCorrect: false },
            ],
        },
        {
            questionText: 'What are your primary fitness goals? (Select all that apply)',
            answerOptions: [
                { answerText: 'Weight Loss', isCorrect: false },
                { answerText: 'Muscle Gain', isCorrect: false },
                { answerText: 'Improving Endurance', isCorrect: false },
                { answerText: 'Increasing Flexibility', isCorrect: false },
            ],
        },
        {
            questionText: 'Are there specific areas of your body you want to focus on?',
            answerOptions: [
                { answerText: 'Upper Body', isCorrect: false },
                { answerText: 'Lower Body', isCorrect: false },
                { answerText: 'Core Strength', isCorrect: false },
                { answerText: 'Full Body', isCorrect: false },
            ],
        },
        {
            questionText: 'How would you describe your current fitness level?',
            answerOptions: [
                { answerText: 'Beginner', isCorrect: false },
                { answerText: 'Intermediate', isCorrect: false },
                { answerText: 'Advanced', isCorrect: false },
                { answerText: 'Expert', isCorrect: false },
            ],
        },
        {
            questionText: 'What types of workouts have you been doing recently?',
            answerOptions: [
                { answerText: 'Strength Training', isCorrect: false },
                { answerText: 'Cardiovascular', isCorrect: false },
                { answerText: 'Yoga/Pilates', isCorrect: false },
                { answerText: 'Mixed/Multiple Types', isCorrect: false },
            ],
        },
        {
            questionText: 'Do you have any injuries or health conditions that we should consider when designing your workout plan?',
            answerOptions: [
                { answerText: 'Yes, I have injuries or health conditions.', isCorrect: false },
                { answerText: 'No, I have no significant injuries or conditions.', isCorrect: false },
                { answerText: 'I have chronic pain.', isCorrect: false },
                { answerText: 'I am recovering from surgery.', isCorrect: false },
            ],
        },
        {
            questionText: 'Are there any exercises or movements that you need to avoid?',
            answerOptions: [
                { answerText: 'High impact (jumping, running)', isCorrect: false },
                { answerText: 'Heavy lifting', isCorrect: false },
                { answerText: 'Repetitive bending or twisting', isCorrect: false },
                { answerText: 'None', isCorrect: false },
            ],
        },
        {
            questionText: 'What kind of exercise equipment do you have access to?',
            answerOptions: [
                { answerText: 'No equipment', isCorrect: false },
                { answerText: 'Basic (dumbbells, resistance bands)', isCorrect: false },
                { answerText: 'Cardio machines (treadmill, bike)', isCorrect: false },
                { answerText: 'Full gym setup', isCorrect: false },
            ],
        },
        {
            questionText: 'Will you be working out at home or at a gym?',
            answerOptions: [
                { answerText: 'At home', isCorrect: false },
                { answerText: 'At a gym', isCorrect: false },
            ],
        },
        {
            questionText: 'How many days per week are you able to commit to exercising?',
            answerOptions: [
                { answerText: '1-2 days', isCorrect: false },
                { answerText: '3-4 days', isCorrect: false },
                { answerText: '5-6 days', isCorrect: false },
                { answerText: 'Every day', isCorrect: false },
            ],
        },
        {
            questionText: 'How much time can you dedicate to each workout session?',
            answerOptions: [
                { answerText: 'Less than 30 minutes', isCorrect: false },
                { answerText: '30-60 minutes', isCorrect: false },
                { answerText: '60-90 minutes', isCorrect: false },
                { answerText: 'More than 90 minutes', isCorrect: false },
            ],
        },
        {
            questionText: 'What types of workouts do you enjoy?',
            answerOptions: [
                { answerText: 'Strength training', isCorrect: false },
                { answerText: 'Cardio', isCorrect: false },
                { answerText: 'Yoga/Pilates', isCorrect: false },
                { answerText: 'High-Intensity Interval Training (HIIT)', isCorrect: false },
            ],
        },
        {
            questionText: 'How do you prefer to track your fitness progress?',
            answerOptions: [
                { answerText: 'App-based digital tracking', isCorrect: false },
                { answerText: 'Manual logging', isCorrect: false },
                { answerText: 'Biometric measurements', isCorrect: false },
                { answerText: 'I do not track my progress', isCorrect: false },
            ],
        },
        {
            questionText: 'What features can we provide to help you stay accountable?',
            answerOptions: [
                { answerText: 'Regular reminders', isCorrect: false },
                { answerText: 'Progress reports', isCorrect: false },
                { answerText: 'Achievement badges', isCorrect: false },
                { answerText: 'Social sharing options', isCorrect: false },
            ],
        }
    ];

    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [showScore, setShowScore] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);

    const handleAnswerOptionClick = (isCorrect: boolean) => {
        if (isCorrect) {
            setScore(score + 1);
        }


        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    return (
        <div className='app'>
            {showScore ? (
                <div className='score-section'>
                    You completed the questionnaire.
                </div>
            ) : (
                <>
                    <div className='question-section'>
                        <div className='question-count'>
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </div>
                        <div className='question-text'>{questions[currentQuestion].questionText}</div>
                    </div>
                    <div className='answer-section'>
                        {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                            <button key={index} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
                                {answerOption.answerText}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}



