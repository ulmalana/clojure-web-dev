(ns guestbook.routes.services
  (:require [guestbook.messages :as msg]
            [guestbook.middleware :as middleware]
            [ring.util.http-response :as response]
            [reitit.swagger :as swagger]
            [reitit.swagger-ui :as swagger-ui]
            [reitit.ring.coercion :as coercion]
            [reitit.coercion.spec :as spec-coercion]
            [reitit.ring.middleware.muuntaja :as muuntaja]
            [reitit.ring.middleware.exception :as exception]
            [reitit.ring.middleware.multipart :as multipart]
            [reitit.ring.middleware.parameters :as parameters]
            [guestbook.middleware.formats :as formats]))

(defn service-routes []
  ["/api"
   {:middleware [parameters/parameters-middleware ; query and form params
                 muuntaja/format-negotiate-middleware ; content negotiation
                 muuntaja/format-response-middleware ; encode response body
                 exception/exception-middleware ; exception handling
                 muuntaja/format-request-middleware ; decode response body
                 coercion/coerce-response-middleware ; coerce response body
                 coercion/coerce-request-middleware ; coerce request params
                 multipart/multipart-middleware ; multipart params
                 ]
    :muuntaja formats/instance
    :coercion spec-coercion/coercion
    :swagger {:id ::api}}
   ["" {:no-doc true}
    ["/swagger.json" {:get (swagger/create-swagger-handler)}]
    ["/swagger-ui*" {:get (swagger-ui/create-swagger-ui-handler
                           {:url "/api/swagger.json"})}]]
   ["/messages"
    {:get {:responses
           {200
            {:body ;; data spec for response body
             {:messages
              [{:id pos-int?
                :name string?
                :message string?
                :timestamp inst?}]}}}
           :handler
           (fn [_] (response/ok (msg/message-list)))}}]
   ["/message"
    {:post {:parameters
            {:body ;; data spec for request body params
             {:name string?
              :message string?}}
            :responses
            {200
             {:body map?}
             400
             {:body map?}
             500
             {:errors map?}}
            :handler
            (fn [{{params :body} :parameters}]
             (try
               (msg/save-message! params)
               (response/ok {:status :ok})
               (catch Exception e
                 (let [{id :guestbook/error-id
                        errors :errors} (ex-data e)]
                   (case id
                     :validation (response/bad-request {:errors errors})
                     ;; else
                     (response/internal-server-error
                      {:errors
                       {:server-error ["Failed to save message"]}}))))))}}]])
