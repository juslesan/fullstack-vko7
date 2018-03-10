import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'


describe.only('<SimpleBlog />', () => {
    it('renders content', () => {
      const blog = {
        title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
        author: 'hihuhu',
        url: 'www.com',
        // user: '5a88663bf0ae132d8176f83f',
        likes: 0
      }
      const mockHandler = jest.fn()
      const blogComponent = shallow(<SimpleBlog blog ={blog}
                                        onClick = {mockHandler}
                                         />)
      const contentDiv = blogComponent.find('.title')
        // console.log(contentDiv.text())
      expect(contentDiv.text()).toContain(blog.title)
    })

    it('clicking the button twice calls event handler twice', () => {
        const blog = {
            title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
            author: 'hihuhu',
            url: 'www.com',
            // user: '5a88663bf0ae132d8176f83f',
            likes: 0
          }
    
          const mockHandler = jest.fn()
          const blogComponent = shallow(<SimpleBlog blog ={blog}
                                            onClick = {mockHandler}
                                             />)
    
        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

    
        expect(mockHandler.mock.calls.length).toBe(2)
      })
})