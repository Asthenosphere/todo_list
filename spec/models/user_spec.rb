require 'rails_helper'

describe User, '#model' do

  it 'task is valid' do
    user = User.create(username: "user", email: "user@example.com", password: "password", password_confirmation: "password")
    expect(user.valid?).to eq true
  end

  it 'user without username is invalid' do
    user = User.create(username: "", email: "user@example.com", password: "password", password_confirmation: "password")
    expect(user.valid?).to eq false
  end

  it 'user without email is invalid' do
    user = User.create(username: "user", email: "", password: "password", password_confirmation: "password")
    expect(user.valid?).to eq false
  end

  it 'password and confirmation must match' do
    user = User.create(username: "user", email: "user@example.com", password: "pass", password_confirmation: "word")
    expect(user.valid?).to eq false
  end

  it 'username cannot be duplicated' do
    user1 = User.create(username: "user", email: "user@example.com", password: "password", password_confirmation: "password")
    user2 = User.create(username: "user", email: "yoda@example.com", password: "password", password_confirmation: "password")
    expect(user2.valid?).to eq false
  end

  it 'username cannot be duplicated' do
    user1 = User.create(username: "user1", email: "user@example.com", password: "password", password_confirmation: "password")
    user2 = User.create(username: "user2", email: "user@example.com", password: "password", password_confirmation: "password")
    expect(user2.valid?).to eq false
  end

end