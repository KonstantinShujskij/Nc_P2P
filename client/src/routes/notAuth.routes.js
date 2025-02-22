import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Auth from '../pages/Auth/Auth.page'


const notAuthRoutes = (
    <Routes>
        <Route path="/" element={<Auth />} exact />
        <Route path="*" element={<Auth />} exact  />
    </Routes>
)

export default notAuthRoutes
