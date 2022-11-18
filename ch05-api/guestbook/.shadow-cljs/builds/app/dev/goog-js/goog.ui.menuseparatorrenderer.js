["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/ui/menuseparatorrenderer.js"],"~:js","goog.provide(\"goog.ui.MenuSeparatorRenderer\");\ngoog.require(\"goog.dom\");\ngoog.require(\"goog.dom.TagName\");\ngoog.require(\"goog.dom.classlist\");\ngoog.require(\"goog.ui.ControlRenderer\");\ngoog.ui.MenuSeparatorRenderer = function() {\n  goog.ui.ControlRenderer.call(this);\n};\ngoog.inherits(goog.ui.MenuSeparatorRenderer, goog.ui.ControlRenderer);\ngoog.addSingletonGetter(goog.ui.MenuSeparatorRenderer);\ngoog.ui.MenuSeparatorRenderer.CSS_CLASS = goog.getCssName(\"goog-menuseparator\");\ngoog.ui.MenuSeparatorRenderer.prototype.createDom = function(separator) {\n  return separator.getDomHelper().createDom(goog.dom.TagName.DIV, this.getCssClass());\n};\ngoog.ui.MenuSeparatorRenderer.prototype.decorate = function(separator, element) {\n  if (element.id) {\n    separator.setId(element.id);\n  }\n  if (element.tagName == goog.dom.TagName.HR) {\n    var hr = element;\n    element = this.createDom(separator);\n    goog.dom.insertSiblingBefore(element, hr);\n    goog.dom.removeNode(hr);\n  } else {\n    goog.dom.classlist.add(element, this.getCssClass());\n  }\n  return element;\n};\ngoog.ui.MenuSeparatorRenderer.prototype.setContent = function(separator, content) {\n};\ngoog.ui.MenuSeparatorRenderer.prototype.getCssClass = function() {\n  return goog.ui.MenuSeparatorRenderer.CSS_CLASS;\n};\n","~:source","// Copyright 2008 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n/**\n * @fileoverview Renderer for {@link goog.ui.MenuSeparator}s.\n *\n * @author attila@google.com (Attila Bodis)\n */\n\ngoog.provide('goog.ui.MenuSeparatorRenderer');\n\ngoog.require('goog.dom');\ngoog.require('goog.dom.TagName');\ngoog.require('goog.dom.classlist');\ngoog.require('goog.ui.ControlRenderer');\n\n\n\n/**\n * Renderer for menu separators.\n * @constructor\n * @extends {goog.ui.ControlRenderer}\n */\ngoog.ui.MenuSeparatorRenderer = function() {\n  goog.ui.ControlRenderer.call(this);\n};\ngoog.inherits(goog.ui.MenuSeparatorRenderer, goog.ui.ControlRenderer);\ngoog.addSingletonGetter(goog.ui.MenuSeparatorRenderer);\n\n\n/**\n * Default CSS class to be applied to the root element of components rendered\n * by this renderer.\n * @type {string}\n */\ngoog.ui.MenuSeparatorRenderer.CSS_CLASS = goog.getCssName('goog-menuseparator');\n\n\n/**\n * Returns an empty, styled menu separator DIV.  Overrides {@link\n * goog.ui.ControlRenderer#createDom}.\n * @param {goog.ui.Control} separator goog.ui.Separator to render.\n * @return {!Element} Root element for the separator.\n * @override\n */\ngoog.ui.MenuSeparatorRenderer.prototype.createDom = function(separator) {\n  return separator.getDomHelper().createDom(\n      goog.dom.TagName.DIV, this.getCssClass());\n};\n\n\n/**\n * Takes an existing element, and decorates it with the separator.  Overrides\n * {@link goog.ui.ControlRenderer#decorate}.\n * @param {goog.ui.Control} separator goog.ui.MenuSeparator to decorate the\n *     element.\n * @param {Element} element Element to decorate.\n * @return {!Element} Decorated element.\n * @override\n */\ngoog.ui.MenuSeparatorRenderer.prototype.decorate = function(\n    separator, element) {\n  // Normally handled in the superclass. But we don't call the superclass.\n  if (element.id) {\n    separator.setId(element.id);\n  }\n\n  if (element.tagName == goog.dom.TagName.HR) {\n    // Replace HR with separator.\n    var hr = element;\n    element = this.createDom(separator);\n    goog.dom.insertSiblingBefore(element, hr);\n    goog.dom.removeNode(hr);\n  } else {\n    goog.dom.classlist.add(element, this.getCssClass());\n  }\n  return element;\n};\n\n\n/**\n * Overrides {@link goog.ui.ControlRenderer#setContent} to do nothing, since\n * separators are empty.\n * @param {Element} separator The separator's root element.\n * @param {goog.ui.ControlContent} content Text caption or DOM structure to be\n *    set as the separators's content (ignored).\n * @override\n */\ngoog.ui.MenuSeparatorRenderer.prototype.setContent = function(\n    separator, content) {\n  // Do nothing.  Separators are empty.\n};\n\n\n/**\n * Returns the CSS class to be applied to the root element of components\n * rendered using this renderer.\n * @return {string} Renderer-specific CSS class.\n * @override\n */\ngoog.ui.MenuSeparatorRenderer.prototype.getCssClass = function() {\n  return goog.ui.MenuSeparatorRenderer.CSS_CLASS;\n};\n","~:compiled-at",1668750077042,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.ui.menuseparatorrenderer.js\",\n\"lineCount\":34,\n\"mappings\":\"AAoBAA,IAAA,CAAKC,OAAL,CAAa,+BAAb,CAAA;AAEAD,IAAA,CAAKE,OAAL,CAAa,UAAb,CAAA;AACAF,IAAA,CAAKE,OAAL,CAAa,kBAAb,CAAA;AACAF,IAAA,CAAKE,OAAL,CAAa,oBAAb,CAAA;AACAF,IAAA,CAAKE,OAAL,CAAa,yBAAb,CAAA;AASAF,IAAA,CAAKG,EAAL,CAAQC,qBAAR,GAAgCC,QAAQ,EAAG;AACzCL,MAAA,CAAKG,EAAL,CAAQG,eAAR,CAAwBC,IAAxB,CAA6B,IAA7B,CAAA;AADyC,CAA3C;AAGAP,IAAA,CAAKQ,QAAL,CAAcR,IAAd,CAAmBG,EAAnB,CAAsBC,qBAAtB,EAA6CJ,IAA7C,CAAkDG,EAAlD,CAAqDG,eAArD,CAAA;AACAN,IAAA,CAAKS,kBAAL,CAAwBT,IAAxB,CAA6BG,EAA7B,CAAgCC,qBAAhC,CAAA;AAQAJ,IAAA,CAAKG,EAAL,CAAQC,qBAAR,CAA8BM,SAA9B,GAA0CV,IAAA,CAAKW,UAAL,CAAgB,oBAAhB,CAA1C;AAUAX,IAAA,CAAKG,EAAL,CAAQC,qBAAR,CAA8BQ,SAA9B,CAAwCC,SAAxC,GAAoDC,QAAQ,CAACC,SAAD,CAAY;AACtE,SAAOA,SAAA,CAAUC,YAAV,EAAA,CAAyBH,SAAzB,CACHb,IADG,CACEiB,GADF,CACMC,OADN,CACcC,GADd,EACmB,IAAA,CAAKC,WAAL,EADnB,CAAP;AADsE,CAAxE;AAeApB,IAAA,CAAKG,EAAL,CAAQC,qBAAR,CAA8BQ,SAA9B,CAAwCS,QAAxC,GAAmDC,QAAQ,CACvDP,SADuD,EAC5CQ,OAD4C,CACnC;AAEtB,MAAIA,OAAJ,CAAYC,EAAZ;AACET,aAAA,CAAUU,KAAV,CAAgBF,OAAhB,CAAwBC,EAAxB,CAAA;AADF;AAIA,MAAID,OAAJ,CAAYG,OAAZ,IAAuB1B,IAAvB,CAA4BiB,GAA5B,CAAgCC,OAAhC,CAAwCS,EAAxC,CAA4C;AAE1C,QAAIC,KAAKL,OAAT;AACAA,WAAA,GAAU,IAAA,CAAKV,SAAL,CAAeE,SAAf,CAAV;AACAf,QAAA,CAAKiB,GAAL,CAASY,mBAAT,CAA6BN,OAA7B,EAAsCK,EAAtC,CAAA;AACA5B,QAAA,CAAKiB,GAAL,CAASa,UAAT,CAAoBF,EAApB,CAAA;AAL0C,GAA5C;AAOE5B,QAAA,CAAKiB,GAAL,CAASc,SAAT,CAAmBC,GAAnB,CAAuBT,OAAvB,EAAgC,IAAA,CAAKH,WAAL,EAAhC,CAAA;AAPF;AASA,SAAOG,OAAP;AAfsB,CADxB;AA4BAvB,IAAA,CAAKG,EAAL,CAAQC,qBAAR,CAA8BQ,SAA9B,CAAwCqB,UAAxC,GAAqDC,QAAQ,CACzDnB,SADyD,EAC9CoB,OAD8C,CACrC;CADxB;AAYAnC,IAAA,CAAKG,EAAL,CAAQC,qBAAR,CAA8BQ,SAA9B,CAAwCQ,WAAxC,GAAsDgB,QAAQ,EAAG;AAC/D,SAAOpC,IAAP,CAAYG,EAAZ,CAAeC,qBAAf,CAAqCM,SAArC;AAD+D,CAAjE;;\",\n\"sources\":[\"goog/ui/menuseparatorrenderer.js\"],\n\"sourcesContent\":[\"// Copyright 2008 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\n/**\\n * @fileoverview Renderer for {@link goog.ui.MenuSeparator}s.\\n *\\n * @author attila@google.com (Attila Bodis)\\n */\\n\\ngoog.provide('goog.ui.MenuSeparatorRenderer');\\n\\ngoog.require('goog.dom');\\ngoog.require('goog.dom.TagName');\\ngoog.require('goog.dom.classlist');\\ngoog.require('goog.ui.ControlRenderer');\\n\\n\\n\\n/**\\n * Renderer for menu separators.\\n * @constructor\\n * @extends {goog.ui.ControlRenderer}\\n */\\ngoog.ui.MenuSeparatorRenderer = function() {\\n  goog.ui.ControlRenderer.call(this);\\n};\\ngoog.inherits(goog.ui.MenuSeparatorRenderer, goog.ui.ControlRenderer);\\ngoog.addSingletonGetter(goog.ui.MenuSeparatorRenderer);\\n\\n\\n/**\\n * Default CSS class to be applied to the root element of components rendered\\n * by this renderer.\\n * @type {string}\\n */\\ngoog.ui.MenuSeparatorRenderer.CSS_CLASS = goog.getCssName('goog-menuseparator');\\n\\n\\n/**\\n * Returns an empty, styled menu separator DIV.  Overrides {@link\\n * goog.ui.ControlRenderer#createDom}.\\n * @param {goog.ui.Control} separator goog.ui.Separator to render.\\n * @return {!Element} Root element for the separator.\\n * @override\\n */\\ngoog.ui.MenuSeparatorRenderer.prototype.createDom = function(separator) {\\n  return separator.getDomHelper().createDom(\\n      goog.dom.TagName.DIV, this.getCssClass());\\n};\\n\\n\\n/**\\n * Takes an existing element, and decorates it with the separator.  Overrides\\n * {@link goog.ui.ControlRenderer#decorate}.\\n * @param {goog.ui.Control} separator goog.ui.MenuSeparator to decorate the\\n *     element.\\n * @param {Element} element Element to decorate.\\n * @return {!Element} Decorated element.\\n * @override\\n */\\ngoog.ui.MenuSeparatorRenderer.prototype.decorate = function(\\n    separator, element) {\\n  // Normally handled in the superclass. But we don't call the superclass.\\n  if (element.id) {\\n    separator.setId(element.id);\\n  }\\n\\n  if (element.tagName == goog.dom.TagName.HR) {\\n    // Replace HR with separator.\\n    var hr = element;\\n    element = this.createDom(separator);\\n    goog.dom.insertSiblingBefore(element, hr);\\n    goog.dom.removeNode(hr);\\n  } else {\\n    goog.dom.classlist.add(element, this.getCssClass());\\n  }\\n  return element;\\n};\\n\\n\\n/**\\n * Overrides {@link goog.ui.ControlRenderer#setContent} to do nothing, since\\n * separators are empty.\\n * @param {Element} separator The separator's root element.\\n * @param {goog.ui.ControlContent} content Text caption or DOM structure to be\\n *    set as the separators's content (ignored).\\n * @override\\n */\\ngoog.ui.MenuSeparatorRenderer.prototype.setContent = function(\\n    separator, content) {\\n  // Do nothing.  Separators are empty.\\n};\\n\\n\\n/**\\n * Returns the CSS class to be applied to the root element of components\\n * rendered using this renderer.\\n * @return {string} Renderer-specific CSS class.\\n * @override\\n */\\ngoog.ui.MenuSeparatorRenderer.prototype.getCssClass = function() {\\n  return goog.ui.MenuSeparatorRenderer.CSS_CLASS;\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"ui\",\"MenuSeparatorRenderer\",\"goog.ui.MenuSeparatorRenderer\",\"ControlRenderer\",\"call\",\"inherits\",\"addSingletonGetter\",\"CSS_CLASS\",\"getCssName\",\"prototype\",\"createDom\",\"goog.ui.MenuSeparatorRenderer.prototype.createDom\",\"separator\",\"getDomHelper\",\"dom\",\"TagName\",\"DIV\",\"getCssClass\",\"decorate\",\"goog.ui.MenuSeparatorRenderer.prototype.decorate\",\"element\",\"id\",\"setId\",\"tagName\",\"HR\",\"hr\",\"insertSiblingBefore\",\"removeNode\",\"classlist\",\"add\",\"setContent\",\"goog.ui.MenuSeparatorRenderer.prototype.setContent\",\"content\",\"goog.ui.MenuSeparatorRenderer.prototype.getCssClass\"]\n}\n"]