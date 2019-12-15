require 'test_helper'

class AllCategoriesTest < ActionDispatch::IntegrationTest

  def setup
    @user = User.create(username: "Asthenosphere", email: "gwyw9899@gmail.com", password: "password")
    @category = Category.create(name: "tutorials", user: @user)
    @category2 = Category.create(name: "programming", user: @user)

  end

  test "Show all categories" do
    sign_in_as(@user, "password")
    get categories_path
    assert_template 'categories/index'
    assert_select "a[href=?]", category_path(@category), text: @category.name # select a link, and link should say tutorials
    assert_select "a[href=?]", category_path(@category2), text: @category2.name # similar
  end

end