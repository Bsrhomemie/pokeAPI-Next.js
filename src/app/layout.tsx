"use client";
import React from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '../lib/AntdRegistry';
import {store} from '../redux/store';
import { Provider } from 'react-redux';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={inter.className}>
        <div className="header">
          <Image
            src='/pokemon_logo.png'
            width={163}
            height={60}
            alt=''
          />
        </div>
        <StyledComponentsRegistry>
          
          <Provider store={store}>
            {children}
          </Provider>
        </StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;