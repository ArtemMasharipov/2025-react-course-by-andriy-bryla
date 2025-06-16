import { useEffect, useRef, useState } from 'react'
import { STATES, TIMING, WORD_PAIRS } from './constants.js'

export const useTrainer = () => {  const [currentIndex, setCurrentIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [state, setState] = useState(STATES.TRAINING)
  const [completedWords, setCompletedWords] = useState([])
  const inputRef = useRef(null)
  const currentWord = WORD_PAIRS[currentIndex]
  const isCompleted = state === STATES.COMPLETED

  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === 'Escape' && state !== STATES.TRAINING) {
        if (state === STATES.CORRECT) {
          const nextIndex = currentIndex + 1
          if (nextIndex >= WORD_PAIRS.length) {
            setState(STATES.COMPLETED)
          } else {
            setCurrentIndex(nextIndex)
            setUserInput('')
            setState(STATES.TRAINING)
          }
        } else if (state === STATES.INCORRECT) {
          setState(STATES.TRAINING)
        }
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [state, currentIndex])

  useEffect(() => {
    if (state === STATES.TRAINING && inputRef.current) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, TIMING.FOCUS_DELAY)
    }
  }, [state])
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const checkAnswer = () => {
    const isCorrect =
      userInput.toLowerCase().trim() === currentWord.english.toLowerCase()

    if (isCorrect) {
      setState(STATES.CORRECT)
      setCompletedWords(prev => [...prev, currentWord])

      setTimeout(() => {
        const nextIndex = currentIndex + 1
        if (nextIndex >= WORD_PAIRS.length) {
          setState(STATES.COMPLETED)
          setUserInput('')
        } else {
          setCurrentIndex(nextIndex)
          setUserInput('')
          setState(STATES.TRAINING)
        }
      }, TIMING.FEEDBACK_DURATION)
    } else {
      setState(STATES.INCORRECT)
      setUserInput('')
      setTimeout(() => {
        setState(STATES.TRAINING)      }, TIMING.FEEDBACK_DURATION)
    }
  }

  const handleInputChange = e => {
    setUserInput(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (userInput.trim() && !isCompleted) {      checkAnswer()
    }
  }

  const resetTrainer = () => {
    setCurrentIndex(0)
    setUserInput('')
    setState(STATES.TRAINING)
    setCompletedWords([])
  }

  const progress = isCompleted
    ? 100
    : Math.min((completedWords.length / WORD_PAIRS.length) * 100, 100).toFixed(
        0
      )
  return {
    currentWord,
    userInput,
    setUserInput,
    state,
    completedWords,
    isCompleted,
    progress,
    handleInputChange,
    handleSubmit,
    handleReset: resetTrainer,
    inputRef,
    currentIndex,
  }
}
