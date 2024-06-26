import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import View from '../pages/View/View';
import Auth from '../pages/Auth/Auth';
import Login from '../pages/Login/Login';
import Search from '../pages/Search/Search';
import Donate from '../pages/Donate/Donate';
import Verify from '../pages/Verify/Verify';
import Profile from '../pages/Profile/Profile';
import Browser from '../pages/Browser/Browser';
import Dashboard from '../pages/Admin/Dashboard';
import Releases from '../pages/Releases/Releases';
import Checkout from '../pages/Checkout/Checkout';
import Favorites from '../pages/Favorites/Favorites';
import UserList from '../components/Admin/UserList/UserList';
import Subscription from '../pages/Subscription/Subscription';
import ContentListPage from '../pages/Admin/ContentListPage';
import ContentCreatePage from '../pages/Admin/ContentCreatePage';
import ContentUpdatePage from '../pages/Admin/ContentUpdatePage';

import { Toast } from '../utils/Toast';
import { Navigator } from '../components/Navigator/Navigator';
import { CanvasMenu } from '../components/Navigator/CanvasMenu';

function Router() {
  return (
    <div className="App">
      <Switch>
        <>
          <Toast />
          <Navigator />
          <CanvasMenu />
          <div className='body-app'>
            <Route exact path='/'>
              <Redirect to='/browser' />
            </Route>

            <Route path='/auth'>
              <Auth />
            </Route>

            <Route path='/verify'>
              <Verify />
            </Route>

            <Route exact path='/browser'>
              <Browser />
            </Route>

            <Route exact path='/login'>
              <Login />
            </Route>

            <Route exact path='/profile'>
              <Redirect to='/u/profile' />
            </Route>

            <Route exact path='/u/profile'>
              <Profile />
            </Route>

            <Route exact path='/favorites'>
              <Redirect to='/u/favorites' />
            </Route>

            <Route exact path='/u/favorites'>
              <Favorites />
            </Route>

            <Route exact path='/subscription'>
              <Redirect to='/u/subscription' />
            </Route>

            <Route exact path='/u/subscription'>
              <Subscription />
            </Route>

            <Route exact path='/dashboard'>
              <Redirect to='/admin/dashboard' />
            </Route>

            <Route exact path='/admin/dashboard'>
              <Dashboard />
            </Route>

            <Route exact path='/releases'>
              <Releases />
            </Route>

            <Route exact path='/donate'>
              <Donate />
            </Route>

            <Route path='/view/v=:id'>
              <View />
            </Route>

            <Route path='/search/:search'>
              <Search />
            </Route>

            <Route path='/checkout/:type'>
              <Checkout />
            </Route>

            <Route exact path='/content/create'>
              <Redirect to='/admin/content/create' />
            </Route>

            <Route exact path='/admin/content/create'>
              <ContentCreatePage />
            </Route>

            <Route exact path='/admin/content/edit/:id'>
              <ContentUpdatePage />
            </Route>

            <Route exact path='/admin/content/edit'>
              <ContentListPage />
            </Route>

            <Route exact path='/content/edit'>
              <Redirect to='/admin/content/edit' />
            </Route>

            <Route exact path='/users/edit'>
              <UserList />
            </Route>

          </div>
        </>
      </Switch>
    </div>
  )
}

export default Router;
