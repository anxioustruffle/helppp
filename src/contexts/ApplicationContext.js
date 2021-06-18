/*
    Context to store variables used in entire app without reloading components every time
*/
// React
import React from 'react'

// Context Creation
const ApplicationContext = React.createContext()

// Exporting Provider and Consumer if needed
export const ApplicationProvider = ApplicationContext.Provider
export const ApplicationConsumer = ApplicationContext.Consumer

// Default export the entire context
export default ApplicationContext
