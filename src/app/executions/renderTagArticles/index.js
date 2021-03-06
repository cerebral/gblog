import getSession from '../common/getSession';
import sendIndex from '../common/sendIndex';
import hasCachedPath from '../common/hasCachedPath';
import renderApp from '../common/renderApp';
import renderTagArticles from './renderTagArticles';
import renderIndex from './renderIndex';
import getArticles from './getArticles';
import replaceCachedArticles from './replaceCachedArticles';
import hasTagArticlesChanged from './hasTagArticlesChanged';

/*
  When rendering the tag articles we always update the cache with a new version after
  the response has been sent
*/
export default [
  getSession,
  hasCachedPath,
  {
    true: [
      renderApp(),
      renderTagArticles(),
      renderIndex,
      sendIndex,
      getArticles,
      hasTagArticlesChanged,
      {
        true: [renderTagArticles(true), replaceCachedArticles],
        false: [],
      },
    ],
    false: [
      getArticles,
      renderApp(),
      renderTagArticles(),
      renderIndex,
      sendIndex,
      replaceCachedArticles,
    ],
  },
];
