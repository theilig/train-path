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
        {cost: 19250, coolDown: 11, railSims: 62, requirements: {wallet: 8}},
        {cost: 22000, coolDown: 10, railSims: 68, requirements: {wallet: 9}},
    ],
    'Llama Line': [
        {cost: 4400, coolDown: 30, railSims: 84, requirements: {}},
        {cost: 7150, coolDown: 29, railSims: 94, requirements: {wallet: 3, 'Flying Sim': 3}},
        {cost: 8800, coolDown: 29, railSims: 105, requirements: {wallet: 4}},
        {cost: 10450, coolDown: 28, railSims: 115, requirements: {wallet: 5, 'Flying Sim': 5}},
        {cost: 13750, coolDown: 28, railSims: 124, requirements: {wallet: 6}},
        {cost: 16500, coolDown: 27, railSims: 133, requirements: {wallet: 7, 'Flying Sim': 7}},
        {cost: 19250, coolDown: 27, railSims: 141, requirements: {wallet: 8}},
        {cost: 22000, coolDown: 26, railSims: 149, requirements: {wallet: 9, 'Flying Sim': 9}},
        {cost: 27500, coolDown: 26, railSims: 158, requirements: {}},
    ],
    'Simeo Plus B': [
        {cost: 8800, coolDown: 10, railSims: 15, requirements: {wallet: 4}},
        {cost: 10450, coolDown: 9, railSims: 18, requirements: {wallet: 5, 'Llama Line': 3}},
        {cost: 13750, coolDown: 9, railSims: 20, requirements: {wallet: 6}},
        {cost: 16500, coolDown: 9, railSims: 23, requirements: {wallet: 7, 'Llama Line': 5}},
        {cost: 19250, coolDown: 8, railSims: 27, requirements: {wallet: 8}},
        {cost: 22000, coolDown: 8, railSims: 30, requirements: {wallet: 9, 'Llama Line': 7}},
        {cost: 27500, coolDown: 8, railSims: 33, requirements: {wallet: 10}},
        {cost: 33000, coolDown: 8, railSims: 37, requirements: {wallet: 11, 'Llama Line': 9}},
        {cost: 33000, coolDown: 7, railSims: 40, requirements: {wallet: 12}},
    ],
    'LM Grade 23': [
        {cost: 16250, coolDown: 30, railSims: 53, requirements: {wallet: 6, 'Simeo Plus B': 3}},
        {cost: 19500, coolDown: 29, railSims: 68, requirements: {wallet: 7, 'Flying Sim': 7}},
        {cost: 22750, coolDown: 28, railSims: 79, requirements: {wallet: 8, 'Llama Line': 4}},
        {cost: 26000, coolDown: 27, railSims: 91, requirements: {wallet: 9}},
        {cost: 32500, coolDown: 26, railSims: 102, requirements: {wallet: 10, 'Simeo Plus B': 5}},
        {cost: 39000, coolDown: 25, railSims: 114, requirements: {wallet: 11}},
    ],
    'Sim Rail Grade 00': [
        {cost: 22750, coolDown: 75, railSims: 232, requirements: {wallet: 8, 'LM Grade 23': 3}},
        {cost: 26000, coolDown: 71, railSims: 243, requirements: {wallet: 9}},
        {cost: 32500, coolDown: 67, railSims: 254, requirements: {wallet: 10, 'Simeo Plus B': 6}},
        {cost: 39000, coolDown: 63, railSims: 266, requirements: {wallet: 11}},
        {cost: 45000, coolDown: 59, railSims: 277, requirements: {wallet: 12, 'Llama Line': 7}},
        {cost: 55000, coolDown: 56, railSims: 288, requirements: {wallet: 13}}
    ],
    'Quill Railroad OP1': [
        {cost: 32500, coolDown: 20, railSims: 47, requirements: {wallet: 10, 'Sim Rail Grade 00': 3}},
        {cost: 39000, coolDown: 19, railSims: 53, requirements: {wallet: 11}},
        {cost: 45500, coolDown: 18, railSims: 59, requirements: {wallet: 12, 'LM Grade 23': 5}},
        {cost: 55250, coolDown: 17, railSims: 63, requirements: {wallet: 13}},
        {cost: 65000, coolDown: 16, railSims: 66, requirements: {wallet: 14, 'Sim Rail Grade 00': 6}},
        {cost: 74750, coolDown: 15, railSims: 70, requirements: {wallet: 15}}
    ]
}
