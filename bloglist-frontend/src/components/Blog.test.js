import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
    it('renders content', () => {
      const blog = {
        title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
        author: 'hihuhu',
        url: 'www.com',
        user:{
            _id: "5a88663bf0ae132d8176f83f",
            username: "Arto",
            name: "arto69"
          },
        likes: 0
      }
      const mockHandler = jest.fn()
      const blogComponent = shallow(<Blog blog ={blog} deleteBlog={mockHandler}/>)
      const contentDiv = blogComponent.find('.alku')
      console.log(blogComponent)
      console.log(contentDiv.text())
        // console.log(contentDiv.text())
      expect(contentDiv.text()).toContain("hihuhu: Komponenttitestaus tapahtuu jestillä ja enzymellä")
    })
    it('Extended info not shown at start', () => {
        const blog = {
            title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
            author: 'hihuhu',
            url: 'www.com',
            user:{
                _id: "5a88663bf0ae132d8176f83f",
                username: "Arto",
                name: "arto69"
              },
            likes: 0
          }
          const mockHandler = jest.fn()
          const blogComponent = shallow(<Blog blog ={blog} deleteBlog={mockHandler}/>)
        const div = blogComponent.find('.visible')
        expect(div.getElement().props.style).toEqual({ display: 'none' })
    })
    it('button clicked', () => {
        const blog = {
          title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
          author: 'hihuhu',
          url: 'www.com',
          user:{
              _id: "5a88663bf0ae132d8176f83f",
              username: "Arto",
              name: "arto69"
            },
          likes: 0
        }

        const mockHandler = jest.fn()
        const blogComponent = shallow(<Blog blog ={blog} deleteBlog={mockHandler}/>)
        const button = blogComponent.find('.alku')
        button.simulate('click')

        const div = blogComponent.find('.notVisible')
        expect(div.getElement().props.style).toEqual({ display: 'none' })
      })
    
})