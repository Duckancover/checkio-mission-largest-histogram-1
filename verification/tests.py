"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "Basics": [
        {
            "input": [5],
            "answer": 5
        },
        {
            "input": [5, 3],
            "answer": 6
        },
        {
            "input": [1, 1, 4, 1],
            "answer": 4
        },
        {
            "input": [1, 1, 3, 1],
            "answer": 4
        },
        {
            "input": [2, 1, 4, 5, 1, 3, 3],
            "answer": 8
        }

    ]
}
