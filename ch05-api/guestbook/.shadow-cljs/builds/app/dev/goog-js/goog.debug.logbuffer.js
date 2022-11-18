["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/debug/logbuffer.js"],"~:js","goog.provide(\"goog.debug.LogBuffer\");\ngoog.require(\"goog.asserts\");\ngoog.require(\"goog.debug.LogRecord\");\ngoog.debug.LogBuffer = function() {\n  goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), \"Cannot use goog.debug.LogBuffer without defining \" + \"goog.debug.LogBuffer.CAPACITY.\");\n  this.clear();\n};\ngoog.debug.LogBuffer.getInstance = function() {\n  if (!goog.debug.LogBuffer.instance_) {\n    goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer;\n  }\n  return goog.debug.LogBuffer.instance_;\n};\ngoog.debug.LogBuffer.CAPACITY = goog.define(\"goog.debug.LogBuffer.CAPACITY\", 0);\ngoog.debug.LogBuffer.prototype.buffer_;\ngoog.debug.LogBuffer.prototype.curIndex_;\ngoog.debug.LogBuffer.prototype.isFull_;\ngoog.debug.LogBuffer.prototype.addRecord = function(level, msg, loggerName) {\n  var curIndex = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;\n  this.curIndex_ = curIndex;\n  if (this.isFull_) {\n    var ret = this.buffer_[curIndex];\n    ret.reset(level, msg, loggerName);\n    return ret;\n  }\n  this.isFull_ = curIndex == goog.debug.LogBuffer.CAPACITY - 1;\n  return this.buffer_[curIndex] = new goog.debug.LogRecord(level, msg, loggerName);\n};\ngoog.debug.LogBuffer.isBufferingEnabled = function() {\n  return goog.debug.LogBuffer.CAPACITY > 0;\n};\ngoog.debug.LogBuffer.prototype.clear = function() {\n  this.buffer_ = new Array(goog.debug.LogBuffer.CAPACITY);\n  this.curIndex_ = -1;\n  this.isFull_ = false;\n};\ngoog.debug.LogBuffer.prototype.forEachRecord = function(func) {\n  var buffer = this.buffer_;\n  if (!buffer[0]) {\n    return;\n  }\n  var curIndex = this.curIndex_;\n  var i = this.isFull_ ? curIndex : -1;\n  do {\n    i = (i + 1) % goog.debug.LogBuffer.CAPACITY;\n    func(buffer[i]);\n  } while (i != curIndex);\n};\n","~:source","// Copyright 2010 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n/**\n * @fileoverview A buffer for log records. The purpose of this is to improve\n * logging performance by re-using old objects when the buffer becomes full and\n * to eliminate the need for each app to implement their own log buffer. The\n * disadvantage to doing this is that log handlers cannot maintain references to\n * log records and expect that they are not overwriten at a later point.\n *\n * @author agrieve@google.com (Andrew Grieve)\n */\n\ngoog.provide('goog.debug.LogBuffer');\n\ngoog.require('goog.asserts');\ngoog.require('goog.debug.LogRecord');\n\n\n\n/**\n * Creates the log buffer.\n * @constructor\n * @final\n */\ngoog.debug.LogBuffer = function() {\n  goog.asserts.assert(\n      goog.debug.LogBuffer.isBufferingEnabled(),\n      'Cannot use goog.debug.LogBuffer without defining ' +\n          'goog.debug.LogBuffer.CAPACITY.');\n  this.clear();\n};\n\n\n/**\n * A static method that always returns the same instance of LogBuffer.\n * @return {!goog.debug.LogBuffer} The LogBuffer singleton instance.\n */\ngoog.debug.LogBuffer.getInstance = function() {\n  if (!goog.debug.LogBuffer.instance_) {\n    // This function is written with the return statement after the assignment\n    // to avoid the jscompiler StripCode bug described in http://b/2608064.\n    // After that bug is fixed this can be refactored.\n    goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer();\n  }\n  return goog.debug.LogBuffer.instance_;\n};\n\n\n/**\n * @define {number} The number of log records to buffer. 0 means disable\n * buffering.\n */\ngoog.debug.LogBuffer.CAPACITY = goog.define('goog.debug.LogBuffer.CAPACITY', 0);\n\n\n/**\n * The array to store the records.\n * @type {!Array<!goog.debug.LogRecord|undefined>}\n * @private\n */\ngoog.debug.LogBuffer.prototype.buffer_;\n\n\n/**\n * The index of the most recently added record or -1 if there are no records.\n * @type {number}\n * @private\n */\ngoog.debug.LogBuffer.prototype.curIndex_;\n\n\n/**\n * Whether the buffer is at capacity.\n * @type {boolean}\n * @private\n */\ngoog.debug.LogBuffer.prototype.isFull_;\n\n\n/**\n * Adds a log record to the buffer, possibly overwriting the oldest record.\n * @param {goog.debug.Logger.Level} level One of the level identifiers.\n * @param {string} msg The string message.\n * @param {string} loggerName The name of the source logger.\n * @return {!goog.debug.LogRecord} The log record.\n */\ngoog.debug.LogBuffer.prototype.addRecord = function(level, msg, loggerName) {\n  var curIndex = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;\n  this.curIndex_ = curIndex;\n  if (this.isFull_) {\n    var ret = this.buffer_[curIndex];\n    ret.reset(level, msg, loggerName);\n    return ret;\n  }\n  this.isFull_ = curIndex == goog.debug.LogBuffer.CAPACITY - 1;\n  return this.buffer_[curIndex] =\n             new goog.debug.LogRecord(level, msg, loggerName);\n};\n\n\n/**\n * @return {boolean} Whether the log buffer is enabled.\n */\ngoog.debug.LogBuffer.isBufferingEnabled = function() {\n  return goog.debug.LogBuffer.CAPACITY > 0;\n};\n\n\n/**\n * Removes all buffered log records.\n */\ngoog.debug.LogBuffer.prototype.clear = function() {\n  this.buffer_ = new Array(goog.debug.LogBuffer.CAPACITY);\n  this.curIndex_ = -1;\n  this.isFull_ = false;\n};\n\n\n/**\n * Calls the given function for each buffered log record, starting with the\n * oldest one.\n * @param {function(!goog.debug.LogRecord)} func The function to call.\n */\ngoog.debug.LogBuffer.prototype.forEachRecord = function(func) {\n  var buffer = this.buffer_;\n  // Corner case: no records.\n  if (!buffer[0]) {\n    return;\n  }\n  var curIndex = this.curIndex_;\n  var i = this.isFull_ ? curIndex : -1;\n  do {\n    i = (i + 1) % goog.debug.LogBuffer.CAPACITY;\n    func(/** @type {!goog.debug.LogRecord} */ (buffer[i]));\n  } while (i != curIndex);\n};\n","~:compiled-at",1668744289497,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.debug.logbuffer.js\",\n\"lineCount\":49,\n\"mappings\":\"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\",\n\"sources\":[\"goog/debug/logbuffer.js\"],\n\"sourcesContent\":[\"// Copyright 2010 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\n/**\\n * @fileoverview A buffer for log records. The purpose of this is to improve\\n * logging performance by re-using old objects when the buffer becomes full and\\n * to eliminate the need for each app to implement their own log buffer. The\\n * disadvantage to doing this is that log handlers cannot maintain references to\\n * log records and expect that they are not overwriten at a later point.\\n *\\n * @author agrieve@google.com (Andrew Grieve)\\n */\\n\\ngoog.provide('goog.debug.LogBuffer');\\n\\ngoog.require('goog.asserts');\\ngoog.require('goog.debug.LogRecord');\\n\\n\\n\\n/**\\n * Creates the log buffer.\\n * @constructor\\n * @final\\n */\\ngoog.debug.LogBuffer = function() {\\n  goog.asserts.assert(\\n      goog.debug.LogBuffer.isBufferingEnabled(),\\n      'Cannot use goog.debug.LogBuffer without defining ' +\\n          'goog.debug.LogBuffer.CAPACITY.');\\n  this.clear();\\n};\\n\\n\\n/**\\n * A static method that always returns the same instance of LogBuffer.\\n * @return {!goog.debug.LogBuffer} The LogBuffer singleton instance.\\n */\\ngoog.debug.LogBuffer.getInstance = function() {\\n  if (!goog.debug.LogBuffer.instance_) {\\n    // This function is written with the return statement after the assignment\\n    // to avoid the jscompiler StripCode bug described in http://b/2608064.\\n    // After that bug is fixed this can be refactored.\\n    goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer();\\n  }\\n  return goog.debug.LogBuffer.instance_;\\n};\\n\\n\\n/**\\n * @define {number} The number of log records to buffer. 0 means disable\\n * buffering.\\n */\\ngoog.debug.LogBuffer.CAPACITY = goog.define('goog.debug.LogBuffer.CAPACITY', 0);\\n\\n\\n/**\\n * The array to store the records.\\n * @type {!Array<!goog.debug.LogRecord|undefined>}\\n * @private\\n */\\ngoog.debug.LogBuffer.prototype.buffer_;\\n\\n\\n/**\\n * The index of the most recently added record or -1 if there are no records.\\n * @type {number}\\n * @private\\n */\\ngoog.debug.LogBuffer.prototype.curIndex_;\\n\\n\\n/**\\n * Whether the buffer is at capacity.\\n * @type {boolean}\\n * @private\\n */\\ngoog.debug.LogBuffer.prototype.isFull_;\\n\\n\\n/**\\n * Adds a log record to the buffer, possibly overwriting the oldest record.\\n * @param {goog.debug.Logger.Level} level One of the level identifiers.\\n * @param {string} msg The string message.\\n * @param {string} loggerName The name of the source logger.\\n * @return {!goog.debug.LogRecord} The log record.\\n */\\ngoog.debug.LogBuffer.prototype.addRecord = function(level, msg, loggerName) {\\n  var curIndex = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;\\n  this.curIndex_ = curIndex;\\n  if (this.isFull_) {\\n    var ret = this.buffer_[curIndex];\\n    ret.reset(level, msg, loggerName);\\n    return ret;\\n  }\\n  this.isFull_ = curIndex == goog.debug.LogBuffer.CAPACITY - 1;\\n  return this.buffer_[curIndex] =\\n             new goog.debug.LogRecord(level, msg, loggerName);\\n};\\n\\n\\n/**\\n * @return {boolean} Whether the log buffer is enabled.\\n */\\ngoog.debug.LogBuffer.isBufferingEnabled = function() {\\n  return goog.debug.LogBuffer.CAPACITY > 0;\\n};\\n\\n\\n/**\\n * Removes all buffered log records.\\n */\\ngoog.debug.LogBuffer.prototype.clear = function() {\\n  this.buffer_ = new Array(goog.debug.LogBuffer.CAPACITY);\\n  this.curIndex_ = -1;\\n  this.isFull_ = false;\\n};\\n\\n\\n/**\\n * Calls the given function for each buffered log record, starting with the\\n * oldest one.\\n * @param {function(!goog.debug.LogRecord)} func The function to call.\\n */\\ngoog.debug.LogBuffer.prototype.forEachRecord = function(func) {\\n  var buffer = this.buffer_;\\n  // Corner case: no records.\\n  if (!buffer[0]) {\\n    return;\\n  }\\n  var curIndex = this.curIndex_;\\n  var i = this.isFull_ ? curIndex : -1;\\n  do {\\n    i = (i + 1) % goog.debug.LogBuffer.CAPACITY;\\n    func(/** @type {!goog.debug.LogRecord} */ (buffer[i]));\\n  } while (i != curIndex);\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"debug\",\"LogBuffer\",\"goog.debug.LogBuffer\",\"asserts\",\"assert\",\"isBufferingEnabled\",\"clear\",\"getInstance\",\"goog.debug.LogBuffer.getInstance\",\"instance_\",\"CAPACITY\",\"define\",\"prototype\",\"buffer_\",\"curIndex_\",\"isFull_\",\"addRecord\",\"goog.debug.LogBuffer.prototype.addRecord\",\"level\",\"msg\",\"loggerName\",\"curIndex\",\"ret\",\"reset\",\"LogRecord\",\"goog.debug.LogBuffer.isBufferingEnabled\",\"goog.debug.LogBuffer.prototype.clear\",\"Array\",\"forEachRecord\",\"goog.debug.LogBuffer.prototype.forEachRecord\",\"func\",\"buffer\",\"i\"]\n}\n"]