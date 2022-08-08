# Change Log

<!-- All notable changes to the "indent-nested-dictionary" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file. -->

## [0.0.1] - 2020-02-23

- Initial release

## [0.0.2] - 2022-08-09
### Added
- Support for user-defined indent setting

## [0.0.3] - 2022-08-09
### Changed
- Changed indentation logic: no new line for empty structures such as `[]`, `{}`, `()` (only one level deep)
```
Before
------
[{}]
 ↓
[
    {
    }
]

After
-----
[{}]
 ↓
[
    {}
]
```
