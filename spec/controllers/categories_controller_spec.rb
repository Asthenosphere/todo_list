require 'rails_helper'

describe '#categories', :type => :request do

  before(:each) do
    @categoriescontroller = Api::V3::CategoriesController
    @sessionscontroller = SessionsController.new
    @user = User.create(username: "user", email: "user@example.com", password: "password", password_confirmation: "password")
    post '/sessions', params: {
        user: {
            username: 'user',
            email: 'user@example.com',
            password: 'password',
            password_confirmation: 'password'
        }
    }
  end

  it 'create new category' do
    post '/api/v3/categories/create', params: {
        name: 'CS2040S',
        description: 'Very hard'
    }
    expect(JSON.parse(response.body)['name']).to eq 'CS2040S'
  end

  it 'associate current user' do
    post '/api/v3/categories/create', params: {
        name: 'CS2040S',
        description: 'Very hard'
    }
    expect(JSON.parse(response.body)['user_id']).to eq @user.id
  end

  it 'show category' do
    category = Category.create(name: 'CS2040S', description: 'Very hard', user: @user)
    get "/api/v3/show/#{category.id}"
    expect(JSON.parse(response.body)['category']['name']).to eq 'CS2040S'
  end

  it 'get number of categories by specific user' do
    (1..5).each do |i|
      Category.create(name: "Category #{i}", description: "This is Category #{i}", user: @user)
    end
    user2 = User.create(username: 'user2', email: 'user2@example.com', password: 'password', password_confirmation: 'password')
    Category.create(name: "Category 1", description: "This is Category 1", user: user2)
    get '/api/v3/categories/index'
    expect(JSON.parse(response.body).count).to eq 5
  end

  it 'delete category' do
    category = Category.create(name: "Category 1", description: "This is Category 1", user: @user)
    delete "/api/v3/destroy/#{category.id}"
    expect(JSON.parse(response.body)['message']).to eq "Category deleted!"
  end

  it 'update category' do
    category = Category.create(name: "Category 1", description: "This is Category 1", user: @user)
    post "/api/v3/update/#{category.id}", params: {
        name: 'Category 1 edited',
        description: 'This is Category 1 edited'
    }
    expect(JSON.parse(response.body)['name']).to eq 'Category 1 edited'
  end

end