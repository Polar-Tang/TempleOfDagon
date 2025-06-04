import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import SecondNavbar from "@/components/SecondNavbar"

type Question = {
  id: number
  text: string
  options: {
    value: string
    label: string
    score: number
  }[]
}

type Result = {
  title: string
  description: string
  minScore: number
  maxScore: number
}
export default function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [scores, setScores] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [totalScore, setTotalScore] = useState(0)

  const questions: Question[] = [
    {
      id: 1,
      text: "You born as a woman or man?",
      options: [
        { value: "a", label: "Woman", score: 3 },
        { value: "b", label: "Man", score: 1 },
        { value: "c", label: "sexuallity is undefined", score: 2 },
      ],
    },
    {
      id: 2,
      text: "Are you virgin?",
      options: [
        { value: "a", label: "Yes", score: 3 },
        { value: "b", label: "No", score: 1 },
        { value: "c", label: "Do objects with no life count?", score: 2 },
      ],
    },
    {
      id: 3,
      text: "Do you have any disease or malforming in your body?",
      options: [
        { value: "a", label: "I'm totally healthy", score: 3 },
        { value: "b", label: "You don't want to know", score: 2 },
        { value: "c", label: "Luckilly i'm alive", score: 1 },
      ],
    }
  ]

  const results: Result[] = [
    {
      title: "The simple doomed soul",
      description:
        "There's no point to sacrifice a simple doomed soul like you, but we could kill you if you want to.",
      minScore: 3,
      maxScore: 5,
    },
    {
      title: "Suitable Soul",
      description:
        "Your body may offer us suitable salts for experiments, and your sould will nourish us.",
      minScore: 6,
      maxScore: 8,
    },
    {
      title: "The Pure Soul",
      description:
        "You're perfect for soul sacrifice, your volunteer will be appreciated",
      minScore: 9,
      maxScore: 12,
    },
  ]

  const handleAnswerSelect = (value: string) => {
    const question = questions[currentQuestion]
    const selectedOption = question.options.find((option) => option.value === value)

    if (selectedOption) {
      setAnswers({ ...answers, [question.id]: value })
      setScores({ ...scores, [question.id]: selectedOption.score })
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const finalScore = Object.values(scores).reduce((sum, score) => sum + score, 0)
      setTotalScore(finalScore)
      setShowResults(true)
    }
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setScores({})
    setShowResults(false)
    setTotalScore(0)
  }

  const getCurrentResult = () => {
    return results.find((result) => totalScore >= result.minScore && totalScore <= result.maxScore)
  }

  const currentQuestionData = questions[currentQuestion]
  const isAnswered = answers[currentQuestionData.id] !== undefined
  const result = getCurrentResult()

  return (
    <SecondNavbar>


    <div className="flex items-center justify-center ">
      <Card className="w-full max-w-md border-black">
        {!showResults ? (
          <>
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-black text-xl">Soul Sacrifice Questionnaire</CardTitle>
              <CardDescription className="text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <h3 className="text-black font-medium text-lg mb-4">{currentQuestionData.text}</h3>
              <RadioGroup
                value={answers[currentQuestionData.id] || ""}
                onValueChange={handleAnswerSelect}
                className="space-y-3"
              >
                {currentQuestionData.options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2 border border-gray-200 p-3 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <RadioGroupItem value={option.value} id={`option-${currentQuestionData.id}-${option.value}`} />
                    <Label
                      htmlFor={`option-${currentQuestionData.id}-${option.value}`}
                      className="flex-grow cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="border-t border-gray-200 pt-4">
              <Button
                onClick={handleNext}
                disabled={!isAnswered}
                className="w-full bg-black hover:bg-gray-800 text-white"
              >
                {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader className="text-center border-b border-gray-200">
              <CardTitle className="text-black text-xl">Your Results</CardTitle>
              <CardDescription className="text-gray-600">Based on your answers</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 text-center">
              {result && (
                <>
                  <h2 className="text-2xl font-bold text-black mb-2">{result.title}</h2>
                  <p className="text-gray-700 mb-6">{result.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-black h-2.5 rounded-full" style={{ width: `${(totalScore / 15) * 100}%` }}></div>
                  </div>
                  <p className="text-sm text-gray-500">Score: {totalScore} out of 15</p>
                </>
              )}
            </CardContent>
            <CardFooter className="border-t border-gray-200 pt-4 grid grid-rows-[1fr_1fr]">
              <Button className="w-full bg-black hover:bg-gray-800 text-white flex-row">
                <Link to="/contact" >

                  Sacrifice my soul
                </Link>
              </Button>
              <Button onClick={handleReset} className="w-full flex-row bg-black hover:bg-gray-800 text-white">
                Take Quiz Again
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
    </SecondNavbar>
  )
}
