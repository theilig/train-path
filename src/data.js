export const trainData = {
    'Flying Sim': [
        {cost: 0, coolDown: 15, railSims: 20, requirements: {}},
        {cost: 3300, coolDown: 14, railSims: 25, requirements: {}},
        {cost: 4400, coolDown: 14, railSims: 31, requirements: {}},
        {cost: 7150, coolDown: 13, railSims: 36, requirements: {wallet: 3}},
        {cost: 8800, coolDown: 13, railSims: 41, requirements: {wallet: 4}},
        {cost: 10450, coolDown: 12, railSims: 47, requirements: {wallet: 5}},
        {cost: 13750, coolDown: 12, railSims: 52, requirements: {wallet: 6}},
        {cost: 16500, coolDown: 11, railSims: 58, requirements: {wallet: 7}},
        {cost: 19250, coolDown: 11, railSims: 62, requirements: {wallet: 8}}
    ],
    'Llama Line': [
        {cost: 4400, coolDown: 30, railSims: 84, requirements: {}},
        {cost: 7150, coolDown: 29, railSims: 94, requirements: {wallet: 3, 'Flying Sim': 3}},
        {cost: 8800, coolDown: 29, railSims: 105, requirements: {wallet: 4}},
        {cost: 10450, coolDown: 28, railSims: 115, requirements: {wallet: 5, 'Flying Sim': 5}},
        {cost: 13750, coolDown: 28, railSims: 124, requirements: {wallet: 6}},
        {cost: 16500, coolDown: 27, railSims: 133, requirements: {wallet: 7, 'Flying Sim': 7}},
        {cost: 19250, coolDown: 27, railSims: 141, requirements: {}},
    ],
    'Simeo Plus B': [
        {cost: 8800, coolDown: 10, railSims: 15, requirements: {wallet: 4}},
        {cost: 10450, coolDown: 9, railSims: 18, requirements: {wallet: 5, 'Llama Line': 3}},
        {cost: 13750, coolDown: 9, railSims: 20, requirements: {wallet: 6}},
        {cost: 16500, coolDown: 9, railSims: 23, requirements: {wallet: 7, 'Llama Line': 5}},
        {cost: 19250, coolDown: 8, railSims: 27, requirements: {wallet: 8}},
    ],
    'LM Grade 23': [
        {cost: 16250, coolDown: 30, railSims: 53, requirements: {wallet: 6, 'Simeo Plus B': 3}},
        {cost: 19500, coolDown: 29, railSims: 68, requirements: {wallet: 7, 'Flying Sim': 7}},
        {cost: 22750, coolDown: 28, railSims: 79, requirements: {wallet: 8, 'Llama Line': 4}},
    ]
}
