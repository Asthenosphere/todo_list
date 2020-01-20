if Rails.env == "production"
  Rails.application.config.session_store :cookie_store, key: "_todo_list", domain: "asthenosphere-todo-list.herokuapp.com"
else
  Rails.application.config.session_store :cookie_store, key: "_todo_list"
end
