import React from 'react'
import PropTypes from 'prop-types'
import { ControlLabel, Button, FormGroup, FormControl } from 'react-bootstrap'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
  return (
    <div>
      <h2>Kirjaudu sisään</h2>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <ControlLabel>Käyttäjätunnus: </ControlLabel>
          <FormControl
            value={username}
            onChange={handleChange}
            name="username"
          />
        
          <ControlLabel>Salasana: </ControlLabel>
          <FormControl
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          /><br/>

          <Button type="submit" bsStyle="success">Kirjaudu</Button> 
        </FormGroup>
      </form>
    </div>
  )
    
}
LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired

    }

export default LoginForm