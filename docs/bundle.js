/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material */ \"./src/Material.ts\");\n\r\nvar Game = /** @class */ (function () {\r\n    function Game() {\r\n        var _this = this;\r\n        this.loop = function () {\r\n            _this.update();\r\n            requestAnimationFrame(_this.loop);\r\n        };\r\n        this.update = function () {\r\n            _this.gl.viewport(0, 0, _this.canvasElm.width, _this.canvasElm.height);\r\n            _this.gl.clear(_this.gl.COLOR_BUFFER_BIT);\r\n            _this.gl.enable(_this.gl.BLEND);\r\n            _this.gl.blendFunc(_this.gl.SRC_ALPHA, _this.gl.ONE_MINUS_SRC_ALPHA);\r\n            _this.sprite1.render();\r\n            _this.gl.flush();\r\n        };\r\n        this.canvasElm = document.getElementById(\"glCanvas\");\r\n        this.gl = this.canvasElm.getContext(\"webgl2\");\r\n        this.gl.clearColor(0.4, 0.6, 1, 0);\r\n        var vs = document.getElementById(\"vs_01\").innerHTML;\r\n        var fs = document.getElementById(\"fs_01\").innerHTML;\r\n        var sprite1_material = new _Material__WEBPACK_IMPORTED_MODULE_0__.default(this.gl, vs, fs);\r\n        this.sprite1 = new _Material__WEBPACK_IMPORTED_MODULE_0__.Sprite(this.gl, \"img/femboy.png\", sprite1_material);\r\n        this.loop();\r\n    }\r\n    return Game;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\r\n\n\n//# sourceURL=webpack://roam/./src/Game.ts?");

/***/ }),

/***/ "./src/Material.ts":
/*!*************************!*\
  !*** ./src/Material.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"Sprite\": () => (/* binding */ Sprite)\n/* harmony export */ });\nvar Material = /** @class */ (function () {\r\n    function Material(gl, vs, fs) {\r\n        this.gl = gl;\r\n        var vsShader = this.getShader(vs, this.gl.VERTEX_SHADER);\r\n        var fsShader = this.getShader(fs, this.gl.FRAGMENT_SHADER);\r\n        if (vsShader && fsShader) {\r\n            this.program = gl.createProgram();\r\n            gl.attachShader(this.program, vsShader);\r\n            gl.attachShader(this.program, fsShader);\r\n            gl.linkProgram(this.program);\r\n            if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {\r\n                console.error(\"Cannot load shader:\\n\" + gl.getProgramInfoLog(this.program));\r\n                return null;\r\n            }\r\n        }\r\n        gl.detachShader(this.program, vsShader);\r\n        gl.detachShader(this.program, fsShader);\r\n        gl.deleteShader(vsShader);\r\n        gl.deleteShader(fsShader);\r\n    }\r\n    Material.prototype.getShader = function (script, type) {\r\n        var gl = this.gl;\r\n        var out = gl.createShader(type);\r\n        gl.shaderSource(out, script);\r\n        gl.compileShader(out);\r\n        if (!gl.getShaderParameter(out, gl.COMPILE_STATUS)) {\r\n            console.error(\"Shader Error: \\n\" + gl.getShaderInfoLog(out));\r\n            return null;\r\n        }\r\n        return out;\r\n    };\r\n    return Material;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Material);\r\nvar Sprite = /** @class */ (function () {\r\n    function Sprite(gl, img_url, material) {\r\n        var _this = this;\r\n        this.gl = gl;\r\n        this.img_url = img_url;\r\n        this.material = material;\r\n        this.isLoaded = false;\r\n        this.onLoad = function () {\r\n            _this.setup();\r\n        };\r\n        this.setup = function () {\r\n            var gl = _this.gl;\r\n            gl.useProgram(_this.material.program);\r\n            _this.gl_tex = gl.createTexture();\r\n            gl.bindTexture(gl.TEXTURE_2D, _this.gl_tex);\r\n            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);\r\n            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);\r\n            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);\r\n            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);\r\n            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, _this.image);\r\n            gl.bindTexture(gl.TEXTURE_2D, null);\r\n            _this.tex_buff = gl.createBuffer();\r\n            gl.bindBuffer(gl.ARRAY_BUFFER, _this.tex_buff);\r\n            gl.bufferData(gl.ARRAY_BUFFER, Sprite.createRectArray(), gl.STATIC_DRAW);\r\n            _this.geo_buff = gl.createBuffer();\r\n            gl.bindBuffer(gl.ARRAY_BUFFER, _this.geo_buff);\r\n            gl.bufferData(gl.ARRAY_BUFFER, Sprite.createRectArray(), gl.STATIC_DRAW);\r\n            _this.aPositionLoc = gl.getAttribLocation(_this.material.program, \"a_position\");\r\n            _this.aTexcoordLoc = gl.getAttribLocation(_this.material.program, \"a_texCoord\");\r\n            _this.uImageLoc = gl.getUniformLocation(_this.material.program, \"u_image\");\r\n            gl.useProgram(null);\r\n            _this.isLoaded = true;\r\n        };\r\n        this.image = new Image();\r\n        this.image.src = img_url;\r\n        this.image.onload = this.onLoad;\r\n    }\r\n    Sprite.createRectArray = function (x, y, w, h) {\r\n        if (x === void 0) { x = 0; }\r\n        if (y === void 0) { y = 0; }\r\n        if (w === void 0) { w = 1; }\r\n        if (h === void 0) { h = 1; }\r\n        return new Float32Array([\r\n            x,\r\n            y,\r\n            x + w,\r\n            y,\r\n            x,\r\n            y + h,\r\n            x,\r\n            y + h,\r\n            x + w,\r\n            y,\r\n            x + w,\r\n            y + h,\r\n        ]);\r\n    };\r\n    Sprite.prototype.render = function () {\r\n        if (this.isLoaded) {\r\n            var gl = this.gl;\r\n            gl.useProgram(this.material.program);\r\n            gl.activeTexture(gl.TEXTURE0);\r\n            gl.bindTexture(gl.TEXTURE_2D, this.gl_tex);\r\n            gl.uniform1i(this.uImageLoc, 0);\r\n            gl.bindBuffer(gl.ARRAY_BUFFER, this.tex_buff);\r\n            gl.enableVertexAttribArray(this.aTexcoordLoc);\r\n            gl.vertexAttribPointer(this.aTexcoordLoc, 2, gl.FLOAT, false, 0, 0);\r\n            gl.bindBuffer(gl.ARRAY_BUFFER, this.geo_buff);\r\n            gl.enableVertexAttribArray(this.aPositionLoc);\r\n            gl.vertexAttribPointer(this.aPositionLoc, 2, gl.FLOAT, false, 0, 0);\r\n            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);\r\n            gl.useProgram(null);\r\n        }\r\n    };\r\n    return Sprite;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://roam/./src/Material.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n\r\nwindow.addEventListener(\"load\", function () {\r\n    new _Game__WEBPACK_IMPORTED_MODULE_0__.default();\r\n});\r\n\n\n//# sourceURL=webpack://roam/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;