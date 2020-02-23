module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/extension.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/extension.ts":
/*!**************************!*\
  !*** ./src/extension.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __webpack_require__(/*! vscode */ "vscode");
const indent_1 = __webpack_require__(/*! ./indent */ "./src/indent.ts");
function indentNestedDictionary() {
    const activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined) {
        return;
    }
    activeTextEditor.edit(editBuilder => {
        activeTextEditor.selections.forEach(selection => {
            const selectedValue = activeTextEditor.document.getText(selection);
            const indentedValue = indent_1.default(selectedValue);
            editBuilder.replace(selection, indentedValue);
        });
    });
}
function activate(context) {
    let disposable = vscode.commands.registerCommand("extension.indentNestedDictionary", indentNestedDictionary);
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),

/***/ "./src/indent.ts":
/*!***********************!*\
  !*** ./src/indent.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function appendIndent(acc, indent) {
    if (indent < 0) {
        throw new RangeError("Starting indent too small");
    }
    return acc + "\t".repeat(indent);
}
const maxLineLength = 80;
const quoteChars = ["'", '"'];
const indentChars = ["[", "{", "("];
const deindentChars = ["]", "}", ")"];
const ignoreChars = [" ", "\n", "\t"];
// Write whatever is needed, and then the first if s, in acc.
// Does not care about what happens after the character has been appended to acc
// s = "abc", acc = "123" -> "123a"
// s = "}}", acc = "{\n\t'a': 1" -> "{\n\t'a': 1\n}"
function indentDict(s, indent = 0) {
    let acc = "";
    let isInString = false;
    let quoteChar = "";
    while (true) {
        if (s.length === 0) {
            return acc;
        }
        if (acc.length === 0) {
            acc = appendIndent(acc, indent);
        }
        let nextChar = s.charAt(0);
        let prevChar = acc.charAt(acc.length - 1);
        s = s.substr(1);
        if (isInString) {
            if (nextChar === "\\") {
                nextChar += s.charAt(0);
                s = s.substr(1);
            }
            else if (nextChar === quoteChar) {
                isInString = false;
                quoteChar = "";
            }
        }
        else {
            if (quoteChars.includes(nextChar)) {
                isInString = true;
                quoteChar = nextChar;
            }
            if (ignoreChars.includes(nextChar)) {
                continue;
            }
            if (prevChar === ":") {
                acc += " ";
            }
            if (indentChars.includes(prevChar)) {
                indent += 1;
            }
            if (deindentChars.includes(nextChar)) {
                indent -= 1;
            }
            if (indentChars.includes(prevChar) ||
                prevChar === "," ||
                deindentChars.includes(nextChar)) {
                acc += "\n";
                acc = appendIndent(acc, indent);
            }
        }
        acc += nextChar;
    }
}
function formatDict(s) {
    let startingIndent = 0;
    while (true) {
        try {
            return indentDict(s, startingIndent);
        }
        catch (RangeError) {
            startingIndent += 1;
        }
    }
}
exports.default = formatDict;


/***/ }),

/***/ "vscode":
/*!*************************!*\
  !*** external "vscode" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vscode");

/***/ })

/******/ });
//# sourceMappingURL=extension.js.map