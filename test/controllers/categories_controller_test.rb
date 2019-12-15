require 'test_helper'

class CategoriesControllerTest < ActionDispatch::IntegrationTest

  def setup
    @user = User.create(username: "Asthenosphere", email: "gwyw9899@gmail.com", password: "password")
    @category = Category.create(name: "tutorials", user: @user)

  end

  test "Index categories" do
    sign_in_as(@user, "password")
    get categories_path
    assert_response :success # able to get index
  end

  test "Show categories" do
    sign_in_as(@user, "password")
    get category_path(@category)
    assert_response :success
  end

  test "New categories" do
    sign_in_as(@user, "password")
    sign_in_as(@user, "password")
    get new_category_path
    assert_response :success
  end

  test "Direct create action if not logged in" do
    assert_no_difference 'Category.count' do
      post categories_path, params: { category: {name: "tutorials"} }
    end
    assert_redirected_to categories_path
  end


end