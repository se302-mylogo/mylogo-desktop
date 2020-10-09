/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import { EditorDemoPage } from './containers/EditorDemoPage';
import { createMuiTheme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';
import { Overrides } from '@material-ui/core/styles/overrides';
import { ThemeProvider } from '@material-ui/core/styles';
import { WelcomePage } from './containers/WelcomePage';
import { RoomsListPage } from './containers/RoomsListPage';

// Lazily load routes and code split with webpack
const LazyCounterPage = React.lazy(() =>
  import(/* webpackChunkName: "CounterPage" */ './containers/CounterPage')
);

const CounterPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyCounterPage {...props} />
  </React.Suspense>
);

const overrides: Overrides = {
  MuiToolbar: {
    regular: {
      '@media (min-width: 600px)': {
        minHeight: 'auto'
      },
      '@media (min-width: 0px) and (orientation: landscape)': {
        minHeight: '48px'
      },
      minHeight: 'auto'
    }
  }
};

const typography: TypographyOptions = {
  // Use the system font instead of the default Roboto font.
  fontFamily: [
    'sans-serif'
  ].join(',')
};

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    background: {
      default: grey[200]
    }
  },
  typography,
  overrides
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#a6d4fa',
      main: '#90caf9',
      dark: '#648dae'
    },
    secondary: {
      light: '#f6a5c0',
      main: '#f48fb1',
      dark: '#aa647b'
    }
  },
  typography,
  overrides
});

export default function Routes() {
  return (
    <App>
      <ThemeProvider theme={darkTheme}>
        <Switch>
          <Route path={'/rooms'} component={RoomsListPage}/>
          <Route path={'/editor'} component={EditorDemoPage}/>
          <Route path={routes.HOME} component={WelcomePage}/>
        </Switch>
      </ThemeProvider>
    </App>
  );
}
