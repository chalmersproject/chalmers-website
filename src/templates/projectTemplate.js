import React from 'react'
import Helmet from 'react-helmet'
import styled from "styled-components"
import { rem } from "polished"
import { graphql } from 'gatsby'

import ProjectThumbnail from "../components/Project/projectThumbnail"
import "../components/gifs.css"

const Post = styled.main`
  background: ${props => props.theme.colorGreyDarkest};
  color: ${props => props.theme.colorWhite};
  width: 100%;
  transition: all 0.2s ease-out;
  opacity: 0;
  transform: translateY(-${rem(20)});

  &.loaded {
    opacity: 1;
    transform: none;
  }
`
const ProjectContent = styled.section`
  width: 100%;
  margin-top: ${rem(40)};

  &:first-child {
    margin-top: ${rem(10)};
  }

  article {
    width: 80%;
    margin: ${rem(60)} auto;

    &:first-child {
      margin-top: 0;
    }

    iframe {
      display: block;
      width: 100%;
      height: auto;
      margin: auto;
    }

    p {
      font-family: ${props => props.theme.ffPrimary};
      font-size: ${rem(24)};
      line-height: 1.2;
      font-weight: 300;
      margin-bottom: ${rem(24)};
    }

    blockquote {
      p {
        font-style: italic;
        font-size: ${rem(28)};
        line-height: 1.1;

        strong {
          font-weight: 500;
        }
        em {
          font-weight: normal;
        }
      }
    }

    a {
      text-decoration: underline;
      transition: color 0.2s ease-out;

      &:hover {
        color: ${props => props.theme.colorGreyDark};
      }
    }
  }

  .video {
    width: 100%;
    height: 56.25vw;
  }

  @media ${props => props.theme.smallUp} {
    margin-top: ${rem(50)};

    &:first-child {
      margin-top: ${rem(20)};
    }

    article p {
      font-size: ${rem(28)};
      margin-bottom: ${rem(28)};
    }
    article blockquote p {
      font-size: ${rem(36)};
    }
  }
  @media ${props => props.theme.mediumUp} {
    &:first-child {
      margin-top: ${rem(50)};
    }

    article {
      max-width: ${rem(700)};
    }
    article p {
      font-size: ${rem(32)};
      margin-bottom: ${rem(32)};
    }
    article blockquote p {
      font-size: ${rem(42)};
      padding: 0 ${rem(32)};
    }
  }
  @media ${props => props.theme.largeUp} {
    &:first-child {
      margin-top: ${rem(60)};
    }

    article {
      max-width: ${rem(800)};
      margin: ${rem(80)} auto;
    }
    article p {
      font-size: ${rem(36)};
      margin-bottom: ${rem(36)};
    }
    article blockquote p {
      font-size: ${rem(48)};
      padding: 0 ${rem(48)};
    }
  }
  @media ${props => props.theme.xxlargeUp} {
    &:first-child {
      margin-top: ${rem(70)};
    }

    article {
      max-width: ${rem(900)};
      margin: ${rem(120)} auto;
    }
    article p {
      font-size: ${rem(40)};
      margin-bottom: ${rem(40)};
    }
    article blockquote p {
      font-size: ${rem(54)};
      padding: 0 ${rem(48)};
    }
  }
  @media ${props => props.theme.largeUp} {
    margin-top: ${rem(80)};
  }
`
const ProjectNavigation = styled.nav`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: calc(100vw + 80px);
  
  @media ${props => props.theme.mediumUp} {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: calc(50vw + 100px);
  }

  @media ${props => props.theme.mediumDown} {
    article:first-of-type {
      display: none;
    }
  }
`

const ProjectHeader = styled.header`
  width: 80%;
  margin: 0 auto ${rem(30)} auto;
  
  @media ${props => props.theme.mediumUp} {
    max-width: ${rem(700)};
  }

  @media ${props => props.theme.largeUp} {
    max-width: ${rem(800)};
  }

  @media ${props => props.theme.xxlargeUp} {
    max-width: ${rem(900)};
  }
`

const ProjectTitle = styled.h1`
  font-family: ${props => props.theme.ffPrimary};
  font-size: ${rem(24)};
  line-height: 1;
  font-weight: 700;
  margin: 0;
  
  @media ${props => props.theme.smallUp} {
    font-size: ${rem(36)};
  }

  @media ${props => props.theme.mediumUp} {
    font-size: ${rem(48)};
  }

  @media ${props => props.theme.largeUp} {
    font-size: ${rem(60)};
  }

  @media ${props => props.theme.xxlargeUp} {
    font-size: ${rem(72)};
  }
`

const ProjectType = styled.h2`
  font-family: ${props => props.theme.ffSecondary};
  font-size: ${rem(14)};
  line-height: 1;
  font-weight: 300;
  margin-top: ${rem(10)};

  @media ${props => props.theme.smallUp} {
    font-size: ${rem(16)};
  }

  @media ${props => props.theme.mediumUp} {
    font-size: ${rem(18)};
  }

  @media ${props => props.theme.xlargeUp} {
    font-size: ${rem(20)};
  }

  @media ${props => props.theme.xxlargeUp} {
    font-size: ${rem(22)};
  }
`

class ProjectWrapper extends React.Component {
  constructor() {
    super()

    this.state = {loadState: "loading"}
  }

  componentDidMount() {
    this.setState({loadState: "loaded"})
  }

  componentWillUnmount() {
    this.setState({loadState: "loading"})
  }

  render() {
    return (
      <Post className={this.state.loadState}>
        {this.props.children}
      </Post>
    )
  }
}

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  pageContext
}) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark;
  const { next, prev } = pageContext;

  return (
    <div>
      <Helmet title={frontmatter.title + " — chalmerscards.com"} />

      <ProjectWrapper>
        <ProjectContent role="main">
          <ProjectHeader>
            <ProjectTitle>{frontmatter.title}</ProjectTitle>
            <ProjectType>{frontmatter.type}</ProjectType>
          </ProjectHeader>

          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </ProjectContent>

        <ProjectNavigation>
          {prev && (
            <ProjectThumbnail key={prev.id} project={prev} />
          )}
          {next && (
            <ProjectThumbnail key={next.id} project={next} />
          )}
        </ProjectNavigation>
      </ProjectWrapper>
    </div>
  );
}

export const pageQuery = graphql`
  query getGifsAndBlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        type
        order
      }
    }
  }
`;
