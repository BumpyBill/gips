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

/***/ "./src/Gips/Game.ts":
/*!**************************!*\
  !*** ./src/Gips/Game.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Math_Matrix3x3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Math/Matrix3x3 */ \"./src/Math/Matrix3x3.ts\");\n\r\nvar Game = /** @class */ (function () {\r\n    function Game() {\r\n        var _this = this;\r\n        this._updateFunction = function () { };\r\n        this.worldSpaceMatrix = new _Math_Matrix3x3__WEBPACK_IMPORTED_MODULE_0__.default();\r\n        this.clearColor = [0, 0, 0, 0];\r\n        this.loop = function () {\r\n            _this.update();\r\n            requestAnimationFrame(_this.loop);\r\n        };\r\n        this.update = function () {\r\n            _this.gl.viewport(0, 0, _this.canvasElm.width, _this.canvasElm.height);\r\n            _this.gl.clearColor(_this.clearColor[0], _this.clearColor[1], _this.clearColor[2], _this.clearColor[3]);\r\n            _this.gl.clear(_this.gl.COLOR_BUFFER_BIT);\r\n            _this.gl.enable(_this.gl.BLEND);\r\n            _this.gl.blendFunc(_this.gl.SRC_ALPHA, _this.gl.ONE_MINUS_SRC_ALPHA);\r\n            _this._updateFunction();\r\n            _this.gl.flush();\r\n        };\r\n        this.canvasElm = document.getElementById(\"glCanvas\");\r\n        this.gl = this.canvasElm.getContext(\"webgl2\");\r\n        this.resize(window.innerWidth, window.innerHeight);\r\n        this.loop();\r\n    }\r\n    Object.defineProperty(Game.prototype, \"updateFunction\", {\r\n        set: function (func) {\r\n            this._updateFunction = func;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Game.prototype.resize = function (x, y) {\r\n        this.canvasElm.width = x;\r\n        this.canvasElm.height = y;\r\n        var wRatio = x / (y / 1080);\r\n        this.worldSpaceMatrix = new _Math_Matrix3x3__WEBPACK_IMPORTED_MODULE_0__.default()\r\n            .transition(-1, 1)\r\n            .scale(2 / wRatio, -2 / 1080);\r\n    };\r\n    return Game;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\r\n\n\n//# sourceURL=webpack://roam/./src/Gips/Game.ts?");

/***/ }),

/***/ "./src/Gips/Gips.ts":
/*!**************************!*\
  !*** ./src/Gips/Gips.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Gips\": () => (/* binding */ Gips)\n/* harmony export */ });\nvar Gips;\r\n(function (Gips) {\r\n    Gips.VertexShader = \"\\n    attribute vec2 a_position;\\n    attribute vec2 a_texCoord;\\n\\n    uniform mat3 u_world;\\n    uniform vec2 u_frame;\\n\\n    varying vec2 v_texCoord;\\n    void main(){\\n      gl_Position = vec4( u_world * vec3(a_position, 1), 1);\\n      v_texCoord = a_texCoord + u_frame;\\n    }\\n    \";\r\n    Gips.FragmentShader = \"\\n    precision mediump float;\\n    uniform sampler2D u_image;\\n    varying vec2 v_texCoord;\\n\\n     void main(){\\n      gl_FragColor = texture2D(u_image, v_texCoord);\\n    }\\n    \";\r\n})(Gips || (Gips = {}));\r\n\n\n//# sourceURL=webpack://roam/./src/Gips/Gips.ts?");

/***/ }),

