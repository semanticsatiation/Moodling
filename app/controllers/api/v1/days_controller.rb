class Api::V1::DaysController < ApplicationController
    def index
        puts params
        render json: User.first.days.map{|day| day.as_json(except: [:id, :user_id, :created_at, :updated_at])}
    end
end
