import React from 'react'
import { Outlet } from 'react-router-dom'

const StudentLayout = () => {
  return (
    <section>
    {Outlet}
  </section>
  )
}

export default StudentLayout