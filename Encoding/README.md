# String Encoding

Encoding means to codify characters that make a string.

## Experiment
Let`s say we represent english letters into numbers like 
- a=1,b=2,c=3 ..so on,A=27,B=28,Z=52
Then we represent symbols like , . / [ & etc. with number like
-  .=53, /=54, [=55 and so on
Assume, all english letters (26*2=52) and symbols found in a typical keyboard can be represented by numbers starting at 0 till say 82
Thus, it means 82 characters represented by range 0-82
0-82 means 0-128 or 0-2^7 (if represented in powers of 2 for binary)
Thus, we need 7 bits to store our representation
Since, One Byte is 8 bits, lets use that
So finally, our system of english letters and symbols can be represented by collection of bytes where each byte(=8 bit) will store a character. 

## Standard Encoding format
There are standard encoding format similar to our experiment which are maintained and used in multiple languages.
- Given a set to bits or bytes, we can find what does that represent in string form given we know the encoding.
- Same set of bytes can mean different in different encodings.

#### Encodings
- UTF-8: The standard used by most of programming languages (mostly represent english languages)
- ASCII: simplest and oldest standard
- UTF-16: Not related to UTF-8, called 16-bit unicode

## Unicode code points
Represent the characters of unicode a total of 1,112,064 valid code points i.e characters

### UTF-8 vs UTF-16
- UTF-8 and UTF-16 both encode Unicode characters, but in a different way
- UTF-8 uses one to four bytes(=8bit)
- UTF-16 uses one or two 16 bit code units

## Further readings
- Read code points, endian-ness, code unit, planes(unicode) to understand how a unicode character is stored using
UTF-8 or UTF-16. 
- ASCII is just 1-128 characters.
