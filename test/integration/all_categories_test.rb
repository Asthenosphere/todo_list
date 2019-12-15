require 'test_helper'

class AllCategoriesTest < ActionDispatch::IntegrationTest

  def setup
    @category = Category.create(name: "tutorials")
    @category2 = Category.create(name: "programming")
  end

  test "Show all categories" do
    get categories_path
    assert_template 'categories/index'
    assert_select "a[href=?]", category_path(@category), text: @category.name # select a link, and link should say tutorials
    assert_select "a[href=?]", category_path(@category2), text: @category2.name # similar
  end

end