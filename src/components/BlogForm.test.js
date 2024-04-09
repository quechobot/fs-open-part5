import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'



test('a new blog can be added', async () => {

  const create = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={create} />)

  const inputTitle = screen.getByPlaceholderText('write title here')
  const inputAuthor = screen.getByPlaceholderText('write author here')
  const inputUrl = screen.getByPlaceholderText('write url here')
  const sendButton = screen.getByText('create')
  await user.type(inputTitle, 'New test blog')
  await user.type(inputAuthor, 'tester 2')
  await user.type(inputUrl, 'https://www.tester.com')
  await user.click(sendButton)

  expect(create.mock.calls).toHaveLength(1)
  expect(create.mock.calls[0][0].title).toBe('New test blog')
  expect(create.mock.calls[0][0].author).toBe('tester 2')
  expect(create.mock.calls[0][0].url).toBe('https://www.tester.com')
})
