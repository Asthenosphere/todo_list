class Category < ApplicationRecord
  belongs_to :user
  has_many :article_categories
  has_many :articles, through: :article_categories
  validates :name, presence: true, length: { maximum: 30, minimum: 3}
  validates :user_id, presence: true
end