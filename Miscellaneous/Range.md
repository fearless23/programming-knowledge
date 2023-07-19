# Range
Range or interval in computer programming are interval b/w start and end with some step usually 1.

- Range from 0 to 5 is 0,1,2,3,4,5 (5 inclusive)
- Array.slice(0,n): n exclusive

- When creating range for loop or otherwise any range use open ended range as they seems to fit better in zero-indexed systems like array.

- range: [0,length_of_array) will go and perfectly match every index
 because length=3, means [0,3) i.e 0,1,2

- middle of [0,length_of_array) = length_of_array/2
- length=2, middle=1
- length=3, middle=1.5 or 1
- length=4, middle=2
- left & right array: [0,l/2), [l/2+1,l)