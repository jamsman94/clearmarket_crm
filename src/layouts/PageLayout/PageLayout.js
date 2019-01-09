import React from 'react'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='layout'>
    <a href='#counter'>counter</a>
    <div />
    <a href='#'>home</a>
    <div />
    {children}
  </div>)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
