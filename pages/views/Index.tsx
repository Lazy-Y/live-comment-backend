import { NextPage, NextPageContext } from 'next'
import React from 'react'
import dynamic from "next/dynamic";
const DynamicApp = dynamic(() => import("./App"), {
  ssr: false,
});

// The component's props type
type PageProps = {
  title: string
}

// extending the default next context type
type PageContext = NextPageContext & {
  query: PageProps
}

// react component
const Page: NextPage<PageProps> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
      <DynamicApp />
    </div>
  )
}

// assigning the initial props to the component's props
Page.getInitialProps = (ctx: PageContext) => {
  return {
    title: ctx.query.title,
  }
}

export default Page