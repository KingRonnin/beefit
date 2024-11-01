import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './HabitChallenges.css';


const HabitChallenges = () => {
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      name: "Daily Stretch Challenge",
      description: "Stretch for at least 10 minutes every day.",
      days: 7,
      completed: 1,
      completionDates: [""],
      joined: false,
      streak: 1,
    },
    {
      id: 2,
      name: "Hydration Challenge",
      description: "Drink at least 2 liters of water daily.",
      days: 7,
      completed: 1,
      completionDates: [],
      joined: false,
      streak: 0,
    },
    {
      id: 3,
      name: "10-Minute Meditation",
      description: "Meditate for 10 minutes each day for a month.",
      days: 30,
      completed: 1,
      completionDates: [],
      joined: false,
      streak: 0,
    },
  ]);

  const [recommendations, setRecommendations] = useState([]);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [currentChallengeId, setCurrentChallengeId] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isExerciseComplete, setIsExerciseComplete] = useState(false);
  const [timer, setTimer] = useState(3);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const exerciseSectionRef = useRef(null);

  const dailyStretchExercises = [
    { name: "Neck Rolls", image: "https://i.pinimg.com/originals/0d/ea/83/0dea83ceff79824c7eb23a9834dab4fb.gif" },
    { name: "Shoulder Stretch", image: "https://liftmanual.com/wp-content/uploads/2023/04/standing-reverse-shoulder-stretch.gif" },
    { name: "Hamstring Stretch", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_4tdtyAXRYnisU1MfmnH2ZoSlpiUpZPlMiQ&s" },
    { name: "Hip Flexor Stretch", image: "https://newlife.com.cy/wp-content/uploads/2019/11/10531301-Kneeling-Hip-Flexor-Stretch_Hips_360.gif" },
    { name: "Cat-Cow Stretch", image: "https://homeworkouts.org/wp-content/uploads/anim-cat-cow-pose.gif" },
    { name: "Child's Pose", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDSA8zRCfOFFE5Vndx40VafVUDtX6il1MuCg&s" },
  ];

  useEffect(() => {
    const savedChallenges = JSON.parse(localStorage.getItem('challenges'));
    if (savedChallenges) {
      setChallenges(savedChallenges);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    if (isTimerActive && timer > 0) {
      const timerId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else if (timer === 0) {
      setIsExerciseComplete(true);
      setIsTimerActive(false);
      setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
      setTimer(3);
      toast.success('🎉 Exercise Completed!', {
        position: "top-center",
        style: { fontSize: '1.5rem' },
      });
    }
  }, [isTimerActive, timer]);

  const joinChallenge = (id) => {
    setCurrentChallengeId(id);
    setShowJoinModal(true);
  };

  const confirmJoinChallenge = () => {
    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge) =>
        challenge.id === currentChallengeId ? { ...challenge, joined: true } : challenge
      )
    );

    recommendChallenges();
    setShowJoinModal(false);
    toast.success('🎉 You have joined the challenge!', {
      position: "top-center",
      style: { fontSize: '1.5rem' },
    });

    if (currentChallengeId === 1) {
      setExercises(dailyStretchExercises);
      setCurrentExerciseIndex(0);
      exerciseSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExerciseStart = () => {
    if (currentExerciseIndex < exercises.length) {
      setIsExerciseComplete(false);
      setIsTimerActive(true);
    } else {
      const completedChallenge = challenges.find(ch => ch.id === currentChallengeId);
      const today = new Date().toISOString().split('T')[0];

      setChallenges(prevChallenges =>
        prevChallenges.map(challenge => {
          if (challenge.id === completedChallenge.id) {
            const isNewStreak = !challenge.completionDates.includes(today);
            return {
              ...challenge,
              completionDates: [...challenge.completionDates, today],
              streak: isNewStreak ? challenge.streak + 1 : challenge.streak,
              completed: challenge.completed + 1,
            };
          }
          return challenge;
        })
      );

      toast.success('🎉 Challenge Completed!', {
        position: "top-center",
        style: { fontSize: '1.5rem' },
      });
    }
  };

  const handleCompletionDateChange = (challengeId) => {
    const newDate = prompt("Enter the new completion date (YYYY-MM-DD):");
    if (newDate) {
      setChallenges(prevChallenges =>
        prevChallenges.map(challenge => {
          if (challenge.id === challengeId) {
            return {
              ...challenge,
              completionDates: [...challenge.completionDates, newDate],
              completed: challenge.completed + 1,
            };
          }
          return challenge;
        })
      );
      toast.success('🎉 Completion date updated successfully!', {
        position: "top-center",
        style: { fontSize: '1.5rem' },
      });
    }
  };

  const recommendChallenges = () => {
    const completedChallenges = challenges.filter(challenge => challenge.completed > 0);
    const newRecommendations = [];

    completedChallenges.forEach(challenge => {
      switch (challenge.id) {
        case 1:
          newRecommendations.push({ id: 4, name: "Flexibility Challenge", description: "Improve your flexibility with daily stretches for 2 weeks." });
          break;
        case 2:
          newRecommendations.push({ id: 5, name: "Healthy Eating Challenge", description: "Incorporate more fruits and vegetables into your meals for a month." });
          break;
        case 3:
          newRecommendations.push({ id: 6, name: "Mindfulness Challenge", description: "Practice mindfulness for 10 minutes every day for 21 days." });
          break;
        default:
          break;
      }
    });

    setRecommendations([...new Set(newRecommendations)]);
  };

  const handleSocialShare = (challenge) => {
    const shareMessage = `Join me in the "${challenge.name}" challenge! ${challenge.description}`;
    if (navigator.share) {
      navigator.share({
        title: challenge.name,
        text: shareMessage,
        url: window.location.href,
      })
      .catch((error) => console.error('Error sharing:', error));
    } else {
      alert("Copy this link to share: " + window.location.href);
    }
  };

  return (
    <div className="habit-challenges">
      <h2>Habit-Building Challenges</h2>

      <div className="challenge-list">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="challenge-card" role="group" aria-labelledby={`challenge-${challenge.id}`}>
            <h3 id={`challenge-${challenge.id}`}>{challenge.name}</h3>
            <p className="challenge-description">{challenge.description}</p>
            <p>{challenge.days}-Day Challenge</p>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${(challenge.completed / challenge.days) * 100}%` }}
                aria-valuenow={challenge.completed}
                aria-valuemin="0"
                aria-valuemax={challenge.days}
                role="progressbar"
              />
            </div>
            <p className="progress-text">{challenge.completed} / {challenge.days} Days Completed</p>
            <div className="streak-tracker">
              <h3>Streak Tracker</h3>
              <p>Current Streak: {challenge.streak} days</p>
              <div className="streak-badge">
                <span className={`badge ${challenge.streak >= 7 ? 'gold' : ''}`}>{challenge.streak >= 7 ? '🔥' : '🌟'}</span>
              </div>
            </div>
            {!challenge.joined ? (
              <button onClick={() => joinChallenge(challenge.id)}>Join Challenge</button>
            ) : (
              <div className="completed-section">
                <button onClick={handleExerciseStart}>Start Exercise</button>
                <button onClick={() => handleCompletionDateChange(challenge.id)}>Change Completion Date</button>
                <button onClick={() => handleSocialShare(challenge)}>Share Challenge</button>
                <p>Completed: {challenge.completed}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {showJoinModal && (
        <div className="modal">
          <h3>Join Challenge</h3>
          <p>Are you sure you want to join this challenge?</p>
          <button onClick={confirmJoinChallenge}>Yes</button>
          <button onClick={() => setShowJoinModal(false)}>No</button>
        </div>
      )}

      <div ref={exerciseSectionRef} className={`exercise-section ${isExerciseComplete ? 'complete' : ''}`}>
        {currentExerciseIndex < exercises.length && (
          <>
            <h2>{exercises[currentExerciseIndex].name}</h2>
            <img src={exercises[currentExerciseIndex].image} alt={exercises[currentExerciseIndex].name} />
            <p>Get ready to complete this exercise!</p>
            {isTimerActive ? (
              <div className="timer">{timer} seconds left!</div>
            ) : (
              <button onClick={handleExerciseStart}>Start</button>
            )}
          </>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default HabitChallenges;
