# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

allowed_moods = ["Sad", "Angry", "Happy", "Neutral", "Relaxed", "Anxious"]

50.times do
    user=User.new(
      email: Faker::Internet.email,
      password: Faker::Internet.password
    )

    user.save!
end

u = User.first;

30.times do |i|
    current_mood = allowed_moods.sample
    u.days.create!(mood: current_mood, description: "I was really #{current_mood}.", mood_intensity: (1..5).to_a.sample, day_of: "2024-04-#{i + 1} 16:15:33.040249488 -0400")
end