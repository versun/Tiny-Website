---
layout: ../../layouts/BlogPost.astro
title: Gatsby快速入门
uuid: 4ef0c012-2a3e-11ed-9847-c2af19d2d6e3
version: 166
created: Thu, 01 Sep 2022 21:37:41 +0000
tags:
- y-type/resource
- z-class/career/blog/blog
- z-class/career/program/gatsbyjs
- x-status/publish/blog
---

Ref: [Tutorial | Gatsby (gatsbyjs.com)](https://www.gatsbyjs.com/docs/tutorial/) 

## **0. Set Up Your Development Environment**

**Require**:

[Node.js](https://nodejs.dev) (v14.15 or newer)

Git

Gatsby command line interface (CLI) (v4 or newer): `npm install -g gatsby-cli`

Visual Studio Code

## **1.Create and Deploy Your First Gatsby Site**

See all commands at : [Commands (Gatsby CLI)](https://www.gatsbyjs.com/docs/reference/gatsby-cli/) 

Create command: `gatsby new`

Run command: `gatsby develop` or  `npm run develop`

## **2. Use and Style React Components**

Example blog: [Home Page | My First Gatsby Site (gatsbyjs.io)](https://gatsbytutorialexample.gatsbyjs.io/) 

### Create new page

```
// src/pages/index.js

// Step 1: Import React
import * as React from 'react'
import { Link } from 'gatsby'   //Import and use a pre-built component from another package.

// Step 2: Define your component
const IndexPage = () => {
   return (
    <main>
      <h1>Welcome to my Gatsby site!</h1>
      <Link to="/about">About</Link>
      <p>I'm making this by following the Gatsby Tutorial.</p>
    </main>
  )
}

// Add a page title by Gatsby Head API: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
export const Head = () => <title>Home Page</title>

// Step 3: Export your component
export default IndexPage
```

### Create your own reusable “building block” component.

```
// src/components/frame.js

import React from 'react'

const Frame = ({ pageTitle, children }) => { //Use component props to change the way a component renders.
  return (
    <div>
      <h1>{pageTitle}</h1>
      { children }   //Use the children prop to create a wrapper component.
    </div>
  )
}

export default Frame
```

```
// src/pages/gallery.js

import React from 'react'
import Frame from '../components/frame'

const GalleryPage = () => {
  return (
    <Frame pageTitle="Gallery Page">
      <p>This will be passed in as children</p>
    </Frame>
  )
}
export default GalleryPage
```

```
//In the browser, the actual DOM elements will look something like this:
<div>
  <h1>Gallery Page</h1>
  <p>This will be passed in as children</p>
</div>
```

### Style components with CSS Modules

```
// src/components/my-component.module.css

.title {
  color: blue;
  font-size: 3rem;
}
```

```
// src/components/my-component.js

import * as React from 'react'
import { title } from './my-component.module.css'

const MyComponent = () => {
  return (
    <h1 className={title}>
      Super Sweet Title Page
    </h1>
  )
}
export default MyComponent
```

## **3.Add Features with Plugins**

## **4.Query for Data with GraphQL**

## **5.Transform Data to Use MDX**

## **6.Create Pages Programmatically**

## **7.Add Dynamic Images from Data**