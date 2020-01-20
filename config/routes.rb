Rails.application.routes.draw do
  namespace :api do
    namespace :v3 do
      get 'categories/index'
      post 'categories/create'
      get '/show/:id', to: 'categories#show'
      post '/update/:id', to: 'categories#update'
      delete '/destroy/:id', to: 'categories#destroy'
    end
  end
  namespace :api do
    namespace :v2 do
      get 'users/index'
      get '/show/:id', to: 'users#show'
      delete '/destroy/:id', to: 'users#destroy'
    end
  end
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  namespace :api do
    namespace :v1 do
      get 'tasks/index'
      post 'tasks/create'
      get '/show/:id', to: 'tasks#show'
      delete '/destroy/:id', to: 'tasks#destroy'
      post '/edit/:id', to: 'tasks#edit'
    end
  end
  root 'welcome#index'
  get '/*path' => 'welcome#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
