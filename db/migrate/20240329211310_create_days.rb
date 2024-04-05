class CreateDays < ActiveRecord::Migration[7.1]
  def change
    create_table :days do |t|
      t.string :mood, null: false
      t.references :user, null: false, foreign_key: true
      t.text :description, null: false
      t.integer :mood_intensity, null: false, default: 1

      t.timestamps
    end
  end
end
