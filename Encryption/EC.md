# Elliptic Curve

- prime256v1 or p256 and other curves are used for cryptography in elliptic curve cryptography.

## ECDH Key Exchange
Elliptic curve Deffie-Hellman Key exchange

Two parties (say A and B) generates public-private key pair using similar EC curve.
they exchange their public keys via internet (email or other mode), and then use to 
compute shared secret with their own private and other party public key. Computed shared
secret is same for both.

Party A:  Compute shared secret using Party A private key and Party B public key

## Shared Secret
Shared secret is derived from private and public key(other party) as mentioned above in ECDH key exchange.
This secret can be used to encrypt sensitive data
Usually, shared secret is 32 bytes

## AES Encryption
Using shared secret we can get a new value known as encryption key, to do that we can
use some salt and non-salt to update hash of shared secret
Usually, shared secret is 32 bytes

We can use this encryption key to encrypt sensitive data instead of secret key