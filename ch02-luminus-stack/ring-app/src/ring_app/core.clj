(ns ring-app.core
  (:require [ring.adapter.jetty :as jetty]
            [ring.util.http-response :as response]
            [ring.middleware.reload :refer [wrap-reload]]
            [muuntaja.middleware :as muuntaja]
            [reitit.ring :as reitit]))


(defn html-handler [request-map]
  (response/ok
   (str "<html><body> Hello, Your IP is: "
        (:remote-addr request-map)
        "</body></html>")))

(defn json-handler [request]
  (response/ok
   {:result (get-in request [:body-params :id])}))

(defn wrap-formats [handler]
  (-> handler
      (muuntaja/wrap-format)))

;; for supporting any http method
;; [["/" html-handler]]
(def routes
  [["/" {:get html-handler
         :post html-handler}]
   ["/echo/:id" {:get (fn [{{:keys [id]} :path-params}]
                        (response/ok (str "<p> Your input value is: " id "</p>")))}]
   ["/api" {:middleware [wrap-formats]}
    ["/multiply" {:post (fn [{{:keys [a b]} :body-params}]
                          (response/ok {:result (* a b)}))}]]])

;;(def handler json-handler)
(def handler
  (reitit/ring-handler
   (reitit/router routes)
   (reitit/routes
    (reitit/create-resource-handler {:path "/"})
    ;;default handler
    (reitit/create-default-handler
     {:not-found
      (constantly (response/not-found "404 - Page not found"))
      :method-not-allowed
      (constantly (response/method-not-allowed "405 - Not allowed"))
      :not-acceptable
      (constantly (response/not-acceptable "406 - Not acceptable"))}))))

;; middleware handler
(defn wrap-nocache [handler]
  (fn [request]
    (-> request
        handler
        (assoc-in [:headers "Pragma"] "no-cache"))))


(defn -main []
  (jetty/run-jetty
   (-> handler
       var
       wrap-nocache
       ;wrap-formats
       wrap-reload)
   {:port 3000
    :join? false}))
