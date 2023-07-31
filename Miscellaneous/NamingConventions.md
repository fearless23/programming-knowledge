# Naming Conventions

- `camelCase`
  - class methods
  - functions
  - variables
  - database field names
- `PascalCase`
  - class
  - types (typescript)
- `snake_case`
  - class methods
  - functions
  - variables
  - database field names
- `kebab-case` 
  - url
  - git branches
  - npm package name
  - folder name
  - file name
  - css classes
  - AWS titles for SNS, SQS, Lambda etc...

> Note: camelCase and PascalCase involves capital characters, thus case sensitive, which makes them suitable for case-sensitive environment, but might not be suitable for case-insensitive environment

> Note: snake_case & kebab-case involves lowercase characters along with `_` or `-`, thus case insensitive, which makes them suitable for both case-sensitive and case-insensitive environment. However, `_` and `-` is to be considered, as some environments do not allow `_` or `-` in the names.

> Note: Windows file system names are case-insensitive, MyFile and myfile are same in windows but different in Linux, thus it is better to use kebab or snake case. Since, file names are usually used in paths like a url, kebab-case is suitable here.

> Note: Inside the code, all 4 cases are suitable and so use the one already used in project and decide with your team.