# A.C.I.D

Properties of a database
- `A` - `Atomicity`:  Multiple operations can be grouped into a single logical entity.
- `C` - `Consistency`: When the data and data operations follows a set of rules.
- `I` - `Isolation`: Simultaneous operations on the same data never see each other`s in-progress work.
- `D` - `Durability`: Completed updates will not be lost if system crashes.

## Atomicity
Multiple operations can be grouped into a single logical entity, such that all or none of the changes are completed.
> [Video](https://www.youtube.com/watch?v=bwgvaLP7Ucg)  

Atomicity is basically the ability of database to group operations into a transaction (unrelated to financial transaction), where the transaction is either fully successful or not at all. If there is partial successful all operations performed so far are reversed, as if no operation was performed.

### Examples
1. Deduct $100 from user A(balance=500), and add $100 to user B(balance=200), create a new record of $100 in txn table. Now, all three operations must be completed or none at all. Because partial success will mean missing currency units.
If first operation is performed successfully but second fails then first operation is reversed.
Note: we can always retry the entire transaction (group of operations)

2. Add card to user_card table, update shipping table status to shipped. Both operations must be completed otherwise none. If first operation is performed successfully but second fails then first operation is reversed.

## Consistency
Consistency is achieved by establishing rules such that all data points within the database system must align to a set of values in order to be properly read and accepted. 
> [Video](https://www.youtube.com/watch?v=IUOmz-KMb7k)  
> [Article](https://redis.com/blog/database-consistency/)

There are many types of consistencies when considering databases
1. `Data Consistency`  
  When the data in the system is valid, accurate and meets all desired constraints.  
  Examples:
    - `first_name` column of a table can`t be less than 2 characters.
    - primary key of a table must be unique
    - varchar 32 means string length can`t be greater than 32
2. `Freshness Consistency`  
  When reading from a database always retrieves the latest value.  
  Examples:  
    - User have 500 in account, Withdraws 100, then check balance should reflect 400.  
    Above example seems trivial, but with replicated databases, master-slave design, multiple databases across world regions, the freshness consistency might be difficult to achieve.  
  - 2.1. Strong Consistency  
  Data retrieved is always fresh (no matter what), but this might affect performance as query to database can take more time than usual.
  - 2.2. Weak Consistency or Eventual Consistency  
  Data retrieved is not always fresh, (but it will be fresh if the nodes are given enough time to sync). 
  The query can be faster as compared to `Strong Consistency` one, but data may not be fresh.

> Note: There are many terms overloaded and no fine boundaries in terms of definition. Some consider freshness consistency to be actual database consistency, some consider both.
So, Consistency can`t be explained in single sentences thus better to explain different types.


## Isolation
It is database property such that any simultaneous operations on the same data never see each other`s in-progress work.
> [Video](https://www.youtube.com/watch?v=mBNucbfl2vM)

Let`s consider the example of transfer $100 from A to B in atomicity. If another query (sum of balance of user A and balance of user B) is executed while the database transaction is happening. We have 3 scenarios
1. Query happens before db transaction started: sum = 700
2. Query happens after db transaction completed: sum = 700
3. Query happens in b/w db transaction:  
    - If query happens after operation 1, sum can be 600 which is not valid

Thus, isolation provides ability such that changes happening in atomic transaction are not visible to query and vice-versa. Changes performed by any database operations should only be visible to other operations only after it has completed.

Isolation affects performance but promotes reliable data. Databases offers varying kind of isolation like full isolation, no isolation or some isolation.  
For full isolation, database has to be designed to isolate every database operation and thus involves some speed hits and will be slower than no isolation.

## Durability
It is guarantee such that completed updates will not be lost if system crashes.
> [Video](https://www.youtube.com/watch?v=O2otAXjEXTk)

Typically, when a data is send to database, it persists the data to some disk so that if database engine crashes
data is safely stored and can be retrieved when engine is back. But usually databases do not persist every single data every time, instead for performance reasons persisting is done in batches.
Persisting can be done on on every write, or regular intervals (Point in Time snapshot), or when nodes is not busy or when a certain data limit is crossed
Each persisting strategy has pros and cons.