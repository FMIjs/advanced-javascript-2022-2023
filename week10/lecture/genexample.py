def fibonacci():
    current, next = 0, 1
    while True:
        yield current
        current, next = next, current + next

# Create a generator object by calling the fibonacci() function
sequence = fibonacci()

# Iterate over the first 10 numbers in the fibonacci sequence
for _ in range(10):
    print(next(sequence))