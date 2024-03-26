Rails.application.routes.draw do
  get 'homepage/index'
  namespace :api do
    namespace :v1 do

    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'homepage#index'
end
