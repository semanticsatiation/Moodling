Rails.application.routes.draw do
    # get "homepage/index"
  

  namespace :api do
    namespace :v1 do
      defaults format: :json do
        # devise_for :users, path: "", controllers: {
        #   sessions: "users/sessions",
        #   registrations: "users/registrations"
        # }

        # resources :users, only: [:create, :destroy, :update]

        # resources :registrations, only: [:create]

        # resources :sessions, only: [:create, :destroy]
    
        resources :days
      end
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # root "homepage#index"
end
