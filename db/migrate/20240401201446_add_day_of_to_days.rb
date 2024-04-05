class AddDayOfToDays < ActiveRecord::Migration[7.1]
  def change
    add_column :days, :day_of, :datetime, null: false
  end
end
