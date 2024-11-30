import React from 'react'
import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigatior'
import { useUser } from '@/context/UserContext'

function RootNavigation() {
    const { user } = useUser();

    return user ? <AppNavigator /> : <AuthNavigator />

    // return <AppNavigator />

}

export default RootNavigation