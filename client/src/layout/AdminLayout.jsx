import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <section>
      {Outlet}
    </section>
  )
}

export default AdminLayout