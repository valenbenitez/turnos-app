import React, { useState } from 'react'
import { Button, Drawer } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

export default function DrawerLanding() {
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  return (
    <>
      <MenuOutlined
        size={24}
        style={{ backgroundColor: '#a272ff', color: '#fff', padding: '12px', borderRadius: '8px', cursor: 'pointer' }}
        onClick={showDrawer}
      />
      <Drawer title="Basic Drawer" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
}
