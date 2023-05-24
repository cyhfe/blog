# npm

## Semantic Versioning

 changes in the major number are meant to represent an update that contains breaking changes that would require changes to your code to remediate.

 Changes to the minor number are intended to constitute an update that is backward- compatible but which provides new functionality and, optionally, contains old functionality that while still functional is now deprecated and will be removed in a future release (minor number changes can also represent major internal refactoring but which produces no outward-facing changes). 
 
 The patch number represents bug fix changes only.


- “express” : “1.2.3” – NPM will grab this specific version only.
- “express”: “~1.2.3” – NPM will grab the most recent patch version. (So, ~1.2.3 will find the latest 1.2.x version but not 1.3.x or anything below 1.2.x.)
- “express”: “^1.2.3” – NPM will grab the most recent minor version. (So, ^1.2.3 will find the latest 1.x.x version but not 1.3.x or anything below 1.x.x.)
- “express”: “*” – NPM will grab the newest version available. (There is also an explicit latest value that does the same thing.)
