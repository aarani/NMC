import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/panel/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <></>
}
