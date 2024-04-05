class Day < ApplicationRecord
  allowed_moods = ["Sad", "Angry", "Happy", "Neutral", "Relaxed", "Anxious"]
  validates_inclusion_of :mood, in: allowed_moods
  validates :day_of, :description, :mood, :mood_intensity,  presence: true
  validates_inclusion_of :mood_intensity, :in => 1..5

  belongs_to :user

  has_many :images
end
