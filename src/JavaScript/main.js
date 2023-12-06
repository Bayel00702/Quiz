
const questions = [
    {
        title: 'Какая форма общего уравнения квадратичной функции?',
        variants: [
            'y = mx + b',
            'y = ax^2 + bx + c',
            'y = a/x',
            'y = sqrt(x)'
        ],
        correct: 1
    },
    {
        title: 'Как называется точка, в которой график квадратичной функции пересекает ось y?',
        variants: [
            'Вершина',
            'Фокус',
            'Асимптота',
            'Пересечение'
        ],
        correct: 3
    },
    {
        title: 'Как определить, ветви графика квадратичной функции направлены вверх или вниз?',
        variants: [
            'По коэффициенту a',
            'По коэффициенту b',
            'По коэффициенту c',
            'По коэффициенту m'
        ],
        correct: 0
    },
    {
        title: 'Как найти вершину графика квадратичной функции, заданной уравнением y = ax^2 + bx + c?',
        variants: [
            '(-b/2a, c)',
            '(a/2, b/2)',
            '(b/2a, c)',
            '(-a/2, -b/2)'
        ],
        correct: 0
    },
    {
        title: 'Как называется число, которое определяет положение вершины квадратичной функции на горизонтальной оси?',
        variants: [
            'Координата y',
            'Координата x',
            'Дискриминант',
            'Коэффициент a'
        ],
        correct: 1
    },
    {
        title: 'Что представляет собой дискриминант в квадратичном уравнении ax^2 + bx + c = 0?',
        variants: [
            'Коэффициент при x',
            'Коэффициент при x^2',
            'Корень уравнения',
            'Выражение b^2 - 4ac'
        ],
        correct: 3
    },
]

let correctAnswer = 0
let questionIdx = 0

let gameList = document.querySelector('.game__list')
let gameBtn = document.querySelector('.game__btn')
let gameResult = document.querySelector('.game__result')
let gameProgress = document.querySelector('.game__progress')


const clearPage = () => {
    gameResult.innerHTML = ''
    gameList.innerHTML = ''
}
clearPage()

const showQuestion = () => {

    const title = `<h2 class="game__title">%title%</h2>`
    const titleReplace = title.replace('%title%', questions[questionIdx]['title'])
    gameResult.innerHTML = titleReplace

    let variantsNum = 1
    questions[questionIdx]['variants'].map((item, idx) => {
        const questionTemplate = `
         <li class="game__item">
                <label class="game__label">
                    <input value="%number%" type="radio" class="game__input">
                    <span>%variants%</span>
                </label>
            </li>
        `

        const variantsHTML = questionTemplate.replace('%variants%', item).replace('%number%', variantsNum)

        gameList.innerHTML += variantsHTML
        variantsNum++
    })

}
showQuestion()

const checkVariant = () => {

    const checkVar = gameList.querySelector('input[type="radio"]:checked')

    if (!checkVar){
        return gameBtn.blur()

    }

    const userVar = parseInt(checkVar.value)

    if (userVar === questions[questionIdx]['correct']){
        correctAnswer++

    }

    let step = questionIdx + 1
    const progress = Math.round((step / questions.length * 100))


    gameProgress.innerHTML = `
        <div style="width: ${progress}%" class="game__progress-lenght"></div>
    `
    if (questionIdx !== questions.length - 1){
        questionIdx++
        clearPage()
        showQuestion()


    } else {
        clearPage()
        result()
    }
}

gameBtn.onclick = checkVariant

const result = () => {

    const resultTemplate = `
        <h3 class="game__result-title">%title%</h3>
        <p class="game__result-subtitle">%message%</p>
        <p class="game__result-result">%result%</p>
    `

    let title, message

    if (correctAnswer === questions.length){
        title = 'Поздравляем!'
        message = 'Вы ответили верно на все вопросы!'
    } else if ((correctAnswer * 100) / questions.length >= 50 ){
        title = 'Неплохой результат!'
        message = 'Вы дали более половины правильных вопросов!'
    } else {
        title = 'Нужно постараться'
        message = 'У вас меньше половины правильных вопросов!'
    }

    let result = `${correctAnswer} из ${questions.length}`
    const lastMessage = resultTemplate.replace('%title%', title).replace('%message%', message).replace('%result%', result)

    gameResult.innerHTML = lastMessage

    gameBtn.blur()
    gameBtn.innerText = `Начать заново`
    gameBtn.onclick = () => {
        history.go()
    }
}