/***/ "./src/Gips/Material.ts":
/*!******************************!*\
  !*** ./src/Gips/Material.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"Sprite\": () => (/* binding */ Sprite)\n/* harmony export */ });\n/* harmony import */ var _Math_Vector2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Math/Vector2 */ \"./src/Math/Vector2.ts\");\n/* harmony import */ var _Gips__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gips */ \"./src/Gips/Gips.ts\");\n\r\n\r\nvar Material = /** @class */ (function () {\r\n    function Material(game, vs, fs) {\r\n        if (vs === void 0) { vs = _Gips__WEBPACK_IMPORTED_MODULE_1__.Gips.VertexShader; }\r\n        if (fs === void 0) { fs = _Gips__WEBPACK_IMPORTED_MODULE_1__.Gips.FragmentShader; }\r\n        this.game = game;\r\n        this.gl = game.gl;\r\n        var gl = this.gl;\r\n        var vsShader = this.getShader(vs, this.gl.VERTEX_SHADER);\r\n        var fsShader = this.getShader(fs, this.gl.FRAGMENT_SHADER);\r\n        if (vsShader && fsShader) {\r\n            this.program = gl.createProgram();\r\n            gl.attachShader(this.program, vsShader);\r\n            gl.attachShader(this.program, fsShader);\r\n            gl.linkProgram(this.program);\r\n            if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {\r\n                console.error(\"Cannot load shader:\\n\" + gl.getProgramInfoLog(this.program));\r\n                return null;\r\n            }\r\n        }\r\n        gl.detachShader(this.program, vsShader);\r\n        gl.detachShader(this.program, fsShader);\r\n        gl.deleteShader(vsShader);\r\n        gl.deleteShader(fsShader);\r\n    }\r\n    Material.prototype.getShader = function (script, type) {\r\n        var gl = this.gl;\r\n        var out = gl.createShader(type);\r\n        gl.shaderSource(out, script);\r\n        gl.compileShader(out);\r\n        if (!gl.getShaderParameter(out, gl.COMPILE_STATUS)) {\r\n            console.error(\"Shader Error: \\n\" + gl.getShaderInfoLog(out));\r\n            return null;\r\n        }\r\n        return out;\r\n    };\r\n    return Material;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Material);\r\nvar Sprite = /** @class */ (function () {\r\n    function Sprite(gl, img_url, material, options) {\r\n        var _this = this;\r\n        this.gl = gl;\r\n        this.img_url = img_url;\r\n        this.material = material;\r\n        this.options = options;\r\n        this.isLoaded = false;\r\n        this.size = new _Math_Vector2__WEBPACK_IMPORTED_MODULE_0__.default(64, 64);\r\n        this.position = new _Math_Vector2__WEBPACK_IMPORTED_MODULE_0__.default();\r\n        this.uv = new _Math_Vector2__WEBPACK_IMPORTED_MODULE_0__.default();\r\n        this.onLoad = function () {\r\n            _this.setup();\r\n        };\r\n        this.setup = function () {\r\n            var gl = _this.gl;\r\n            gl.useProgram(_this.material.program);\r\n            _this.gl_tex = gl.createTexture();\r\n            gl.bindTexture(gl.TEXTURE_2D, _this.gl_tex);\r\n            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);\r\n            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);\r\n            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);\r\n            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);\r\n            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, _this.image);\r\n            gl.bindTexture(gl.TEXTURE_2D, null);\r\n            _this.uv = new _Math_Vector2__WEBPACK_IMPORTED_MODULE_0__.default(_this.size.x / _this.image.width, _this.size.y / _this.image.height);\r\n            _this.tex_buff = gl.createBuffer();\r\n            gl.bindBuffer(gl.ARRAY_BUFFER, _this.tex_buff);\r\n            gl.bufferData(gl.ARRAY_BUFFER, Sprite.createRectArray(0, 0, _this.uv.x, _this.uv.y), gl.STATIC_DRAW);\r\n            _this.geo_buff = gl.createBuffer();\r\n            gl.bindBuffer(gl.ARRAY_BUFFER, _this.geo_buff);\r\n            gl.bufferData(gl.ARRAY_BUFFER, Sprite.createRectArray(_this.position.x, _this.position.y, _this.size.x, _this.size.y), gl.STATIC_DRAW);\r\n            _this.aPositionLoc = gl.getAttribLocation(_this.material.program, \"a_position\");\r\n            _this.aTexcoordLoc = gl.getAttribLocation(_this.material.program, \"a_texCoord\");\r\n            _this.uImageLoc = gl.getUniformLocation(_this.material.program, \"u_image\");\r\n            _this.uWorldLoc = gl.getUniformLocation(_this.material.program, \"u_world\");\r\n            _this.uFrameLoc = gl.getUniformLocation(_this.material.program, \"u_frame\");\r\n            gl.useProgram(null);\r\n            _this.isLoaded = true;\r\n        };\r\n        if (\"size\" in options)\r\n            this.size = options.size;\r\n        if (\"position\" in options)\r\n            this.position = options.position;\r\n        this.image = new Image();\r\n        this.image.src = img_url;\r\n        this.image.onload = this.onLoad;\r\n    }\r\n    Sprite.prototype.render = function (frames) {\r\n        if (frames === void 0) { frames = new _Math_Vector2__WEBPACK_IMPORTED_MODULE_0__.default(0, 0); }\r\n        var frame = new _Math_Vector2__WEBPACK_IMPORTED_MODULE_0__.default(Math.floor(frames.x) * this.uv.x, Math.floor(frames.y) * this.uv.y);\r\n        if (this.isLoaded) {\r\n            var gl = this.gl;\r\n            gl.useProgram(this.material.program);\r\n            gl.activeTexture(gl.TEXTURE0);\r\n            gl.bindTexture(gl.TEXTURE_2D, this.gl_tex);\r\n            gl.uniform1i(this.uImageLoc, 0);\r\n            gl.bindBuffer(gl.ARRAY_BUFFER, this.tex_buff);\r\n            gl.enableVertexAttribArray(this.aTexcoordLoc);\r\n            gl.vertexAttribPointer(this.aTexcoordLoc, 2, gl.FLOAT, false, 0, 0);\r\n            gl.bindBuffer(gl.ARRAY_BUFFER, this.geo_buff);\r\n            gl.enableVertexAttribArray(this.aPositionLoc);\r\n            gl.vertexAttribPointer(this.aPositionLoc, 2, gl.FLOAT, false, 0, 0);\r\n            gl.uniform2f(this.uFrameLoc, frame.x, frame.y);\r\n            gl.uniformMatrix3fv(this.uWorldLoc, false, this.material.game.worldSpaceMatrix.getFloatArray());\r\n            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);\r\n            gl.useProgram(null);\r\n        }\r\n    };\r\n    Sprite.createRectArray = function (x, y, w, h) {\r\n        if (x === void 0) { x = 0; }\r\n        if (y === void 0) { y = 0; }\r\n        if (w === void 0) { w = 1; }\r\n        if (h === void 0) { h = 1; }\r\n        return new Float32Array([\r\n            x,\r\n            y,\r\n            x + w,\r\n            y,\r\n            x,\r\n            y + h,\r\n            x,\r\n            y + h,\r\n            x + w,\r\n            y,\r\n            x + w,\r\n            y + h,\r\n        ]);\r\n    };\r\n    return Sprite;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://roam/./src/Gips/Material.ts?");

