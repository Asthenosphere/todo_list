require 'rails_helper'

describe 'GET #root' do

  before(:each) do
    @controller = WelcomeController.new
  end

  it 'should get index' do
    expect(get :index).to have_http_status(:success)
  end

end