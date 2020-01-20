require 'rails_helper'

describe 'POST #registrations', :type => :request do

  before do
    @controller = RegistrationsController.new
  end

  it 'create new user' do
    post '/registrations', params: {
        user: {
            username: 'user',
            email: 'user@example.com',
            password: 'password',
            password_confirmation: 'password'
        }
    }
    expect(JSON.parse(response.body)['user']['username']).to eq('user')
  end

  it 'user without username should return 500' do
    post '/registrations', params: {
        user: {
            username: '',
            email: 'user@example.com',
            password: 'password',
            password_confirmation: 'password'
        }
    }
    expect(JSON.parse(response.body)['status']).to eq 500
  end

  it 'user without email should return 500' do
    post '/registrations', params: {
        user: {
            username: 'user',
            email: '',
            password: 'password',
            password_confirmation: 'password'
        }
    }
    expect(JSON.parse(response.body)['status']).to eq 500
  end

  it 'password does not match confirmation should return 500' do
    post '/registrations', params: {
        user: {
            username: 'user',
            email: 'user@example.com',
            password: 'pass',
            password_confirmation: 'word'
        }
    }
    expect(JSON.parse(response.body)['status']).to eq 500
  end

end