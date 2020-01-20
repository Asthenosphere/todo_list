require 'rails_helper'

describe Task, '#model' do

  before(:each) do
    @user = User.create(username: "user", email: "user@example.com", password: "password", password_confirmation: "password")
  end

  it 'task is valid' do
    task = Task.create(title: "CS2040S problem set 1", description: "Due 20 Jan", status: true, user: @user)
    expect(task.valid?).to eq true
  end

  it 'task without title is invalid' do
    task = Task.create(title: "", description: "Due 20 Jan", status: true, user: @user)
    expect(task.valid?).to eq false
  end

  it 'task without user is invalid' do
    task = Task.create(title: "CS2040S problem set 1", description: "Due 20 Jan", status: true)
    expect(task.valid?).to eq false
  end

  it 'task should not have duplicated titles' do
    task1 = Task.create(title: "CS2040S problem set 1", description: "Due 20 Jan", status: true, user: @user)
    task2 = Task.create(title: "CS2040S problem set 1", description: "Something else", status: false, user: @user)
    expect(task2.valid?).to eq false
  end

end