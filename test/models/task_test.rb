require 'test_helper'

class TaskTest < ActiveSupport::TestCase

  def setup
    @user = User.new(username: "Admin", email: "admin@gmail.com", password: "password", password_confirmation: "password")
    @user.save # must save user to database before run task validity test, otherwise user still does not exist
    @task = Task.new(title: "Problem set 1", description: "Linear Shift Register", status: false, user: @user)
  end

  test "task validity" do
    assert @task.valid?
  end

  test "title presnece" do
    @task.title = ""
    assert_not @task.valid?
  end

  test "user id presence" do
    @task.user_id = nil
    assert_not @task.valid?
  end

  test "title uniqueness" do
    @task.save
    task2 = Task.new(title: "Problem set 1", description: "Linear Shift Register", user: @user)
    assert_not task2.valid?
  end

end