/***/ }),

/***/ "./src/Math/Matrix3x3.ts":
/*!*******************************!*\
  !*** ./src/Math/Matrix3x3.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar M3x3 = /** @class */ (function () {\r\n    function M3x3() {\r\n        this.matrix = [\r\n            1, 0, 0,\r\n            0, 1, 0,\r\n            0, 0, 1\r\n        ];\r\n    }\r\n    M3x3.prototype.multiply = function (m) {\r\n        var out = new M3x3();\r\n        out.matrix = [\r\n            this.matrix[M3x3.M00] * m.matrix[M3x3.M00] + this.matrix[M3x3.M10] * m.matrix[M3x3.M01] + this.matrix[M3x3.M20] * m.matrix[M3x3.M02],\r\n            this.matrix[M3x3.M01] * m.matrix[M3x3.M00] + this.matrix[M3x3.M11] * m.matrix[M3x3.M01] + this.matrix[M3x3.M21] * m.matrix[M3x3.M02],\r\n            this.matrix[M3x3.M02] * m.matrix[M3x3.M00] + this.matrix[M3x3.M12] * m.matrix[M3x3.M01] + this.matrix[M3x3.M22] * m.matrix[M3x3.M02],\r\n            this.matrix[M3x3.M00] * m.matrix[M3x3.M10] + this.matrix[M3x3.M10] * m.matrix[M3x3.M11] + this.matrix[M3x3.M20] * m.matrix[M3x3.M12],\r\n            this.matrix[M3x3.M01] * m.matrix[M3x3.M10] + this.matrix[M3x3.M11] * m.matrix[M3x3.M11] + this.matrix[M3x3.M21] * m.matrix[M3x3.M12],\r\n            this.matrix[M3x3.M02] * m.matrix[M3x3.M10] + this.matrix[M3x3.M12] * m.matrix[M3x3.M11] + this.matrix[M3x3.M22] * m.matrix[M3x3.M12],\r\n            this.matrix[M3x3.M00] * m.matrix[M3x3.M20] + this.matrix[M3x3.M10] * m.matrix[M3x3.M21] + this.matrix[M3x3.M20] * m.matrix[M3x3.M22],\r\n            this.matrix[M3x3.M01] * m.matrix[M3x3.M20] + this.matrix[M3x3.M11] * m.matrix[M3x3.M21] + this.matrix[M3x3.M21] * m.matrix[M3x3.M22],\r\n            this.matrix[M3x3.M02] * m.matrix[M3x3.M20] + this.matrix[M3x3.M12] * m.matrix[M3x3.M21] + this.matrix[M3x3.M22] * m.matrix[M3x3.M22]\r\n        ];\r\n        return out;\r\n    };\r\n    M3x3.prototype.transition = function (x, y) {\r\n        var out = new M3x3();\r\n        out.matrix = [\r\n            this.matrix[M3x3.M00],\r\n            this.matrix[M3x3.M01],\r\n            this.matrix[M3x3.M02],\r\n            this.matrix[M3x3.M10],\r\n            this.matrix[M3x3.M11],\r\n            this.matrix[M3x3.M12],\r\n            x * this.matrix[M3x3.M00] + y * this.matrix[M3x3.M10] + this.matrix[M3x3.M20],\r\n            x * this.matrix[M3x3.M01] + y * this.matrix[M3x3.M11] + this.matrix[M3x3.M21],\r\n            x * this.matrix[M3x3.M02] + y * this.matrix[M3x3.M12] + this.matrix[M3x3.M22]\r\n        ];\r\n        return out;\r\n    };\r\n    M3x3.prototype.scale = function (x, y) {\r\n        var output = new M3x3();\r\n        output.matrix = [\r\n            this.matrix[M3x3.M00] * x,\r\n            this.matrix[M3x3.M01] * x,\r\n            this.matrix[M3x3.M02] * x,\r\n            this.matrix[M3x3.M10] * y,\r\n            this.matrix[M3x3.M11] * y,\r\n            this.matrix[M3x3.M12] * y,\r\n            this.matrix[M3x3.M20],\r\n            this.matrix[M3x3.M21],\r\n            this.matrix[M3x3.M22]\r\n        ];\r\n        return output;\r\n    };\r\n    M3x3.prototype.getFloatArray = function () {\r\n        return new Float32Array(this.matrix);\r\n    };\r\n    M3x3.M00 = 0;\r\n    M3x3.M01 = 1;\r\n    M3x3.M02 = 2;\r\n    M3x3.M10 = 3;\r\n    M3x3.M11 = 4;\r\n    M3x3.M12 = 5;\r\n    M3x3.M20 = 6;\r\n    M3x3.M21 = 7;\r\n    M3x3.M22 = 8;\r\n    return M3x3;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (M3x3);\r\n\n\n//# sourceURL=webpack://roam/./src/Math/Matrix3x3.ts?");

/***/ }),

