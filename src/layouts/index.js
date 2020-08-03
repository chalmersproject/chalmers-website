import React from 'react'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import ReactGA from 'react-ga'

import '../assets/styles/reset.css'

import Header from '../components/Header'
import Footer from '../components/Footer'

import theme from '../themes/main.js'
import inRegexArray from '../helpers/in-regex-array.js'

const largeHeaderPages = [
  /^\/$/, // index
]

if (typeof window !== 'undefined') {
  var WebFont = require('webfontloader')

  WebFont.load({
    typekit: {
      id: 'bhs8rbg'
    }
  });
}

class TemplateWrapper extends React.Component {
  constructor(props) {
    super()

    this.state = {loadState: "loading"}
  }

  componentDidMount = () => {
    this.setState({loadState: "loaded"})

    ReactGA.initialize('UA-116544151-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  componentDidUpdate = () => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className={"site-wrapper " + this.state.loadState}>
          <Helmet
            title="chalmerscards.com"
            meta={[
              { name: 'name', content: 'chalmerscards.com' },
              { name: 'description', content: 'Chalmers Cards is a guerilla project fighting homelessness in Toronto Ontario' },
              { name: 'keywords', content: 'design, Industrial Design, Web, development, frontend, electronics, arduino, homelessness, Chalmers, ChalmersCards, Chalmers Cards' },
              { name: 'image', content: "/images/og.png" }
            ]}
          >
            <html lang="en" />

            <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/images/safari-pinned-tab.svg" color="#ff4d00" />
            <meta name="msapplication-TileColor" content="#fff9aa" />
            <meta name="theme-color" content="#fff9aa" />

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="chalmerscards.com" />
            <meta property="og:title" content="chalmerscards.com" />
            <meta property="og:description" content="chalmers cards is a guerilla project fighting homelessness in Toronto Ontario" />
            <meta property="og:image" content="https://www.chalmerscards.com/images/og.png" />
            <meta property="og:url" content={"https://www.chalmerscards.com" + this.props.location.pathname} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="chalmerscards.com" />
            <meta name="twitter:description" content="chalmers cards is a guerilla project fighting homelessness in Toronto Ontario" />
            <meta name="twitter:image:src" content="https://www.chalmerscards.com/images/og.png" />
            <meta name="twitter:site" content="@emmnunes" />
            <meta name="twitter:creator" content="@emmnunes" />

          </Helmet>

          <Header headerSize={inRegexArray(this.props.location.pathname, largeHeaderPages) ? 'large' : 'small'} />

          <div>{this.props.children}</div>

          <Footer />
        </div>
      </ThemeProvider>
    )
  }
}

export default TemplateWrapper
