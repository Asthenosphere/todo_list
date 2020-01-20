require 'rails_helper'

describe '#users', :type => :request do

  before(:each) do
    @taskcontroller = Api::V2::UsersController.new
    @sessionscontroller = SessionsController.new
    @user = User.create(username: "admin",
                        email: "admin@example.com",
                        password: "password",
                        password_confirmation: "password",
                        admin: true)
    post '/sessions', params: {
        user: {
            username: 'admin',
            email: 'admin@example.com',
            password: 'password',
            password_confirmation: 'password',
            admin: true
        }
    }
  end

  it 'index all users' do
    User.create(username: "user", email: "user@example.com", password: "password", password_confirmation: "password")
    get '/api/v2/users/index'
    expect(JSON.parse(response.body).count).to eq 2
  end

  it 'show user' do
    get "/api/v2/show/#{@user.id}"
    expect(JSON.parse(response.body)['username']).to eq 'admin'
  end

  it 'delete user' do
    delete "/api/v2/destroy/#{@user.id}"
    expect(JSON.parse(response.body)['message']).to eq "User deleted!"
  end

  it 'no access for normal users' do
    delete '/logout'
    user = User.create(username: 'user', email: 'user@example.com', password: 'password', password_confirmation: 'password')
    post '/sessions', params: {
        user: {
            username: 'user',
            email: 'user@example.com',
            password: 'password',
            password_confirmation: 'password'
        }
    }
    get '/api/v2/users/index'
    expect(response).to redirect_to(root_path)
  end

end