Rails.application.routes.draw do
  root 'welcome#home'
  get 'about', to: 'welcome#about'

  resources :articles do
    member do
      get :changestatus
    end
  end

  get 'signup', to: 'users#new'
  resources :users, except: [:new]

  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  resources :categories
 end
