# RDBMS
- RDBMS aka Relational Database Management System, is a program used to maintain a relational database.
- Data is stored in form of tables
- SQL aka Structured Query Language is used to query data across tables

## SQL based databases
- MySQL
- PostgreSQL
- MariaDb


## MySQL
- It is an open-source RDBMS developed by MySQL AB 
- Acquired and owned by Oracle Corporation.
- It is written in C and C++. 
- It supports all major operating systems.
- Pros:
  - Easy to use and setup
  - lightweight and leading database for small to medium size applications
- Cons:
  - Not very scale-able
  - MySQL strictly fails to adhere to SQL's prescriptive regulations/standards

## PostgreSQL
- PostgreSQL is an open-source, freely-accessibly service 
- Owned by the PostgreSQL Global Development Group
- Advanced version of MySQL
- Pros:
  - Complaint with SQL`s standards
  - Vertical scaling with plugins, extensions like Geographical data
  - third party tools enhance performance
- Cons:
  - Documentation for advanced topics is not fully developed
  - Lacks advanced monitoring to display the database's current performance and status

## SQLite
- It is very small database/engine comparable to C library or npm package
- Due to small size, it is usually embedded in applications

## MariaDB
- Open source fork of MySQL as faster and better alternative to MySQL
- Good for data warehousing, customer analysis and optimized querying
- Community not fully developed yet

## MSSQL - SQL Server
- Developed and owned by Microsoft
- Corporate solution to RDBMS
- Rich documentation
- Pros: 
  - Tailored to business landscape and end-to-end commercial solutions
  - Highly flexible and has a vivid range of versions with diverse functionalities suitable for varying use case
  - Integrable with Microsoft's cloud-based data technologies, including Azure SQL Databases.
- Cons:
  - MSSQL is not available free of cost and follows a pay-as-you-go model.
  - MSSQL has a dynamic license agreement susceptible to frequent changes and altercations.

## Oracle
- Another corporate solution

## SQL Syntax
Each of above database use SQL to query, however there can be small variations in SQL syntax and operations name being used.


## Cloud Solutions aka DBaas - Database as a service
- Earlier, we listed traditional databases developed and used in early days of computing. 
- Most of them follow the CPU, RAM model where you decide nodes, CPU and RAM of the server to install your database.
- Many of them do not offer scalability as inbuilt feature, also may or may not handle large number of connections.
- So, cloud companies and other developed solutions/databases that are scale-able and performant and easy to setup in current cloud computing era.

## AWS RDS
AWS RDS is just a service to create, maintain many of relational database in AWS
### Supported databases
- MySQL
- MariaDB
- PostgreSQL
- Oracle
- Microsoft SQL Server
- IBM Db2
- Aurora (MySQL compatible)
- Aurora (PostgreSQL compatible)
### features
- Multi zone deployment
- Optimized read and writes


## AWS Aurora
- AWS Aurora is database developed by amazon to be consistent with SQL but perform better at scale.
- Aurora also offers serverless version which can scale flexibly without need to deploy or add more cpu like traditional model and optimized for cost as charged via pay-as-you-go model
- Aurora comes in 2 variations: MySQL compatible and PostgreSQL compatible
- Features
  - Multi region replication
  - Replica across multiple storage nodes
  - Integrates easily with AWS ecosystem


## Vitess
- Vitess is build on top of MySQL and it adds scalability features that MySQL lacked.
- Automatically re-write slow queries and do caching to speed up queries.
- Solve issue of MySQL not able to handle high number connections due to memory overhead.
- Automatically handles failover, backups
- Inbuilt shard management
- Initially developed by youtube
- Developed and contributed by Linux Foundation and PlanetScale

## Planetscale
- Planetscale is PaaS offering many services, one of them is vitess
- Planetscale offer vitess as a service and other features on top
- On top of vitess, planetscale offers many features
  - Git-like schema change
  - Automatic backup
  - Recovery
  - Query Analytics

- Planetscale is competitor to AWS Aurora / RDS