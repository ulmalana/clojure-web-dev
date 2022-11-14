(ns html-templating.core
  (:require [selmer.parser :as selmer]
            [selmer.filters :as filters]
            [selmer.middleware :refer [wrap-error-page]]))

(selmer/render "Hello, {{name}}" {:name "Riz"})
;; => "Hello, Riz"

(selmer/render-file "hello.html" {:name "Riz"})
;; => "<html>\n    <head>\n        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/>\n        <title>My first template</title>\n    </head>\n    <body>\n        <h2>Hello Riz</h2>\n    </body>\n</html>\n"

(selmer/render-file "hello.html" {:items (range 3)})
;; => "<html>\n    <head>\n        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/>\n        <title>My first template</title>\n    </head>\n    <body>\n        <h2>Hello </h2>\n        <ul>\n            \n            <li> 0 </li>\n            \n            <li> 1 </li>\n            \n            <li> 2 </li>\n            \n        </ul>\n    </body>\n</html>\n"

(selmer/render "<p>Hello {{user.first}} {{user.last}}</p>"
               {:user {:first "Anya" :last "Forger"}})
;; => "<p>Hello Anya Forger</p>"

;; create custom filter
(filters/add-filter! :empty? empty?)

(selmer/render "{% if files|empty? %}no files{% else %}files{% endif %}"
               {:files []})
;; => "no files"

(filters/add-filter! :foo
                     (fn [x] [:safe (.toUpperCase x)]))

(selmer/render "{{x|foo}}" {:x "<div>I'm safe</div>"})
;; => "<DIV>I'M SAFE</DIV>"

;; adding custom selmer tags
(selmer/add-tag! :image
                 (fn [args context-map]
                   (str "<img src=" (first args) "/>")))

(selmer/render "{% image \"http://foo.com/logo.jpn\"%}" {})
;; => "<img src=\"http://foo.com/logo.jpn\"/>"

(selmer/add-tag!
 :uppercase
 (fn [args context-map block]
   (.toUpperCase (get-in block [:uppercase :content])))
 :enduppercase)

(selmer/render "{% uppercase %}foo {{bar}} baz{% enduppercase %}"
               {:bar "injected"})
;; => "FOO INJECTED BAZ"

(defn renderer []
  (wrap-error-page
   (fn [template]
     {:status 200
      :body (selmer/render-file template {})})))

((renderer) "hello.html")
;; => {:status 200, :body "<!DOCTYPE html>\n<html>\n    <head>\n        <link rel=\"stylesheet\" href=\"style.css\" />\n        <title>My amazing site</title>\n    </head>\n    <body>\n        <div id=\"content\">\n            \ndefault content\n<form action=\"/register\" method=\"POST\">\n    <label for=\"id\">user id</label>\n    <input id=\"id\" name=\"id\" type=\"text\">\n    <input pass=\"pass\" name=\"pass\" type=\"text\">\n    <input type=\"submit\" value=\"register\">\n</form>\n\n<h2>\n    Hello \n</h2>\n<ul>\n    \n</ul>\n\n        </div>\n    </body>\n</html>\n"}

((renderer) "error.html")
;; => {:status 500, :headers {"Content-Type" "text/html; charset=utf-8"}, :body "<html>\n<head>\n    <font face='arial'>\n        <style type='text/css'>\n            body {\n                margin: 0px;\n                background: #ececec;\n            }\n            #header {\n                padding-top:  5px;\n                padding-left: 25px;\n                color: white;\n                background: #a32306;\n                text-shadow: 1px 1px #33333;\n                border-bottom: 1px solid #710000;\n            }\n            #error-wrap {\n                border-top: 5px solid #d46e6b;\n            }\n            #error-message {\n                color: #800000;\n                background: #f5a29f;\n                padding: 10px;\n                text-shadow: 1px 1px #FFBBBB;\n                border-top: 1px solid #f4b1ae;\n            }\n            #file-wrap {\n                border-top: 5px solid #2a2a2a;\n            }\n            #file {\n                color: white;\n                background: #333333;\n                padding: 10px;\n                padding-left: 20px;\n                text-shadow: 1px 1px #555555;\n                border-top: 1px solid #444444;\n            }\n            #line-number {\n                width=20px;\n                color: #8b8b8b;\n                background: #d6d6d6;\n                float: left;\n                padding: 5px;\n                text-shadow: 1px 1px #EEEEEE;\n                border-right: 1px solid #b6b6b6;\n            }\n            #line-content {\n                float: left;\n                padding: 5px;\n            }\n            #error-content {\n                float: left;\n                width: 100%;\n                border-top: 5px solid #cdcdcd;\n                border-bottom: 5px solid #cdcdcd;\n            }\n        </style>\n</head>\n<body>\n<div id='header'>\n    <h1>Template Compilation Error</h1>\n</div>\n<div id='error-wrap'>\n    <div id='error-message'>Unrecognized filter content|safea found inside the tag.</div>\n</div>\n\n<div id='file-wrap'>\n    <div id='file'>In file:/home/riz/clojure-web-dev/ch02-luminus-stack/html-templating/resources/error.html on line 1.</div>\n</div>\n\n<div id='error-content'>\n    <div id='line-number'>1</div>\n    <div id='line-content'>{{content|safea}}</div>\n</div>\n\n\n</body>\n</html>"}
