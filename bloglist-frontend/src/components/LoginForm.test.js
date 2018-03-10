import React from 'react'
import { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LoginForm from './LoginForm'
import Toggleable from './Toggleable'

describe('<Toggleable />', () => {
    let togglableComponent
  
    beforeEach(() => {
      togglableComponent = shallow(
        <Toggleable buttonLabel="show...">
          <div class="testDiv" />
        </Toggleable>
      )
    })
  
    it('renders its children', () => {
      expect(togglableComponent.contains(<div class="testDiv" />)).toEqual(true)
    })
  
    it('at start the children are not displayed', () => {
      const div = togglableComponent.find('.togglableContent')
      expect(div.getElement().props.style).toEqual({ display: 'none' })
    })

    it('after clicking the button, children are displayed', () => {
        const button = togglableComponent.find('button')
    
        button.at(0).simulate('click')
        const div = togglableComponent.find('.togglableContent')
        expect(div.getElement().props.style).toEqual({ display: '' })
      })

})