/***/ "./src/Math/Vector2.ts":
/*!*****************************!*\
  !*** ./src/Math/Vector2.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Vector2 = /** @class */ (function () {\r\n    function Vector2(x, y) {\r\n        if (x === void 0) { x = 0; }\r\n        if (y === void 0) { y = 0; }\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    return Vector2;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vector2);\r\n\n\n//# sourceURL=webpack://roam/./src/Math/Vector2.ts?");

/***/ }),

/***/ "./src/Math/wrap.ts":
/*!**************************!*\
  !*** ./src/Math/wrap.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(n, min, max) {\r\n    if (n > max) {\r\n        n = min + (n - max);\r\n    }\r\n    if (n < min) {\r\n        n = max + (n - min);\r\n    }\r\n    return n;\r\n}\r\n\n\n//# sourceURL=webpack://roam/./src/Math/wrap.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Gips_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gips/Game */ \"./src/Gips/Game.ts\");\n/* harmony import */ var _Gips_Material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gips/Material */ \"./src/Gips/Material.ts\");\n/* harmony import */ var _Math_Vector2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Math/Vector2 */ \"./src/Math/Vector2.ts\");\n/* harmony import */ var _Math_wrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Math/wrap */ \"./src/Math/wrap.ts\");\n\r\n\r\n\r\n\r\nwindow.addEventListener(\"load\", function () {\r\n    var game = new _Gips_Game__WEBPACK_IMPORTED_MODULE_0__.default();\r\n    var n = 0;\r\n    var material = new _Gips_Material__WEBPACK_IMPORTED_MODULE_1__.default(game);\r\n    var sprite = new _Gips_Material__WEBPACK_IMPORTED_MODULE_1__.Sprite(game.gl, \"img/omw to steal df code.png\", material, {\r\n        size: new _Math_Vector2__WEBPACK_IMPORTED_MODULE_2__.default(360, 480),\r\n    });\r\n    game.updateFunction = function () {\r\n        n += 0.1;\r\n        n = (0,_Math_wrap__WEBPACK_IMPORTED_MODULE_3__.default)(n, 0, 3);\r\n        console.log(n);\r\n        sprite.render(new _Math_Vector2__WEBPACK_IMPORTED_MODULE_2__.default(n));\r\n    };\r\n    window.addEventListener(\"resize\", function () {\r\n        game.resize(window.innerWidth, window.innerHeight);\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack://roam/./src/index.ts?");

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