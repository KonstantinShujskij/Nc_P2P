import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard.page'
import Invoices from '../pages/Invoices/Invoices.page'
import Payments from '../pages/Payments/Payments.page'
import Pool from '../pages/Pool/Pool.page'
import Valid from '../pages/Valid/Valid.page'
import CreatePayment from '../pages/CreatePayment/CreatePayment'


const authRoutes = (
    <Routes>
        <Route path="/" element={<Dashboard />} exact />
        <Route path="/dashboard" element={<Dashboard />} exact />
        <Route path="/invoices" element={<Invoices />} exact />
        <Route path="/payments" element={<Payments />} exact />
        <Route path="/pool" element={<Pool />} exact />
        <Route path="/proof" element={<Valid />} exact />
        <Route path="/make" element={<CreatePayment />} exact />

        <Route path="*" element={<Dashboard />} exact />
    </Routes>
)     


export default authRoutes