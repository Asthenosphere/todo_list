Rails.application.routes.draw do
  root 'welcome#home'
  get 'about', to: 'welcome#about'

  resources :articles

  get 'signup', to: 'users#new'
  resources :users, except: [:new]
end
