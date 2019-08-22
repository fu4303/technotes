# PHP - THE RIGHT WAY 

[Php - The right way](http://phptherightway.com)

#### # SOLID Principles

| | | |
|-|-|-|
|**S**| Single responsibility|Code reuse is possible|
|**O**| Open(for extensions) / closed (for modifications) |It means classes should use interfaces.|
|**L**| Liskov Substitution Principle (Objects of program should be able to be replaced by instances of sub-types) | Say Database is interface & we use same code for all types of databases. Mysql can be substituted by Redis without changing a thing in our code which stores session data.|
|**I**| Interface segregation principle (Many client-specific interface is better than 1 general-purpose interface) | Break interface to many specific interfaces|
|**D**| Depebdency Inversions (depend upon abstractions not concretion - decoupling modules) | If any dependencies are required, it is good if it's a interface or abstract class|

#### # Dependency Managements

- Package management : `composer`, `composer.json` & `composer.lock`
- *Website* : http://packagist.org
- Global installed packages : `/usr/local/bin`
- *Syntax* : 
    - `composer require twig/twig:~1.5`
    - `composer install` 
    - `composer update`
- *index.php* : `require 'vendor/autoload.php'`
- *Security of packages* : http://security,sensiolabs.org/check

#### # BASIC CODING PRACTICES

> Basics

- https://phptherightway.com/pages/The-Basics.html

> *DESIGN PATTERN / ARCHITECTURE* - Way to structure code(Frameworks already decide which ones to use.)

|Pattern|Description|
|-|-|
|*Full details*|https://designpatternsphp.readthedocs.io/en/latest/|
|**Factory**|Simple class to create objects|
|**Singleton**|Access to only one instance at a particular time <li/>`__construct()` [*protected*] prevents creating new instance outside <li/>`__clone()` [*private*] prevents cloning of object <li/>`__wakeup()` [*private*] prevents unserializing |
|**Strategy**||
|**Front-controller**|`index.php` single entry point|
|**MVC** (Model-View-Controller) | Most *popular* architecture|

> *DEPENDENCY INJECTION*

- *Inversion-of-control* / *Dependencies inversion*  problem is solved by this dependency injection
- Dependencies can imported in 3 ways
    - *Constructor* : `function __construct ( Bar $b ) { ... }`
    - *Methods* : `function foo ( Bar $b ) { ... }`
    - *Property* : `public $b = new Bar ();`

#### Standard PHP Library (SPL)

- Collection of classes and interfaces.
- *Datastructure* classes **(stack, queue, heap, etc)**
- *Iterators* methods to traverse datastructures
- Your own classes which implement SPL interfaces

#### XDebug
- Extension of php to assist debugging
- Used by code editor like phpStorm


#### Composer & packagist
- Composer is like npm used to manage dependencies
- [Packagist.com](https://packagist.org/) has tons of libraries
- `composer.json` has list of dependencies needed.
- `composer.lock` has fixed version of dependencies. Its created by composer.
- `composer update` will use *json* and alter versions
- `composer install` will use *lock* with same versions
- `composer require twig/twig:*2.0` adds repo/library
- `./vendor/autoload.php` folder has all dependencies.
- `~1.8` means “anything newer than `1.8.0`, but less than `2.0.x-dev`”
- `1.8.*` using wildcard
- *Security vulnerabilities*
    - https://security.symfony.com/
    - https://libraries.io/


#### # PDO (Used by Doctrine2 library)

> Common interface to connect to many databases

```php
$conn = new PDO("mysql:host=localhost;dbname=foo", "user", "password");
$query = $conn->query("select * from bar");    
$row = $query->fetch(PDO::FETCH_ASSOC);    
echo htmlentities($row["anycolumn"]);
```

> Prevent SQL Injections

```php
$conn = new PDO("mysql:host=localhost;dbname=foo", "user", "passsword");
$query = $conn->prepare("select * from bar where id = :id");
$id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT );
$query->bindParam( ":id", $id, PDO::PARAM_INT);
$query->execute();
```

#### # ERRORS AND EXCEPTIONS

> *ERROR SEVERITY*
  - `ERROR`  :  fatal (runtime)
  - `NOTICE`  :  non-fatal (runtime) [may or maynot cause error]
  - `WARNING`  :  non-fatal(runtime)
  - `E_STRICT`  :  compatible to future php versions (compile-time)

> *EXCEPTIONS*
  - Errors are thrown as exceptions to make developer aware & handle error
  - **SPL** extension : List of predefined exception classes. Just reuse them.
  - Laravel uses *Whoops* library to nicely display exceptions.

#### # SECURITY

- [Guide to building secure php apps](https://paragonie.com/blog/2017/12/2018-guide-building-secure-php-software)

> BASICS

|Threat| Info|
|-|-|
| *Cross-Site Scripting:* |   Affects web browsers. Improperly handled data by the application will cause Javascript to execute on another user's computer. |
| *SQL Injection:* |   Using Crafted string inputs, you can change the query that the application runs. |
| *LDAP Injection:* |   Affects Active Directory causing arbitrary reading/writing in directory server.|
| *XPath Injection:* |   Affects XML document querying. |
| *Command Injection:* |   Affects shell executions |

> OPERATING ENVIRONMENT

- 3rd-party libraries
- Operating system
- Hardware components
- Hypervisor, if virtual machine
- power supply
- Network
- web browser

> BASIC CRYPTOGRAPHY

- Refer Cryptogaphy notes.

> PASSWORD STORAGE [Argon2, Bcrypt]

- Always use hashes and not encryption. 
- First Hash then encrypt is good (database encryption)
- Use `password_hash()` and `password_verify()` rather than `crypt()`
- Hashes are purposefully slow to avoid brute-force attack

> HASHING SALTING PASSWORD

- Prevents dictionary attacks
- `saltedPassword = password + SaltText` 
    - Added before Hashing by `password_hash()`
    - It is unique per user. This makes brute-force more difficult.    
    - It is stored as a part of hash. So no need to store in database.


```php
$hashed = password_hash("anypassword", PASSWORD_DEFAULT );      # Hashing
if (password_verify("tryingpassword", $hashed)) { ... }         # check
```

> FILE VERIFICATIONS

- Calculate hash of the file using `SHA1` OR `MD5`
- It should match the one shown on website.
- **Note :** Use *Digital signatures* since it is more secure than hashing.

> ERROR REPORTING

- **Development - php.ini**

```ini
display_errors = On
display_startup_errors = On
error_reporting = -1
log_errors = On
```

- **Production - php.ini**

```ini
display_errors = Off
display_startup_errors = Off
error_reporting = E_ALL
log_errors = On
```

#### # CACHING [ZendOpcache]

- **OpCode caching**
    - PHP converts source code to this machine readable code.
    - If source code is same then convertion is a wastage each time we execute.
    - By storing each `OpCodes` in memory we eliminate the convertion step.
    - If source code is unmodified with same signatures/modification-time then cached `OpCodes` can be used skipping the convertion.
    - `ZendOpcache` - php extension enabled by default
- **Object caching**
    - `Redis, Memcache` is used to cache objects data which is frequently needed and unlikely to be changed.
    - This objects are stored in memory.