import { categoryColors } from '~/assets/dictionaries'

export type TriviaQuestionApiResult = {
  category: string
  type: 'boolean' | 'multiple'
  question: string
  difficulty: 'easy' | 'medium' | 'hard'
  correct_answer: string
  incorrect_answers: string[]
}

interface TriviaQuestionInterface {
  id: number
  category: string
  categoryClass: TriviaCategory
  categoryColor: CategoryColor
  type: 'boolean' | 'multiple'
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  formattedQuestion: string
  correct_answer: string
  incorrect_answers: string[]
  starRating: number
  mustShowChoices: boolean
}

class TriviaQuestion implements TriviaQuestionInterface {
  id: number
  category!: string
  categoryClass: TriviaCategory
  categoryColor: CategoryColor
  type!: 'boolean' | 'multiple'
  difficulty!: 'easy' | 'medium' | 'hard'
  question!: string
  formattedQuestion!: string
  correct_answer!: string
  incorrect_answers!: string[]
  starRating: number
  mustShowChoices: boolean

  constructor(apiQuestion: TriviaQuestionApiResult, id: number) {
    console.log(apiQuestion)
    Object.assign(this, apiQuestion)
    this.id = id

    let categoryClass: string = apiQuestion.category.toLowerCase()
    if (categoryClass === 'science & nature') categoryClass = 'science'

    const subCategory: RegExp = /(\w+):[\W]*(.*)/
    if (subCategory.test(categoryClass)) {
      const catMatch = categoryClass.match(subCategory)
      if (catMatch !== null) categoryClass = catMatch[1]
    }

    this.categoryClass = categoryClass.replace(/ /g, '-') as TriviaCategory

    this.categoryColor = categoryColors[this.categoryClass]
    this.formattedQuestion =
      apiQuestion.type === 'boolean'
        ? 'True or False: ' + apiQuestion.question
        : '' + apiQuestion.question

    this.starRating = apiQuestion.difficulty === 'easy' ? 1 : apiQuestion.difficulty === 'medium' ? 2 : 3
    
    const needsChoices = /which of (?:the following|these)|which .* (?:is|was) not/i.test(apiQuestion.question)
    console.log('needsChoices', needsChoices)
    this.mustShowChoices = needsChoices;
  }
}

export { TriviaQuestion, categoryColors }
