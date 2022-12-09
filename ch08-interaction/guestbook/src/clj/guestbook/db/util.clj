(ns guestbook.db.util
  (:require [clojure.string :as string]))

(defn tag-regex [tag]
  (when-not (re-matches #"[-\w]+" tag)
    (throw (ex-info "tag must only contain alphanumeric chars!"
                    {:tag tag})))
  (str "'.*(\\s|^)#"
       tag
       "(\\s|$).*'"))

(defn tags-regex [tags-raw]
  (let [tags (filter #(re-matches #"[-\w]+" %) tags-raw)]
    (when (not-empty tags)
      (str "'.*(\\s|^)#("
           (string/join "|" tags)
           ")(\\s|$).*'"))))
