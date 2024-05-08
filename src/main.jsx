import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import News from './pages/News/News';
import Search from './pages/Search/Search';
import BasicSearch from './pages/BasicSearch/BasicSearch';
import AdvancedSearch from './pages/AdvancedSearch/AdvancedSearch';
import IndividualCard from './pages/AdvancedSearch/IndividualCard';
import ANews from './pages/News/ANews';
import SearchLayout from './pages/Layout/SearchLayout';
import SearchTechnique from './pages/SearchTechnique/SearchTechnique';
import ShowImage from './pages/SearchTechnique/ShowImage';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path:"/",
        element: <Home></Home>
      },
      {
        path:"about",
        element: <About></About>
      },
      {
        path:"news",
        element: <News></News>
      },
      {
        path:"news/:id",
        element: <ANews></ANews>,
        loader: ()=> fetch('news.json')
      },
      {
        path:"search",
        element: <Search></Search>
      },
      {
        path:"basicsearch",
        element: <BasicSearch></BasicSearch>
      },
      {
        path:"advancedsearch",
        element: <AdvancedSearch></AdvancedSearch>
      },
      {
        path:"advancedsearch/:id",
        element: <IndividualCard></IndividualCard>,
        loader: ()=> fetch('dummyFabric.json')
      }
    ]
  },
  {
    path:'searchtec',
    element: <SearchLayout></SearchLayout>,
    children: [
      {
        path: 'all',
        element: <SearchTechnique></SearchTechnique>
      },
      {
        path: 'showimg/:imageId',
        element: <ShowImage></ShowImage>
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
