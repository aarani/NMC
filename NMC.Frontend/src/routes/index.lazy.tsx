import {createLazyFileRoute, Navigate} from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
    component: IndexComponent
})

export function IndexComponent() {
    return <Navigate to='/panel'/>
}