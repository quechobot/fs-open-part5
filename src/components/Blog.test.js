import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from "./Blog";

describe('<Blog />', () => {
  let container
  beforeEach( () => {
    const blog = {
      'title': 'blog test',
      'author':'tester',
      'url':'test',
      'likes':'0',
    }
    const user = userEvent.setup()
    const handleLikes = jest.fn()
    const deleteBlog = jest.fn()
    container = render(
      <Blog blog={blog} updateLikes={handleLikes} userLogged={user} deleteBlog={deleteBlog}/>
    ).container
  })
  test('render blog only title default', async () => {
    const divTitle = container.querySelector('#blog-preview')
    const blogTitle = screen.getByText('blog test', { exact: false })
    const divInfo = container.querySelector('#blog-info')
    expect(blogTitle).toBeDefined()
    expect(divTitle).toBeDefined()
    expect(divInfo).toBeNull()
  })
})