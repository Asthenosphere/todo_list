require 'rails_helper'

describe '#tasks', :type => :request do

  before(:each) do
    @taskcontroller = Api::V1::TasksController.new
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

  it 'create new task' do
    post '/api/v1/tasks/create', params: {
        title: 'Task 1',
        description: 'This is Task 1',
        status: false
    }
    expect(JSON.parse(response.body)['task']['title']).to eq 'Task 1'
  end

  it 'associate current user' do
    post '/api/v1/tasks/create', params: {
        title: 'Task 1',
        description: 'This is Task 1',
        status: false
    }
    expect(JSON.parse(response.body)['task']['user_id']).to eq @user.id
  end

  it 'show task' do
    task = Task.create(title: "CS2040S problem set 1", description: "Due 20 Jan", status: true, user: @user)
    get "/api/v1/show/#{task.id}"
    expect(JSON.parse(response.body)['task']['title']).to eq 'CS2040S problem set 1'
  end

  it 'get number of tasks by specific user' do
    (1..5).each do |i|
      Task.create(title: "Task #{i}", description: "This is Task #{i}", status: false, user: @user)
    end
    user2 = User.create(username: "user2", email: "user2@example.com", password: "password", password_confirmation: "password")
    Task.create(title: "Task 1", description: "This is Task 1", status: false, user: user2)
    get '/api/v1/tasks/index'
    expect(JSON.parse(response.body).count).to eq 5
  end

  it 'delete task' do
    task = Task.create(title: "CS2040S problem set 1", description: "Due 20 Jan", status: true, user: @user)
    delete "/api/v1/destroy/#{task.id}"
    expect(JSON.parse(response.body)['message']).to eq "Task has been successfully deleted!"
  end

  it 'update task' do
    task = Task.create(title: "CS2040S problem set 1", description: "Due 20 Jan", status: true, user: @user)
    post "/api/v1/edit/#{task.id}", params: {
        title: 'CS2040S problem set 1',
        description: 'Completed',
        status: true
    }
    expect(JSON.parse(response.body)['description']).to eq 'Completed'
  end

end