import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import Login from '../components/login/login';
import Home from '../components/dashboard/home';
import About from '../components/dashboard/about';
import Foundations from '../components/dashboard/foundation/foundations';
import Nonprofit from '../components/dashboard/foundation/nonprofit/nonprofit';
import EmailLogs from '../components/dashboard/foundation/emailLog/emailLogs';
import ParentGroup from '../components/dashboard/foundation/parentGroup';
import ParentNonprofit from '../components/dashboard/foundation/nonprofit/parentNonprofit';

function MyRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Login />} />
                    <Route path="home" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="foundations" element={<ParentGroup />} >
                        <Route index element={<Foundations />} />
                        <Route path=":foundationId/nonprofits" element={<ParentNonprofit />} >
                            <Route index element={<Nonprofit />} />
                            <Route path=":nonprofitId/emailLogs" element={<EmailLogs />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

function NoMatch() {
    return <h2>404 Not Found</h2>;
}

export default MyRouter;