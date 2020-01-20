require 'rails_helper'

describe Category, '#model' do

  before(:each) do
    @user = User.create(username: "user", email: "user@example.com", password: "password", password_confirmation: "password")
  end

  it 'category is valid' do
    category = Category.create(name: "CS2040S", description: "Very hard", user: @user)
    expect(category.valid?).to eq true
  end

  it 'category without name is invalid' do
    category = Category.create(name: "", description: "Very hard", user: @user)
    expect(category.valid?).to eq false
  end

  it 'category without user is invalid' do
    category = Category.create(name: "CS2040S", description: "Very hard")
    expect(category.valid?).to eq false
  end

  it 'category name cannot be duplicated' do
    category1 = Category.create(name: "CS2040S", description: "Very hard", user: @user)
    category2 = Category.create(name: "CS2040S", description: "Very easy", user: @user)
    expect(category2.valid?).to eq false
  end

end