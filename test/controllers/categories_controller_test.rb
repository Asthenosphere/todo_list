require 'test_helper'

class CategoriesControllerTest < ActionDispatch::IntegrationTest

  def setup
    @category = Category.create(name: "tutorials")
  end

  test "Index categories" do
    get categories_path
    assert_response :success # able to get index
  end

  test "Show categories" do
    get category_path(@category)
    assert_response :success
  end

  test "New categories" do
    get new_category_path
    assert_response :success
  end

end