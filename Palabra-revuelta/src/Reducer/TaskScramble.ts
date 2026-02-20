export interface ScrambleWordsState {
    words: string[],
    currentWord: string,
    scrambledWord: string,
    guess: string,
    points: number,
    errorCounter: number,
    maxAllowErrors: number,
    skipCounter: number,
    maxSkips: number,
    isGameOver: boolean,
    totalwords: number
}

const GAME_WORDS = [
    'ESQUELETO',
    'ENDERMAN',
    'STEVE',
    'SLIME',
    'ZOMBIE',
    'CREEPER',
    'SHULKER',
    'LEPISMA',
    'FANTASMA',
    'GUARDIAN',
    'GHAST',
    'ARAÑA',
    'DEVASTADOR',
    'PIGLIN',
    'AHOGADO',
    'BLAZE',
    'ENDERMITE',
];

// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = '') => {
    return word
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
};

export type ScrambleWordsAction =
    | { type: 'SET_GUESS', payload: string }
    | { type: 'CHECK_ANSWER' }
    | { type: 'SKIP_WORD' }
    | { type: 'START_NEW_GAME', payload: ScrambleWordsState }

export const GetInitialState = (): ScrambleWordsState => {
    const shuffledword = shuffleArray([...GAME_WORDS])

    return {
        words: shuffledword,
        currentWord: shuffledword[0],
        scrambledWord: scrambleWord(shuffledword[0]),
        guess: '',
        points: 0,
        errorCounter: 0,
        maxAllowErrors: 3,
        skipCounter: 0,
        maxSkips: 3,
        isGameOver: false,
        totalwords: shuffledword.length
    }
}


export const scramblewordsReducer = (state: ScrambleWordsState, action: ScrambleWordsAction): ScrambleWordsState => {
    switch (action.type) {
        case 'SET_GUESS':

            return {
                ...state,
                guess: action.payload.trim().toUpperCase()
            }

        case 'CHECK_ANSWER':
            if (state.currentWord === state.guess) {
                const newWords = state.words.slice(1)



                return {
                    ...state,
                    words: newWords,
                    points: state.points + 1,
                    guess: '',
                    currentWord: newWords[0],
                    scrambledWord: scrambleWord(newWords[0])
                }
            }

            return {
                ...state,
                guess: '',
                errorCounter: state.errorCounter + 1,
                isGameOver: state.errorCounter + 1 >= state.maxAllowErrors
            }

        case "SKIP_WORD": {
            if (state.skipCounter >= state.maxSkips) return state

            const updateWords = state.words.slice(1)
            return {
                ...state,
                skipCounter: state.skipCounter + 1,
                words: updateWords,
                currentWord: updateWords[0],
                scrambledWord: scrambleWord(updateWords[0]),
                guess: ''
            }
        }
        case 'START_NEW_GAME':

            return action.payload
        default:
            return state;
    }
}