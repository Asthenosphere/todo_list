class User < ApplicationRecord
  has_many :tasks
  has_many :categories
  has_secure_password
  validates_presence_of :username, :email
  validates_uniqueness_of :username, :email
  validates_confirmation_of :password
end
