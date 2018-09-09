import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Layout from './components/MainLayout';
import Users from './routes/Users/Users';
import Posts from './routes/Posts/Posts';
import Albums from './routes/Albums/Albums';
import PostDetail from './routes/PostDetail/PostDetail';
import Photos from './routes/Photos/Photos';
import PhotoDetail from './routes/Photos/PhotoDetail';
import NotFound from './components/NotFound';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route path="/" exact component={IndexPage} />
          <Route path="/users" exact component={Users} />
          <Route path="/posts/:id" exact component={PostDetail} />
          <Route path="/posts" exact component={Posts} />
          <Route path="/albums/:id/photos" exact component={Photos} />
          <Route path="/albums" exact component={Albums} />
          <Route path="/photos/:id" exact component={PhotoDetail} />
          <Route path="*" exact component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default RouterConfig;
