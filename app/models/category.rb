class Category < ApplicationRecord
  has_many :task_categories
  has_many :tasks, through: :task_categories
  belongs_to :user
  validates :name, presence: true
  validates :name, uniqueness: {
      scope: :user_id
  }
  validates :user_id, presence: true
end