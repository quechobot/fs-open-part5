import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  beforeEach( () => {
    const blog = {
      'title': 'blog test',
      'author':'tester',
      'url':'www.test.com',
      'likes':'0',
    }
    const user = userEvent.setup()
    const handleLikes = jest.fn()
    const deleteBlog = jest.fn()
    container = render(
      <Blog blog={blog} updateLikes={handleLikes} userLogged={user} deleteBlog={deleteBlog}/>
    ).container
  })

  test('render blog only title default', () => {
    const divTitle = container.querySelector('#blog-preview')
    const blogTitle = screen.getByText('blog test', { exact: false })
    const divInfo = container.querySelector('#blog-info')
    expect(blogTitle).toBeDefined()
    expect(divTitle).toBeDefined()
    expect(divInfo).toBeNull()
  })

  test('render blogInfo when push the button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const divInfo = container.querySelector('#blog-info')
    const url = screen.getByText('www.test.com')
    const likes = screen.getByText('likes', { exact: false })
    expect(divInfo).toBeDefined()
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

})