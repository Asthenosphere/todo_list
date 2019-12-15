require 'test_helper'

class CategoryTest < ActiveSupport::TestCase

  def setup
    @category = Category.new(name: "tutorials")
  end

  test "category validity" do
    assert @category.valid?
  end

  test "name presence" do
    @category.name = ""
    assert_not @category.valid?
  end

  test "name uniqueness" do
    @category.save
    category2 = Category.new(name: "tutorials")
    assert_not category2.valid?
  end

  test "name length upper limit" do
    @category.name = "a" * 31
    assert_not @category.valid?
  end

  test "name length lower limit" do
    @category.name = "aa"
    assert_not @category.valid?
  end

end