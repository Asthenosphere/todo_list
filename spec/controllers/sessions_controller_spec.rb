require 'rails_helper'

describe '#sessions', :type => :request do

  before(:each) do
    @controller = SessionsController.new
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

  it 'create new session' do
    expect(JSON.parse(response.body)['user']['username']).to eq @user.username
  end

  it 'returns logged_in status' do
    get '/logged_in'
    expect(JSON.parse(response.body)['logged_in']).to eq true
  end

  it 'logout current user' do
    delete '/logout'
    get '/logged_in'
    expect(JSON.parse(response.body)['logged_in']).to eq false
  end

  it 'wrong user credentials' do
    delete '/logout'
    post '/sessions', params: {
        user: {
            username: 'user',
            email: 'user@example.com',
            password: 'yoda',
            password_confirmation: 'yoda'
        }
    }
    expect(JSON.parse(response.body)['status']).to eq 401
  end

end