import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { NavLink } from 'react-router-dom'
import './Header.css'

const authenticatedOptions = (
  <Fragment>
    <NavLink to='/create-seed' className='nav-link'>Create Seed</NavLink>
    <NavLink to='/weather' className='nav-link'>Weather</NavLink>
    <NavDropdown title="Seed Sorter" id="navbarScrollingDropdown">
      <NavDropdown.Item as={NavLink} to='/show-seeds'>All Of Your Seeds</NavDropdown.Item>
      <NavDropdown.Item as={NavLink} to='/garden'>Seeds In the Garden</NavDropdown.Item>
      <NavDropdown.Item as={NavLink} to='/favorites'>Your Favorite Seeds</NavDropdown.Item>
      <NavDropdown.Item as={NavLink} to='/vegetables'>Vegetable Seeds</NavDropdown.Item>
    </NavDropdown>
    <NavLink to='/change-password' className='nav-link'>Change Password</NavLink>
    <NavLink to='/sign-out' className='nav-link'>Sign Out</NavLink>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <NavLink to='/sign-up' className='nav-link'>Sign Up</NavLink>
    <NavLink to='/sign-in' className='nav-link'>Sign In</NavLink>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar
    className='topNavbar bg-transparent'
    variant='dark'
    expand='md'>
    <Navbar.Brand>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='ml-auto m-auto'>
        {user && (
          <span className='navbar-text mr-2' id='add-color'>Welcome, {user.email}</span>
        )}
        {user ? authenticatedOptions : unauthenticatedOptions}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
