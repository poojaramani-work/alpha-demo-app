import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <header className="sticky top-0 bg-white shadow-md z-10">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className='flex gap-5'>
                        <Link to="/">Intraday</Link>
                        <Link to="/daily">Daily</Link>
                    </div>
                </div>
            </header>
            <main className="mt-4 p-4">
                {children}
            </main>
        </div>
    );
}

export default Layout;